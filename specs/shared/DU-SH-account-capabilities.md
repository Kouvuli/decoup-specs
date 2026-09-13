---
id: DU-SH-account-capabilities
title: "Shared account capabilities"
scope: shared
surface: shared
status: approved
revision: 2
approved_revision: 2
approval_evidence: "User approved revision 2 and its testing seams in conversation on 2026-09-10."
updated: "2026-09-10"
epic: DU-EP-hcmc-marketplace-services-launch
related:
  - DU-SH-marketplace-transaction-contract
  - DU-SH-service-booking-contract
summary: "One adult account with default Buyer/Customer capabilities and independently verified Seller and Service Provider profiles."
---

# Shared account capabilities

## Problem

Separate logins for buying, selling, and providing services would create friction, while one undifferentiated profile would mix verification, enforcement, and reputation across materially different activities.

## Scope

Define launch authentication, recovery, participant capability, verification-summary, public-profile, and suspension behavior shared by backend, web, and mobile. DecoUp is intended worldwide; Ho Chi Minh City is the first operational region.

## User Stories

### US-01 — Participate with one account

As an adult User, I can use one account to act as a Buyer or Customer.

### US-02 — Activate selling

As a User, I can separately activate a Seller Profile after completing applicable verification.

### US-03 — Activate service provision

As a User, I can separately activate a Service Provider Profile after completing applicable verification.

### US-04 — Understand public trust signals

As a participant, I can distinguish Seller and Service Provider identity, verification, reputation, and enforcement state without exposing private evidence.

## Decisions and Contracts

- Anyone may browse public content; account registration and transactional participation require age 18 or older at launch.
- One User Account and login underpin Buyer, Customer, Seller, and Service Provider capabilities.
- Phone OTP is the primary Ho Chi Minh City launch login. Verified email supports recovery and notifications; both are required before Seller or Service Provider activation.
- Passwords, social login, passkeys, and guardian-supported minor accounts are outside launch.
- Buyer and Customer are contextual roles available without public profile activation.
- Seller Profile and Service Provider Profile are activated, verified, moderated, and rated independently; one User may own both.
- Identity evidence stays private. Individual Sellers and Providers supply legal identity and verified contact details; businesses additionally supply registration/tax information and an authorized representative. Regionally regulated services require applicable licence evidence.
- Public profiles may show display or business name, general region, join date, completed activity, response metrics, ratings, and precise verification claims. Phone, email, exact address, tax number, and identity documents remain private except through an authorized transaction/lead flow or legal requirement.
- Profile-specific violations suspend only the affected Seller or Service Provider Profile. Fraud, safety risk, or account compromise may suspend the whole User Account. Every enforcement action supports an evidence-based appeal.
- No organization members, employee accounts, or team permissions are included at launch.

## High-Level Design

Identity owns the User Account, login/recovery factors, private verification evidence, capability activation, and enforcement state. Marketplace consumes Seller capability summaries; Services consumes Service Provider capability summaries. Clients present one signed-in identity with context-specific actions and public claims rather than separate accounts or raw evidence.

## Low-Level Design

- OTP and recovery actions are rate-limited, duplicate-safe, and never reveal whether an untrusted identifier belongs to an account.
- Capability activation is explicit and idempotent and requires the approved contact and verification preconditions.
- A public capability summary contains only the minimum authorized identity, region, verification, reputation, response, and enforcement fields.
- Clients must not infer verification from profile completeness or represent verification as a quality guarantee.
- Losing one capability does not silently erase the User Account or another capability.
- Suspension and appeal responses expose an explicit scope and status without exposing private moderation evidence to unrelated parties.
- Account and profile identifiers remain stable across supported clients and geographic policy changes.

## Data Modelling

One User Account relates to login/recovery factors and zero or one Seller Profile and Service Provider Profile. Each profile has independent activation, verification, moderation, appeal, reputation, and public-summary state. Private evidence remains identity-owned and is referenced by verification decisions rather than copied into public profiles. Buyer and Customer remain behaviors of the User.

## Acceptance Criteria

- AC-01 (US-01): Public browsing does not require an account, while registration and transactional actions enforce the launch age requirement.
- AC-02 (US-01): A User signs in with phone OTP and can recover through a verified email without passwords or social login.
- AC-03 (US-02): Seller activation requires verified phone/email and applicable identity or business evidence independently from Service Provider activation.
- AC-04 (US-03): Service Provider activation requires verified phone/email and applicable identity, business, or licence evidence independently from Seller activation.
- AC-05 (US-04): Seller and Service Provider public verification and reputation remain distinguishable when one User owns both.
- AC-06 (US-04): Public summaries omit private contact, exact address, tax, and identity-document data.
- AC-07 (US-04): Enforcement identifies whether one profile or the whole account is suspended and permits an evidence-backed appeal.
- AC-08 (US-01): Launch contracts do not require guardian, organization-member, or employee-account behavior.

## Testing

- Shared examples cover public browsing, successful/failed OTP, email recovery, no profile, Seller only, Service Provider only, and both profiles.
- Owner tests verify age enforcement, independent activation, minimum public summaries, private evidence handling, profile-scoped and account-scoped suspension, and appeal states.
- Security tests cover enumeration resistance, OTP abuse limits, expired/replayed credentials, and unauthorized evidence access.
- Regional contract tests prove that public and required verification fields can vary without changing account identity.

## Dependencies

- Parent Epic: `DU-EP-hcmc-marketplace-services-launch`.
- Domain language in each product repository's `CONTEXT.md`.
- Production activation requires an approved regional verification, privacy, evidence-retention, and appeal policy.

## Out of Scope

- Authentication vendor selection, concrete credentials/session implementation, guardian accounts, passwords, social login, passkeys, organization membership, and staff roles.
- Merging Seller and Service Provider reputation or exposing raw verification evidence publicly.

## Open Questions

- None.

## Revision History

- Revision 2 approval: User approved the exact revision and testing seams on 2026-09-10; status promoted without changing requirements.
- Revision 2: Confirmed 18+ participation, phone-OTP/email recovery, private identity/business/provider evidence, limited public profile fields, scoped suspension, and appeals; not approved.
- Revision 1: Initial draft from the confirmed shared-account recommendation; not approved.
