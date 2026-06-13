# Activate Foundry IQ (real grounded retrieval) — ~10 min

The game already ships a real **Foundry IQ** integration: [`api/ground/index.js`](api/ground/index.js)
does permission-aware, **cited grounded retrieval over Azure AI Search**. Until you provision a
search index it returns `{grounded:false}` and the game falls back to baked evidence. These steps
make it live — and the council's *Foundry IQ · cited evidence* then shows a **"● Grounded via
Foundry IQ"** badge with real citations.

## 1. Create an Azure AI Search service (free tier is fine)
```powershell
az search service create -n afterlogin-search -g rg-afterlogin --sku free -l eastus
```

## 2. Create the knowledge index + load a few control docs
- Portal → your Search service → **Indexes → Add index** named `afterlogin-knowledge` with fields:
  `id` (key, string), `title` (string, searchable), `content` (string, searchable),
  `source` (string, retrievable).
- Add a handful of documents (JSON) describing the real controls the game teaches — e.g.:
```json
[
  {"id":"1","title":"Revoke sessions vs. password reset","content":"A stolen session/primary refresh token survives a password reset. Use Revoke Sessions / Continuous Access Evaluation to kill the live session.","source":"Entra ID — sign-in & session management"},
  {"id":"2","title":"Illicit OAuth consent","content":"Revoking sessions does not remove an app's standing OAuth grant. Remove the enterprise-app consent to cut the app's access.","source":"Entra ID — enterprise apps / OAuth consent"},
  {"id":"3","title":"Standing privilege","content":"MFA does not strip standing Global Admin. Remove the role / use PIM eligible assignments and rotate secrets.","source":"Entra ID Governance — PIM"},
  {"id":"4","title":"Load-bearing service accounts","content":"Don't delete a dormant-looking service account with live dependencies — bind & watch (Conditional Access + monitoring) instead.","source":"Identity Governance — lifecycle"}
]
```
*(Optional: add a semantic configuration named e.g. `afterlogin-sem` for extractive answers.)*

## 3. Point the game's API at it (SWA app settings)
```powershell
az staticwebapp appsettings set -n afterlogin -g rg-afterlogin --subscription 3226d5fa-52e1-40c0-9c74-67e984356692 --setting-names FOUNDRY_SEARCH_ENDPOINT=https://afterlogin-search.search.windows.net FOUNDRY_SEARCH_KEY=YOURQUERYKEY FOUNDRY_SEARCH_INDEX=afterlogin-knowledge
```
*(Get the query key: Portal → Search service → Keys. Use a **query** key, not admin. Optionally add `FOUNDRY_SEMANTIC_CONFIG=afterlogin-sem`.)*

## 4. Verify
```bash
curl "https://victorious-plant-0c1e7790f.7.azurestaticapps.net/api/ground?q=stolen%20session%20token%20remediation"
# expect: {"grounded":true,"citations":[...]}
```
Then in-game: **Summon** any spirit → the *Foundry IQ · cited evidence* block shows the green
**● Grounded via Foundry IQ · Azure AI Search** badge with live citations. That's a real,
demonstrable Microsoft IQ integration for the submission.

> Same pattern, in tenant: this is the Foundry IQ grounding layer (Azure AI Search) — swap the index
> for your own knowledge sources and the council grounds its evidence in them.
