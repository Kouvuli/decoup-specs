---
id: DU-FE-service-booking-launch
title: "Service lead launch experience"
scope: frontend
surface: web-app
status: approved
revision: 3
approved_revision: 3
approval_evidence: "User approved revision 3 and its testing seams in conversation on 2026-09-10."
updated: "2026-09-10"
epic: DU-EP-hcmc-marketplace-services-launch
related:
  - DU-SH-account-capabilities
  - DU-SH-service-booking-contract
  - DU-BE-service-booking-lifecycle
  - DU-MB-service-booking-launch
summary: "Web discovery, qualified Requests, accepted Leads, Provider plans, external contact, outcomes, chat, and Reviews."
---

# Service lead launch experience

## Problem

Customers need trustworthy Provider discovery and qualified contact without mistaking DecoUp for the contracting or payment party. Providers need clear Free/Pro value and fair lead access without hidden pay-to-win ranking.

## Scope

Cover the web-app home-decoration service journey from public Provider/Offering discovery through accepted lead outcome and eligible Review. DecoUp is intended worldwide, with Ho Chi Minh City as the first operational region. The stable ID retains its historical Booking slug, but managed Booking is outside launch.

## User Stories

### US-01 — Compare Providers and pricing

As a Customer, I can inspect Provider trust signals and a fixed package, assumption-based range, or quote-required Offering.

### US-02 — Submit a qualified Request

As a Customer, I can send one selected Provider the required project details and optional images without publishing my contact information.

### US-03 — Accept and manage leads

As a Provider, I can inspect redacted details, accept an eligible lead under my plan, then contact the Customer.

### US-04 — Understand Provider plans

As a Provider, I can understand Free/Pro entitlement, trial expiry, explicit purchase, and sponsored placement without confusing payment with organic rank.

### US-05 — Record and review an outcome

As a participant, I can record the lead outcome and submit/respond to an eligible service Review.

## Decisions and Contracts

- Public discovery is available without an account; requests require the shared 18+ phone-OTP account policy.
- Home-decoration services launch first; PC assembly is deferred.
- Offerings allow fixed package, assumption-based range, or quote-required pricing. Bare starting prices, open-to-offers, and marketplace Price Offers are prohibited.
- A Request targets one selected Provider and requires category, location, scope, timing, budget range, and verified Customer contact; images are optional.
- Providers see a redacted summary before accepting. Acceptance consumes plan allowance and authorizes matched parties to exchange phone, Zalo, email, or other direct contact. Invalid/spam/duplicate Requests restore allowance.
- Parties negotiate, contract, and pay externally. UI clearly states that DecoUp provides no service-payment, refund, or dispute protection.
- Lead state is submitted, accepted, contact shared, hired, not hired, completed, or cancelled; no Booking, deposit, milestone, payout, or in-app service contract exists.
- Every new Provider gets three months of Pro without card or automatic billing. Expiry emails precede automatic Free downgrade; continued Pro requires explicit purchase.
- Free provides profile, portfolio, Reviews, basic messaging, and limited lead responses. Pro provides larger lead allowance, targeting, analytics, lead management, and eligible clearly labelled sponsored placement. Exact prices/allowances must be approved before provider beta; there is no Premium plan at launch.
- Organic rank is based on relevance, availability, response quality, and Reviews. Pro never guarantees customers or receives hidden organic boost.
- Pricing complaints compare external evidence with the immutable Offering snapshot and allow Provider scope-change evidence before progressive enforcement.
- Public verification states what was verified without exposing private evidence or guaranteeing quality.
- Eligible Reviews are labelled `Verified DecoUp lead`, use one-to-five stars with optional text/images, allow one Customer edit within seven days, one public Provider response editable within seven days, and abuse reporting/removal. Customers do not receive public ratings.

## High-Level Design

The web journey is: discover Provider/Offering → inspect pricing/trust → submit qualified Request → Provider reviews redacted lead → accept and reveal contact → negotiate/work/pay externally → record outcome → Review. Provider management separately presents trial/plan state, lead allowance, organic performance, and labelled sponsorship.

## Low-Level Design

- Offering cards/details display exactly one allowed pricing mode with required scope or assumptions.
- Request input captures category, general location, scope, preferred timing, budget range, optional images, and verified-contact requirement.
- Provider lead preview redacts direct contact and exposes enough scope to decide whether to consume allowance.
- Acceptance handles stale, duplicate, ineligible, exhausted-allowance, invalid-request, and successful contact-release outcomes explicitly.
- Contact-release UI identifies external-dealing risk and never implies DecoUp payment protection.
- Lead outcome controls expose only backend-authorized transitions and distinguish hired/not-hired/completed/cancelled.
- Provider plan UI shows trial start/expiry, reminder state, downgrade, approved Free/Pro entitlements, explicit purchase, and labelled sponsorship. Organic rank is presented separately.
- Pricing complaint UI preserves the Offering basis and accepts scoped evidence from Customer and Provider.
- Review UI enforces eligibility/deadlines, one edit/response, report, moderation, and removed-rating behavior.
- Mutations expose pending, success, validation, stale/conflict, unauthorized, and recoverable failure states.

## Data Modelling

The frontend owns no canonical service records. It consumes contracts for Provider/public verification, Offering/pricing snapshot, qualified/redacted Request, Lead/allowance/contact authorization, Lead Outcome, Provider Plan/Subscription projection, sponsored placement, pricing complaint/evidence, contextual Chat, Review eligibility/content/response, and moderation. Private contact appears only in the matched accepted-lead context.

## Acceptance Criteria

- AC-01 (US-01): Offering UI displays only fixed package, assumption-based range, or quote-required pricing with its required scope/assumptions.
- AC-02 (US-02): A Customer can send every qualified Request field and optional images to one selected Provider without public contact exposure.
- AC-03 (US-03): A Provider sees redacted details before acceptance consumes allowance and successful acceptance reveals contact only to matched parties.
- AC-04 (US-03): Invalid, spam, or duplicate Request outcomes communicate restored allowance without double credit.
- AC-05 (US-05): Lead UI uses only approved outcomes and never calls the result a Booking or protected service transaction.
- AC-06 (US-04): Trial UI shows 90-day Pro, expiry reminders, automatic Free downgrade, and explicit paid continuation without automatic charging.
- AC-07 (US-04): Organic rank remains visually separate from clearly labelled sponsored placement and no tier guarantees customers.
- AC-08 (US-01): Pricing complaints show the original Offering basis and permit evidence from both parties.
- AC-09 (US-05): Eligible Review UI shows verified-lead wording, 30-day submission, one seven-day Customer edit, one seven-day Provider response, reporting, and removed-rating behavior.
- AC-10 (US-01): Verification indicators describe approved claims without exposing private evidence or promising quality.

## Testing

- Contract tests cover pricing modes, qualified/redacted Requests, lead acceptance/allowance/contact outcomes, trial/plan state, sponsorship, pricing complaints, outcomes, and Reviews.
- Interaction tests cover form recovery, invalid/spam allowance restoration, external-contact disclosure, no-protection messaging, trial expiry/downgrade, organic/sponsored distinction, bilateral evidence, and Review response/report.
- Boundary tests prevent service modules from importing marketplace internals.
- Accessibility checks cover keyboard operation, labels, focus, errors, media, pricing/trust/plan disclosures, and status announcements.

## Dependencies

- Parent Epic: `DU-EP-hcmc-marketplace-services-launch`.
- Shared contracts: `DU-SH-account-capabilities`, `DU-SH-service-booking-contract`.
- Backend lifecycle: `DU-BE-service-booking-lifecycle`.
- Domain language: `../decoup-web/CONTEXT.md` and `../decoup-be/CONTEXT.md` relative to this repository.
- Research: `../decoup-web/docs/research/service-marketplace-provider-pricing-and-circumvention.md`, `../decoup-web/docs/research/ecommerce-marketplace-revenue-models.md`.
- Provider beta requires approved Free/Pro prices and lead allowances; production requires regional verification, privacy, moderation, and retention policy.

## Out of Scope

- Managed Booking, in-app service Quote/contract, deposits, milestones, service-work payment/refund/dispute/payout, completion commission, Customer platform fee, Premium plan, PC assembly, open provider bidding, and public Customer ratings.
- Backend implementation, database schema, endpoints, provider selection, and native-mobile screens.

## Open Questions

- None.

## Revision History

- Revision 3 approval: User approved the exact revision and testing seams on 2026-09-10; status promoted without changing requirements.
- Revision 3: Replaced managed Booking with qualified lead generation and confirmed pricing, Free/Pro trial, contact release, external transaction limits, plan/ranking presentation, pricing complaints, outcomes, and service Reviews. Stable ID retained; not approved.
- Revision 2: Confirmed worldwide product intent, Ho Chi Minh City first rollout, shared-account capabilities, and companion shared/backend/mobile Features; still draft.
- Revision 1: Split from `DU-FE-marketplace-service-launch`; requirements remain draft and unapproved.
