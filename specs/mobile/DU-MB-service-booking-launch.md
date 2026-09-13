---
id: DU-MB-service-booking-launch
title: "Mobile service lead launch"
scope: mobile
surface: mobile
status: approved
revision: 2
approved_revision: 2
approval_evidence: "User approved revision 2 and its testing seams in conversation on 2026-09-10."
updated: "2026-09-10"
epic: DU-EP-hcmc-marketplace-services-launch
related:
  - DU-SH-account-capabilities
  - DU-SH-service-booking-contract
  - DU-BE-service-booking-lifecycle
  - DU-FE-service-booking-launch
summary: "Native Provider discovery, qualified Requests, accepted Leads, plans, outcomes, Reviews, navigation, caching, media, and notifications."
---

# Mobile service lead launch

## Problem

Mobile must help Customers and independent Providers exchange qualified leads while protecting contact data, plan allowance, pricing trust, and Review eligibility through native lifecycle interruptions without presenting external work as a DecoUp-managed Booking.

## Scope

Define Android/iOS behavior from public Provider/Offering discovery through accepted Lead outcome and eligible Review. DecoUp is intended worldwide; Ho Chi Minh City is the first operational region. The stable ID retains its historical Booking slug, but managed Booking is outside launch.

## User Stories

### US-01 — Discover and request a Provider

As a Customer, I can inspect an Offering and submit required details plus approved images to one selected Provider.

### US-02 — Accept a qualified lead

As a Provider, I can inspect a redacted Request, understand allowance impact, and accept it before contact is disclosed.

### US-03 — Manage plan and outcomes

As a Provider, I can understand trial/plan state and record whether an accepted lead resulted in contact, hire, completion, cancellation, or no hire.

### US-04 — Resume communication and Review

As a participant, I can return through navigation, deep links, or notifications to a Request, accepted Lead, Chat, pricing complaint, or eligible Review.

## Decisions and Contracts

- Mobile consumes `DU-SH-account-capabilities` and `DU-SH-service-booking-contract`; native behavior shares rules with web but not DOM/CSS or sibling source.
- Expo Router root tabs are Home, Marketplace, Services, Chat, and Account. Provider lead/plan tools and Customer request/outcome flows are nested.
- Universal/app links target Service Offerings, Service Requests/accepted Leads, and Chats. Authentication gates preserve and resume authorized destinations.
- Product minimums are Android 10+ and iOS 16+. Backend contracts support the latest two app major versions; force update is limited to security or incompatible contracts.
- Mobile may cache recently viewed Offerings and current Leads with stale indication and preserve unfinished Request/Offering drafts. Offline Request submission, lead acceptance, contact release, messages, plan purchase, outcome changes, complaints, and Reviews are prohibited.
- Launch media is images only. Use the system picker, request camera access only when selected, avoid microphone permission, strip location metadata, and show upload progress/retry.
- An in-app inbox is always available. Push permission is requested after an explanation and supports security, chat, service-lead, Provider-plan/trial-expiry, and relevant account events; marketing defaults off.
- Service UI uses the approved lead lifecycle and external-transaction disclaimer; it never shows Booking, service deposit/payment/refund/dispute, or payout controls.
- Services, Chat, Media, Notification, and Identity modules expose public entrypoints; backend topology remains behind the API-client boundary.

## High-Level Design

Expo Router composes the five root tabs and nested service routes. The journey follows Offering → qualified Request → redacted Provider review → accepted Lead/contact exchange → external negotiation/work/payment → Lead Outcome → eligible Review. Provider routes present plan/trial, allowance, organic performance, and labelled sponsorship separately.

## Low-Level Design

- Routes cover Offering/Provider detail, Request creation/detail, accepted Lead/contact, contextual Chat, Lead Outcome, pricing complaint, Review, and nested Provider plan/lead tools.
- Auth-required links save the validated destination, route through sign-in, then resume only when still authorized.
- Request drafts preserve entered text and selected-image references without claiming submission; authoritative state is revalidated before mutation.
- Provider preview redacts contact and shows allowance impact. Acceptance handles stale, duplicate, exhausted, invalid-request, restored-allowance, and successful disclosure outcomes.
- External-contact screens state that DecoUp does not process/protect service-work payment.
- Plan UI shows 90-day Pro, expiry reminders, Free downgrade, explicit Pro purchase, and clear separation between organic rank and sponsored placement.
- Interrupted writes/uploads reconcile with backend state; timeout never implies success.
- Push taps deep-link to an authorized route; denied permission leaves the in-app inbox usable.
- Accessibility covers screen-reader labels, focus order, scalable text, touch targets, media alternatives, non-color-only pricing/plan/trust state, and reduced motion.

## Data Modelling

Mobile owns transient route, freshness-aware cache, inbox presentation, and account-scoped draft/upload state only. Canonical Provider, Offering, Request, Lead/allowance/contact authorization, Lead Outcome, Provider Plan, sponsorship, complaint/evidence, Chat, and Review state remains backend-owned. Persisted client records include account scope, contract version, freshness, and submission state.

## Acceptance Criteria

- AC-01 (US-01): Mobile displays approved Offering pricing and Provider trust, then captures every qualified Request field with optional images.
- AC-02 (US-02): Provider preview redacts contact; duplicate-safe acceptance consumes allowance once and reveals contact only after success.
- AC-03 (US-03): Mobile uses only approved Lead Outcomes and does not present Booking or DecoUp service-payment protection.
- AC-04 (US-03): Plan UI presents trial expiry/reminder/downgrade, explicit purchase, allowance, and labelled sponsorship without hidden organic boost.
- AC-05 (US-04): Expo Router provides approved tabs and authorized deep links for Offering, Request/Lead, and Chat, including post-login resume.
- AC-06 (US-04): Android 10+/iOS 16+ clients support additive contracts for the latest two app major versions and show explicit upgrade handling.
- AC-07 (US-01): Cached content and drafts remain usable offline while every authoritative service mutation is blocked clearly.
- AC-08 (US-01): Image selection/capture requests only necessary permissions, strips location metadata, and supports interrupted upload retry.
- AC-09 (US-04): In-app notifications work without push; push events route to authorized security/chat/lead/plan contexts and marketing defaults off.
- AC-10 (US-04): Eligible service Reviews expose verified-lead wording, timing, Customer edit, Provider response, reporting, and moderation state.
- AC-11 (US-01): No web component/CSS, sibling source import, or backend service topology is required.

## Testing

- Contract tests cover shared service examples, unsupported versions, additive fields, stale content, allowance/contact authorization, plan state, outcomes, complaints, and Reviews.
- Route tests cover tabs, Offering/Request/Lead/Chat links, auth gate/resume, invalid links, and push destinations.
- Native interaction checks cover Android/iOS offline cache/drafts, upload interruption, permission denial, notification denial/tap, acceptance retry, keyboard, accessibility, lifecycle interruption, and resumption.
- Device evidence must cover Android 10+ and iOS 16+; TypeScript, Metro, or Expo Go alone is insufficient, and Android remote push requires a development build.

## Dependencies

- Parent Epic: `DU-EP-hcmc-marketplace-services-launch`.
- Shared contracts: `DU-SH-account-capabilities`, `DU-SH-service-booking-contract`.
- Backend lifecycle: `DU-BE-service-booking-lifecycle`.
- Existing mobile architecture: `../decoup-mb/docs/ARCHITECTURE.md` relative to this repository.
- Implementation requires a separately approved Expo Router/runtime dependency change, app/universal-link configuration, notification provider/build setup, and regional privacy text.
- Provider beta requires approved Free/Pro prices and lead allowances.

## Out of Scope

- React Native implementation, package installation, EAS/store setup, managed Booking, service-work payment/refund/dispute/payout, offline mutation queues, video/audio upload, background location, marketing push, PC assembly, marketplace Orders, and web/landing behavior.

## Open Questions

- None.

## Revision History

- Revision 2 approval: User approved the exact revision and testing seams on 2026-09-10; status promoted without changing requirements.
- Revision 2: Replaced Booking with qualified lead generation and confirmed Expo Router tabs/deep links, platform minimums, two-major-version support, offline/cache boundaries, image permissions/uploads, notification behavior, plan UX, and Reviews. Stable ID retained; not approved.
- Revision 1: Initial mobile service draft for the confirmed companion set; not approved.
