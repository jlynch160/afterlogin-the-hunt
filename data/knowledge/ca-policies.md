---
id: kb-ca-breakglass
title: Conditional Access & break-glass policy
source: Conditional Access · CA-BreakGlass-Sealed
---

# Conditional Access — break-glass policy (synthetic)

- **adm-breakglass-02** is an emergency **Global Administrator** account that is
  **dormant by design**, governed by Conditional Access policy `CA-BreakGlass-Sealed`
  and a sealed FIDO2 key. It was **attested 2026-04-29**.
  **Do not remove.** The correct action is **Bind & Watch** (monitor), never deprovision —
  it is the last-resort administrative access.
- Privileged accounts that are dormant **and** still load-bearing should be quarantined
  and monitored, not deleted.
- Active, least-privilege residents (e.g. **usr-m.santos**, **usr-j.okafor**) should be
  acknowledged and left in place with a documented owner.

All policies and identities are **synthetic** for demonstration. No PII.
