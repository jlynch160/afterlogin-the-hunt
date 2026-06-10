// In-memory MCP client test — validates the server end-to-end over the protocol
// (no network): list tools, then call one with an argument.
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { buildServer } from "./server.js";

const [clientT, serverT] = InMemoryTransport.createLinkedPair();
const server = buildServer();
await server.connect(serverT);
const client = new Client({ name: "afterlogin-test", version: "1.0.0" });
await client.connect(clientT);

const tools = (await client.listTools()).tools;
console.log("TOOLS:", tools.map(t => t.name).join(", "));

const dep = await client.callTool({ name: "get_dependencies", arguments: { account: "svc-billing-reconcile" } });
console.log("get_dependencies(svc-billing-reconcile):");
console.log(dep.content[0].text);

const sign = await client.callTool({ name: "get_signin_activity", arguments: { account: "svc-billing-reconcile" } });
console.log("get_signin_activity:", JSON.parse(sign.content[0].text).lastTokenRefresh);

await client.close();
await server.close();
console.log("\nMCP server validated over the protocol ✓");
