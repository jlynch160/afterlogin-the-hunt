// Afterlogin — Identity Governance MCP server
// Exposes the same identity-triage tools the in-game agents use, over the Model
// Context Protocol — so ANY agent (Copilot, VS Code, an Azure AI Foundry agent)
// can call them. Synthetic data only; no real PII.
//
//   HTTP (cloud / Foundry):  node server.js        -> POST http://localhost:8080/mcp
//   stdio (Claude/VS Code):  node server.js --stdio
import express from "express";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// ── synthetic identity store (no real PII) ──
export const STORE = {
  "svc-billing-reconcile": { grade: "F", kind: "service account",
    signin: { lastInteractive: "412 days ago", lastTokenRefresh: "3 hours ago (non-interactive)", mfa: "not enforced" },
    dependencies: [{ name: "nightly AP-Close job (AP-Close.ps1:88)", status: "LIVE" }, { name: "delegated rights from adm-breakglass", status: "inactive" }],
    oauthGrants: [], groups: ["Finance-Service-Accounts"], source: "Entra sign-in logs · Purview runbook index · CMDB" },
  "svc-etl-nightly": { grade: "F", kind: "service account",
    signin: { lastInteractive: "377 days ago", lastTokenRefresh: "1 hour ago (app-only)", mfa: "not enforced" },
    dependencies: [{ name: "nightly ETL into the warehouse (ETL-Nightly.ps1)", status: "LIVE" }, { name: "created by adm-estate-steward", status: "inactive" }],
    oauthGrants: [], groups: ["Data-Service-Accounts"], source: "Entra sign-in logs · Data Factory pipeline registry" },
  "adm-legacy-backup": { grade: "F", kind: "privileged admin",
    signin: { lastInteractive: "511 days ago", lastTokenRefresh: "none", mfa: "not enforced" },
    dependencies: [{ name: "tape-backup service (decommissioned 2022)", status: "inactive" }, { name: "group: Backup-Operators (empty)", status: "inactive" }],
    oauthGrants: [], groups: ["Domain Admins", "Backup-Operators"], source: "Entra roles · CMDB decommission record" },
  "adm-breakglass-02": { grade: "D", kind: "privileged admin",
    signin: { lastInteractive: "88 days ago", lastTokenRefresh: "n/a", mfa: "FIDO2 (phishing-resistant)" },
    dependencies: [{ name: "emergency Global Admin (break-glass, governed)", status: "LIVE (by design)" }],
    oauthGrants: [], groups: ["Global Administrators (break-glass)"],
    governance: "Governed by break-glass policy; attested last quarter; excluded from the MFA campaign by design.",
    source: "Entra PIM · break-glass policy · access review" },
  "adm-estate-steward": { grade: "F", kind: "privileged admin (the master key)",
    signin: { lastInteractive: "604 days ago", lastTokenRefresh: "none", mfa: "never enforced" },
    dependencies: [{ name: "created svc-etl-nightly and other service identities", status: "historical" }],
    oauthGrants: [], groups: ["Global Administrators"], source: "Entra roles · Tier-0 privileged audit" },
  "app-orchard-connector": { grade: "D", kind: "third-party enterprise app",
    signin: { lastInteractive: "n/a (app)", lastTokenRefresh: "active", mfa: "n/a" }, dependencies: [], groups: [],
    oauthGrants: [{ scope: "Mail.Read.All + offline_access", consent: "tenant-wide, admin-consented", status: "LIVE" }],
    source: "Enterprise apps · OAuth consent audit" },
  "usr-j.okafor": { grade: "B", kind: "member",
    signin: { lastInteractive: "2 hours ago", lastTokenRefresh: "active", mfa: "registered" },
    dependencies: [{ name: "owns Q3-Close workbook", status: "LIVE" }, { name: "shares AP mailbox with usr-m.santos", status: "LIVE" }],
    oauthGrants: [], groups: ["Finance-Readers"], source: "Entra sign-in logs · access package" },
  "usr-m.santos": { grade: "A", kind: "member",
    signin: { lastInteractive: "11 minutes ago", lastTokenRefresh: "active", mfa: "registered" },
    dependencies: [], oauthGrants: [], groups: ["Records-Team"], source: "Entra sign-in logs" }
};

const out = (obj) => ({ content: [{ type: "text", text: JSON.stringify(obj, null, 2) }] });

export function buildServer() {
  const server = new McpServer({ name: "afterlogin-identity-governance", version: "1.0.0" });
  const input = { account: z.string().describe("account label, e.g. svc-billing-reconcile") };

  server.registerTool("list_accounts",
    { title: "List accounts", description: "List every account in the synthetic identity store.", inputSchema: {} },
    async () => out({ accounts: Object.keys(STORE) }));

  server.registerTool("get_signin_activity",
    { title: "Sign-in activity", description: "Last interactive sign-in, last token refresh, and MFA status for an account.", inputSchema: input },
    async ({ account }) => { const r = STORE[account]; return out(r ? { ...r.signin, source: r.source } : { error: "unknown account" }); });

  server.registerTool("get_dependencies",
    { title: "Dependencies", description: "What still depends on the account: its bindings and whether each is LIVE or inactive.", inputSchema: input },
    async ({ account }) => { const r = STORE[account]; return out(r ? { bindings: r.dependencies, liveCount: r.dependencies.filter(d => /LIVE/i.test(d.status)).length, source: r.source } : { error: "unknown account" }); });

  server.registerTool("get_oauth_grants",
    { title: "OAuth grants", description: "OAuth app consents/grants tied to the account (scope, consent, status).", inputSchema: input },
    async ({ account }) => { const r = STORE[account]; return out(r ? { grants: r.oauthGrants, source: r.source } : { error: "unknown account" }); });

  server.registerTool("get_group_memberships",
    { title: "Group memberships", description: "Directory groups and privileged roles the account holds.", inputSchema: input },
    async ({ account }) => { const r = STORE[account]; return out(r ? { groups: r.groups, governance: r.governance || null, source: r.source } : { error: "unknown account" }); });

  return server;
}

// run only when executed directly (not when imported by a test)
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  if (process.argv.includes("--stdio")) {
    buildServer().connect(new StdioServerTransport());
  } else {
    const app = express();
    app.use(express.json());
    app.get("/health", (_req, res) => res.json({ ok: true, server: "afterlogin-identity-governance" }));
    app.post("/mcp", async (req, res) => {
      try {
        const server = buildServer();
        const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
        res.on("close", () => { transport.close(); server.close(); });
        await server.connect(transport);
        await transport.handleRequest(req, res, req.body);
      } catch (e) { if (!res.headersSent) res.status(500).json({ error: String(e.message) }); }
    });
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`Afterlogin Identity-Governance MCP on http://localhost:${port}/mcp`));
  }
}
