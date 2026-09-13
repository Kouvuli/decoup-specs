---
id: DU-EP-hcmc-marketplace-services-launch
title: "DecoUp marketplace and services launch"
scope: shared
status: approved
revision: 3
approved_revision: 3
approval_evidence: "User approved revision 3 and its testing seams in conversation on 2026-09-10."
updated: "2026-09-10"
features:
  - DU-SH-account-capabilities
  - DU-SH-marketplace-transaction-contract
  - DU-SH-service-booking-contract
  - DU-BE-marketplace-order-lifecycle
  - DU-BE-service-booking-lifecycle
  - DU-FE-marketplace-launch
  - DU-FE-service-booking-launch
  - DU-MB-marketplace-launch
  - DU-MB-service-booking-launch
summary: "Launch the first rollout of DecoUp's worldwide goods marketplace and home-decoration service-lead platform."
---

# DecoUp marketplace and services launch

## Outcome

People can use DecoUp to buy or sell eligible goods and connect with independent home-decoration Service Providers. Marketplace Orders remain managed DecoUp transactions; service work is a lead-generation journey whose negotiation and payment occur outside DecoUp.

## Scope

DecoUp is intended for worldwide use. The first operational rollout remains Ho Chi Minh City, Vietnam, so launch policy and integrations target that market without making location a permanent product boundary. This Epic contains the first shared-contract, backend, web, and mobile Feature drafts. Existing service Feature IDs retain their historical `service-booking` slugs for reference stability while their current titles and requirements use service-lead terminology.

## Features

- [Account capabilities](../specs/shared/DU-SH-account-capabilities.md)
- [Marketplace transaction contract](../specs/shared/DU-SH-marketplace-transaction-contract.md)
- [Service lead contract](../specs/shared/DU-SH-service-booking-contract.md)
- [Backend marketplace Order lifecycle](../specs/backend/DU-BE-marketplace-order-lifecycle.md)
- [Backend service lead lifecycle](../specs/backend/DU-BE-service-booking-lifecycle.md)
- [Marketplace launch experience](../specs/frontend/DU-FE-marketplace-launch.md)
- [Service lead launch experience](../specs/frontend/DU-FE-service-booking-launch.md)
- [Mobile marketplace launch](../specs/mobile/DU-MB-marketplace-launch.md)
- [Mobile service lead launch](../specs/mobile/DU-MB-service-booking-launch.md)

The retired combined draft remains at `DU-FE-marketplace-service-launch` for revision history and is not a current Feature.

## Success Measures

Observe the Ho Chi Minh City launch for four months. All new Service Providers receive Pro for the first three months; month four observes post-trial downgrade and voluntary paid conversion. Measure marketplace and service liquidity separately, Order completion, service lead acceptance/contact/hire/completion outcomes, response time, Review rate, complaints, provider retention, and trial-to-paid conversion.

After month four, approve numerical expansion thresholds from the observed baseline. Expansion also requires operational support capacity and a completed regional review covering identity, consumer protection, payment, shipping, prohibited items, data retention, and other applicable law. Until those gates pass, regional expansion is blocked without blocking continued Ho Chi Minh City operation.

## Out of Scope

- PC-assembly services at launch.
- DecoUp-owned inventory.
- A standalone delivery-driver marketplace.
- Multi-Seller checkout, auctions, and open provider bidding.
- Managed service Bookings, service deposits, milestones, payouts, or service-payment disputes.
- Generic third-party display advertising and a Premium Provider plan at launch.

## Open Questions

- None.

## Revision History

- Revision 3 approval: User approved the exact revision and testing seams on 2026-09-10; status promoted without changing requirements.
- Revision 3: Resolved the launch interview: four-month baseline, service lead-generation model, Free/Pro provider plans, marketplace protection rules, shared identity policy, backend boundaries, and mobile requirements. Service IDs remain stable although Booking is no longer a launch concept; not approved.
- Revision 2: Reframed DecoUp as worldwide with Ho Chi Minh City as the first rollout; confirmed launch measurement, shared-account capabilities, and the first shared/backend/mobile Feature set. The stable Epic ID remains unchanged to preserve references; not approved.
- Revision 1: Created as the lightweight parent for the two Features split from the oversized web launch draft; not approved.
