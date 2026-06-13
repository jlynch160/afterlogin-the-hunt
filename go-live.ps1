<#
  go-live.ps1 — one-shot activation of the live integrations for Afterlogin.
  Automates: Foundry IQ (Azure AI Search service + index + sample knowledge docs +
  wires the SWA app settings) and, optionally, the model token for live agents.

  Run from the repo root in PowerShell after `az login`:
    ./go-live.ps1 -ModelToken github_pat_xxxxx
  (ModelToken is optional; omit it to provision Foundry IQ only.)
#>
param(
  [string]$SubId      = "3226d5fa-52e1-40c0-9c74-67e984356692",
  [string]$Rg         = "rg-afterlogin",
  [string]$SwaName    = "afterlogin",
  [string]$SearchName = "afterlogin-search",
  [string]$IndexName  = "afterlogin-knowledge",
  [string]$Location   = "eastus",
  [string]$ModelToken = ""
)
$ErrorActionPreference = "Stop"
$api = "2024-07-01"

Write-Host "==> Subscription" -ForegroundColor Cyan
az account set --subscription $SubId

Write-Host "==> Azure AI Search service (free tier)" -ForegroundColor Cyan
$exists = az search service show -n $SearchName -g $Rg --query name -o tsv 2>$null
if (-not $exists) { az search service create -n $SearchName -g $Rg --sku free -l $Location | Out-Null }
$ep = "https://$SearchName.search.windows.net"

$adminKey = az search admin-key show --service-name $SearchName -g $Rg --query primaryKey -o tsv
$queryKey = az search query-key list   --service-name $SearchName -g $Rg --query "[0].key" -o tsv

Write-Host "==> Index '$IndexName'" -ForegroundColor Cyan
$index = @{
  name = $IndexName
  fields = @(
    @{ name="id";      type="Edm.String"; key=$true;  searchable=$false; retrievable=$true }
    @{ name="title";   type="Edm.String"; searchable=$true;  retrievable=$true }
    @{ name="content"; type="Edm.String"; searchable=$true;  retrievable=$true }
    @{ name="source";  type="Edm.String"; searchable=$false; retrievable=$true }
  )
} | ConvertTo-Json -Depth 6
Invoke-RestMethod -Method Put -Uri "$ep/indexes/$IndexName?api-version=$api" `
  -Headers @{ "api-key"=$adminKey; "content-type"="application/json" } -Body $index | Out-Null

Write-Host "==> Loading knowledge docs" -ForegroundColor Cyan
$docs = @{ value = @(
  @{ "@search.action"="mergeOrUpload"; id="1"; title="Revoke sessions vs. password reset"; content="A stolen session or primary refresh token survives a password reset. Use Revoke Sign-in Sessions / Continuous Access Evaluation to kill the live AiTM session."; source="Entra ID - sign-in & session management" }
  @{ "@search.action"="mergeOrUpload"; id="2"; title="Illicit OAuth consent"; content="Revoking sessions does not remove an application's standing OAuth grant. Remove the enterprise-app consent to cut the malicious app's tenant-wide access."; source="Entra ID - enterprise apps / OAuth consent" }
  @{ "@search.action"="mergeOrUpload"; id="3"; title="Standing privilege"; content="MFA does not strip standing Global Admin. Remove the role or use PIM eligible assignments, and rotate secrets / krbtgt for compromised admins."; source="Entra ID Governance - PIM" }
  @{ "@search.action"="mergeOrUpload"; id="4"; title="Load-bearing service accounts"; content="Do not delete a dormant-looking service account that has live dependencies. Bind and watch it (Conditional Access + monitoring) and verify bindings before deprovisioning."; source="Identity Governance - lifecycle" }
  @{ "@search.action"="mergeOrUpload"; id="5"; title="Stale access cleanup"; content="Accounts with no recent interactive sign-in and no live dependencies are safe to deprovision via a lifecycle workflow. Certify keep/remove in an access review."; source="Identity Governance - access reviews" }
) } | ConvertTo-Json -Depth 6
Invoke-RestMethod -Method Post -Uri "$ep/indexes/$IndexName/docs/index?api-version=$api" `
  -Headers @{ "api-key"=$adminKey; "content-type"="application/json" } -Body $docs | Out-Null

Write-Host "==> Wiring Foundry IQ into the Static Web App" -ForegroundColor Cyan
$settings = @(
  "FOUNDRY_SEARCH_ENDPOINT=$ep",
  "FOUNDRY_SEARCH_KEY=$queryKey",
  "FOUNDRY_SEARCH_INDEX=$IndexName"
)
if ($ModelToken) { $settings += "GITHUB_MODELS_TOKEN=$ModelToken" }
az staticwebapp appsettings set -n $SwaName -g $Rg --subscription $SubId --setting-names $settings | Out-Null

Write-Host "`n✅ Done." -ForegroundColor Green
Write-Host "   Foundry IQ: LIVE  ($ep / $IndexName, 5 docs)"
if ($ModelToken) { Write-Host "   Live agents: token set" } else { Write-Host "   Live agents: not set (re-run with -ModelToken to enable)" }
Write-Host "`nVerify in ~30s:" -ForegroundColor Cyan
Write-Host '   curl "https://victorious-plant-0c1e7790f.7.azurestaticapps.net/api/ground?q=stolen+session+token"'
Write-Host "   -> expect {\"grounded\":true, ...}; then Summon a spirit in-game to see the green grounded badge."
