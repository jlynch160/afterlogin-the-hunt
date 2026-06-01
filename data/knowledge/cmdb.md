---
id: kb-cmdb-decommissions
title: CMDB decommission records
source: CMDB · Decommission register
---

# CMDB decommission register (synthetic)

- **adm-legacy-backup** — the tape-backup service it served was **decommissioned in 2022**.
  No interactive sign-in in 511 days. Holds **Domain Admins** rights that are completely
  unused. Owner left and was never reassigned. **Safe to lay to rest (deprovision).**
- **svc-print-spooler** — print server **PRT-07 was retired** seven months ago. No runbook
  references the account. Low privilege but pure clutter. **Safe to deprovision.**
- **svc-datasync-legacy** — vendor offboarded; `Directory.ReadWrite.All` consent remains.
  No sign-in since 2024-09. **Orphaned, high-risk — remove.**

All records are **synthetic** for demonstration. No PII.
