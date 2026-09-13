---
id: DU-SH-service-booking-contract
title: "Service lead contract"
scope: shared
surface: shared
status: approved
revision: 2
approved_revision: 2
approval_evidence: "User approved revision 2 and its testing seams in conversation on 2026-09-10."
updated: "2026-09-10"
epic: DU-EP-hcmc-marketplace-services-launch
related:
  - DU-SH-account-capabilities
  - DU-BE-service-booking-lifecycle
  - DU-FE-service-booking-launch
  - DU-MB-service-booking-launch
summary: "Shared behavior for Service Offerings, qualified Requests, accepted Leads, Provider plans, external contact, outcomes, and Reviews."
---

# Service lead contract

## Problem

Independent Service Providers need qualified customer leads without requiring DecoUp to control their final contract or payment. Customers still need truthful pricing signals, private contact handling, visible trust, and a fair way to review DecoUp-originated work.

## Scope

Define shared launch behavior for home-decoration service discovery and lead generation. DecoUp is intended worldwide; Ho Chi Minh City is the first operational region. The stable ID/path retains its historical `service-booking` slug for reference compatibility, but managed Booking is not a launch concept. PC-assembly services are deferred.

## User Stories

### US-01 — Compare truthful Service Offerings

As a Customer, I can understand a selected Provider's fixed package, assumption-based range, or quote-required Offering.

### US-02 — Submit a qualified Service Request

As a Customer, I can send enough project information to one selected Provider without exposing private contact details publicly.

### US-03 — Accept a useful lead

As a Service Provider, I can inspect a redacted qualified request and choose whether to consume plan allowance and contact the Customer.

### US-04 — Record the lead outcome

As a participant, I can record whether the accepted lead resulted in contact, hire, completion, cancellation, or no hire.

### US-05 — Review DecoUp-originated work

As a Customer, I can review completed work originating from an accepted DecoUp lead, while the Provider can respond publicly.

## Decisions and Contracts

- A Service Offering uses a fixed package with defined scope, an assumption-based range, or `quote required`. Bare starting prices and `open to offers` are prohibited at launch.
- A Service Request goes to one selected Provider and includes category, general location, scope, preferred timing, budget range, and optional images. The Customer has a verified phone or email; there is no open provider bidding.
- Providers see a redacted request summary before acceptance. Accepting a qualified lead consumes the Provider plan allowance and permits contact exchange. Spam, duplicate, or invalid requests restore the consumed allowance.
- Phone, Zalo, email, and other direct contact remain hidden on public profiles. After lead acceptance, Customer and Provider may negotiate, contract, and pay externally.
- DecoUp does not process service payment or promise service-payment protection, refunds, disputes, deposits, milestones, or Provider payouts at launch.
- Lead state is `submitted`, `accepted`, `contact-shared`, `hired`, `not-hired`, `completed`, or `cancelled`; the platform does not create a Booking.
- Launch offers Free and Pro Provider plans. Every new Provider receives a three-month Pro trial without a required card or automatic charge. Expiry reminders are sent before automatic downgrade to Free; continued Pro requires explicit purchase.
- Exact plan prices and lead allowances are approved before provider beta after local pricing research. Free provides public profile, portfolio, Reviews, basic messaging, and limited lead responses. Pro provides a larger lead allowance, targeting, analytics, lead management, and eligible clearly labelled sponsored placement. There is no Premium plan, Customer platform fee, service completion commission, or pay-per-extra-lead charge at launch.
- Organic ranking remains based on relevance, availability, response quality, and Reviews. Payment never guarantees customers or creates a hidden organic boost.
- DecoUp stores the Offering pricing snapshot and available in-app messages. Customers may report an external quote outside a fixed price/range; Providers may answer with scope-change evidence. Repeated intentional bait pricing progresses through warning, reduced organic visibility, Offering removal, and Provider suspension.
- Service Provider verification follows `DU-SH-account-capabilities`; verification never guarantees service quality.
- A Customer may Review within 30 days after marking an accepted lead completed and edit once within seven days. The Provider may post one public response and edit it within seven days. Either party may report abuse; removed Reviews no longer affect ratings.
- Service Reviews are labelled `Verified DecoUp lead`, not verified transaction, and remain separate from marketplace Reviews. Customers do not receive public ratings at launch.

## High-Level Design

The shared sequence is Service Offering → selected-Provider qualified Service Request → redacted Provider review → accepted Lead/contact exchange → external negotiation/work/payment → recorded outcome → eligible Review. Provider-plan entitlement controls lead acceptance and sponsored placement; it does not control organic trust or imply a managed service transaction.

## Low-Level Design

- Request creation validates required fields, contact verification, region, duplicate/spam policy, and an immutable Offering pricing snapshot.
- Lead acceptance is duplicate-safe, revalidates Provider eligibility and plan allowance, consumes allowance once, and authorizes contact disclosure only for the matched parties.
- Invalid-request decisions restore allowance idempotently and retain an auditable reason.
- Lead outcome changes are actor-authorized and reject stale or unsupported transitions; neither party can create payment-protection claims through outcome reporting.
- Sponsored placement is visually and contractually distinct from organic rank.
- Pricing complaints preserve the request-time Offering snapshot plus scoped Customer and Provider evidence.
- Review eligibility requires an accepted lead marked hired and completed; the contract exposes its deadline, edit state, public response, report, and moderation result.
- Region-specific verification, public-profile, retention, and moderation policy remains explicit in contracts rather than inferred by clients.

## Data Modelling

Services owns Service Offering, pricing mode/snapshot, Service Request, accepted Lead, lead allowance usage/restoration, Lead Outcome, Provider Plan/Subscription state, pricing complaint, service Review, and public response. Identity owns accounts, contact verification, and Provider verification. Media owns secured images/evidence; Chat owns messages; Payment may process the Pro subscription but owns no service-work transaction. Cross-owner relationships use stable IDs and minimal projections.

## Acceptance Criteria

- AC-01 (US-01): Every Offering uses fixed package, assumption-based range, or quote-required pricing with required scope/assumptions.
- AC-02 (US-02): A qualified Request contains category, location, scope, timing, budget range, optional images, one selected Provider, and a pricing snapshot.
- AC-03 (US-03): A Provider sees redacted details before duplicate-safe acceptance consumes one eligible plan allowance and authorizes contact exchange.
- AC-04 (US-03): Invalid, spam, or duplicate requests restore consumed allowance without double credit.
- AC-05 (US-04): Lead outcomes use only the approved states and do not create a Booking or payment-protection claim.
- AC-06 (US-03): New Providers receive three months of Pro without automatic billing, receive expiry notice, and downgrade to Free unless they explicitly purchase Pro.
- AC-07 (US-03): Organic ranking ignores paid status; any Pro sponsored placement is clearly labelled.
- AC-08 (US-01): Pricing complaints compare against the immutable Offering snapshot and allow evidence from both parties before progressive enforcement.
- AC-09 (US-05): One eligible completed Lead permits one Review within 30 days, one seven-day Customer edit, and one seven-day editable Provider response.
- AC-10 (US-05): Service Reviews are labelled as verified leads, not verified transactions, and removed Reviews no longer affect Provider ratings.

## Testing

- Shared examples cover each allowed pricing mode, invalid pricing, qualified/redacted Request, Lead acceptance, allowance restoration, contact disclosure, every Lead Outcome, trial expiry/downgrade, explicit Pro purchase, organic/sponsored separation, and Review timing.
- Contract tests cover duplicate/stale actions, unauthorized contact access, allowance races, invalid-request credits, pricing complaint evidence, moderation appeal, and removed-rating recalculation.
- Security tests cover public contact leakage and evidence access.
- Plan price/allowance fixtures remain configuration inputs; implementation cannot launch provider beta without approved values.

## Dependencies

- Parent Epic: `DU-EP-hcmc-marketplace-services-launch`.
- Account capabilities: `DU-SH-account-capabilities`.
- Production activation requires approved regional provider verification, privacy, service-advertising, evidence-retention, and moderation policy.
- Provider beta requires approved Free/Pro prices and lead allowances informed by local research.

## Out of Scope

- Managed Bookings, in-app service Quotes/contracts, deposits, milestones, service-work payments, cancellation/refund disputes, Provider payouts, completion commission, Customer platform fees, Premium plans, and pay-per-extra-lead charging.
- Open provider bidding, marketplace Price Offers, PC assembly, generic display ads, concrete endpoints/schemas, vendor selection, and country-expansion policy.

## Open Questions

- None.

## Revision History

- Revision 2 approval: User approved the exact revision and testing seams on 2026-09-10; status promoted without changing requirements.
- Revision 2: Replaced managed Booking with a qualified lead lifecycle; confirmed allowed pricing, Free/Pro trial and conversion, contact disclosure, external transactions, ranking/sponsorship, pricing enforcement, verification, outcomes, and service Review policy. Stable ID retained; not approved.
- Revision 1: Initial shared service contract linked to the confirmed first owner Features; not approved.
