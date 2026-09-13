---
id: DU-BE-service-booking-lifecycle
title: "Service lead lifecycle"
scope: backend
surface: backend
status: approved
revision: 2
approved_revision: 2
approval_evidence: "User approved revision 2 and its testing seams in conversation on 2026-09-10."
updated: "2026-09-10"
epic: DU-EP-hcmc-marketplace-services-launch
related:
  - DU-SH-account-capabilities
  - DU-SH-service-booking-contract
  - DU-FE-service-booking-launch
  - DU-MB-service-booking-launch
summary: "Backend ownership and lifecycle enforcement for Service Offerings, qualified Requests, accepted Leads, Provider plans, outcomes, and Reviews."
---

# Service lead lifecycle

## Problem

Service lead state must protect private contact information, plan allowance, pricing evidence, outcomes, and Reviews without pretending DecoUp owns the Provider's external contract or payment.

## Scope

Define backend responsibilities for `DU-SH-service-booking-contract`. The stable ID retains its historical Booking slug, but the current placeholder `booking` module must be renamed to `services` before implementation. This spec authorizes no Java, schema, provider, or product implementation.

## User Stories

### US-01 — Publish a truthful Service Offering

As a Service Provider, I can publish one approved pricing mode and visible scope/assumptions.

### US-02 — Submit and accept a qualified lead

As a Customer or Provider, I can create or accept one selected-Provider Request with private contact disclosure and plan allowance enforced once.

### US-03 — Record outcomes and pricing complaints

As a participant, I can record the lead outcome or submit scoped pricing evidence without creating a managed Booking.

### US-04 — Manage plans and Reviews

As a Provider or Customer, I receive authoritative trial/plan and eligible service Review state.

## Decisions and Contracts

- Future `services` owns Service Offerings, Requests, Leads, lead allowance usage/restoration, Lead Outcomes, Provider Plan/Subscription state, pricing complaints, service Reviews, public responses, and Provider rating projection.
- `identity :: api` supplies eligible Customer/Provider and verified-contact summaries. `media`, `chat`, and `payment` own secured files, messages, and Pro subscription payment state respectively.
- Services never creates a managed Booking, service Quote/contract, deposit, milestone, service payment, refund dispute, or Provider payout.
- Immediate invariants use reviewed synchronous APIs only where authority is required, including Provider/contact eligibility and Pro subscription payment initiation.
- Lead acceptance atomically consumes one allowance and authorizes matched-party contact disclosure. Invalid-request restoration is idempotent and cannot double-credit.
- Committed lead, plan, Review-eligibility, moderation, notification, and search effects that must survive crashes use durable publication/outbox behavior with idempotent consumers and reconciliation.
- Organic rank ignores paid status; sponsored placement is a separate labelled projection.
- Services owns business evidence records; Media stores secured objects and Chat stores messages. References preserve immutable snapshots and policy-driven retention.
- No module imports another module's `internal` package, entity, table, or repository; allowed dependencies remain explicit and acyclic.

## High-Level Design

Services validates Offerings and qualified Requests, reveals redacted request summaries, consumes plan allowance when a Provider accepts, and authorizes contact exchange. Parties negotiate and pay externally. Services records outcomes, complaints, trial/plan state, and service Reviews while Identity, Media, Chat, Payment, Notification, and Search retain their own data and responsibilities.

## Low-Level Design

- Offering mutation validates one allowed pricing mode and its required scope/assumptions.
- Request creation validates Customer contact, category, location, scope, timing, budget, optional media references, selected Provider, duplicate/spam policy, and an Offering snapshot.
- Lead acceptance requires actor, current Request version, Provider eligibility, and an idempotency key; allowance consumption and contact authorization succeed once or not at all.
- Contact details are unavailable through public/profile contracts and disclosed only to the matched accepted-lead participants.
- Lead Outcomes reject stale, unauthorized, and unsupported transitions and never imply DecoUp payment protection.
- Trial state starts at Provider activation, sends expiry-reminder events, and downgrades after 90 days unless an explicit successful Pro purchase is authoritative.
- Pricing complaints retain Offering snapshot, Customer evidence, Provider response, and progressive moderation outcome.
- Review eligibility requires accepted, hired, completed Lead state and exposes deadlines, edit allowance, Provider response, reports, and moderation outcome.
- Every crash-sensitive publication has stable identity, idempotent handling, retry visibility, and reconciliation before implementation approval.

## Data Modelling

Services owns Service Offering, pricing snapshot, Service Request, Lead, allowance ledger, Lead Outcome, Provider Plan/Subscription projection, pricing complaint, service Review, public response, moderation, and Provider rating projection. Identity owns account/contact/provider verification; Media owns secured objects; Chat owns messages; Payment owns Pro subscription attempts/outcomes. Cross-owner relationships use IDs and minimal projections.

## Acceptance Criteria

- AC-01 (US-01): Services accepts only fixed package, assumption-based range, or quote-required Offerings and preserves the published scope/pricing basis.
- AC-02 (US-02): Request creation preserves one selected Provider, all qualified fields, verified Customer contact, and request-time Offering snapshot.
- AC-03 (US-02): Duplicate-safe acceptance atomically consumes one allowance and authorizes contact disclosure only to matched participants.
- AC-04 (US-02): Invalid, spam, or duplicate Requests restore allowance exactly once.
- AC-05 (US-03): Lead outcome and pricing-complaint paths do not create service payment protection or Booking state.
- AC-06 (US-04): A new Provider receives 90 days of Pro, expiry reminders, and automatic Free downgrade unless an explicit Pro purchase succeeds.
- AC-07 (US-04): Services owns Review eligibility/content and Provider reputation; marketplace Reviews remain separate.
- AC-08 (US-03): Evidence references preserve actor, time, snapshot, and access scope while Media and Chat retain their owned data.
- AC-09 (US-04): Crash-sensitive events are durable, idempotent, observable, retryable, and reconcilable.
- AC-10 (US-02): Required dependencies are API-only and acyclic before implementation approval.

## Testing

- Modulith verification covers the future `services` module, allowed dependencies, cycles, and internal-package access after the scaffold rename.
- Contract tests cover pricing modes, qualified/redacted Requests, acceptance races, allowance usage/restoration, contact authorization, Lead Outcomes, and pricing complaints.
- Plan tests cover trial start, reminder publication, expiry downgrade, explicit purchase, failed payment, and duplicate provider events.
- Review tests cover eligibility, time windows, one edit/response, moderation removal, and rating recalculation.
- Failure tests cover durable publication retry/idempotency and Identity/Media/Chat/Payment reconciliation.

## Dependencies

- Parent Epic: `DU-EP-hcmc-marketplace-services-launch`.
- Shared account contract: `DU-SH-account-capabilities`.
- Shared service contract: `DU-SH-service-booking-contract`.
- Existing backend architecture: `../decoup-be/docs/ARCHITECTURE.md` relative to this repository.
- Rename the empty backend `booking` module to `services` before implementation and refresh Modulith verification/migration state.
- Regional provider, privacy, moderation, and retention policy plus approved plan prices/allowances are production/beta gates.

## Out of Scope

- Java implementation, database schema, endpoints, service Booking/Quote/change workflows, service-work payment/refund/dispute/payout, open provider bidding, PC assembly, marketplace Orders, and microservice deployment.

## Open Questions

- None.

## Revision History

- Revision 2 approval: User approved the exact revision and testing seams on 2026-09-10; status promoted without changing requirements.
- Revision 2: Replaced Booking with Services-owned lead generation, assigned Reviews/plans/evidence, defined contact and allowance invariants, and specified API-only plus durable-event boundaries. Stable ID retained; not approved.
- Revision 1: Initial backend service lifecycle draft for the confirmed companion set; not approved.
