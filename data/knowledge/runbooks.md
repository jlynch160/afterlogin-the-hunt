---
id: kb-runbook-ap-close
title: AP-Close nightly runbook
source: Runbook · AP-Close.ps1
---

# AP-Close nightly reconciliation runbook

The nightly Accounts-Payable close job (`AP-Close.ps1`) authenticates as the
service principal **svc-billing-reconcile** to post and reconcile ledgers.

- Line 88 of `AP-Close.ps1` acquires an app-only token for `svc-billing-reconcile`.
- The job runs every night at 01:00 and performed a non-interactive token refresh ~3h ago.
- **Do not deprovision svc-billing-reconcile** — it is load-bearing for month-end close.
  Removing it breaks the AP reconciliation pipeline.

`MonthEnd-Reconcile.ps1:12` also references this identity.

All identities, runbooks, and timestamps here are **synthetic** for demonstration.
