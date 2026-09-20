---
id: DU-MB-service-booking-launch
title: "Mobile service lead launch"
scope: mobile
surface: mobile
status: approved
revision: 5
approved_revision: 5
approval_evidence: "User said 'ok now run expo-native-ui' after being asked to approve both exact mobile revision 5 Feature specs in conversation on 2026-09-20."
updated: "2026-09-20"
epic: DU-EP-hcmc-marketplace-services-launch
related:
  - DU-SH-account-capabilities
  - DU-SH-brand-visual-language
  - DU-SH-marketplace-transaction-contract
  - DU-SH-service-booking-contract
  - DU-BE-service-booking-lifecycle
  - DU-FE-service-booking-launch
summary: "Native room-idea discovery, Provider workspace, qualified Requests, accepted Leads, plans, outcomes, Reviews, navigation, caching, media, and notifications."
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

### US-05 — Create from the Service Provider workspace

As a verified Service Provider, I can start a Service Offering or a room idea from the center action under my existing User Account.

### US-06 — Discover a Provider through a room idea

As a Customer, I can inspect a Provider's before-and-after idea, its Service Offering, and any separately attributed Seller Listings before sending a Request.

## Decisions and Contracts

- Mobile consumes `DU-SH-account-capabilities` and `DU-SH-service-booking-contract`; native behavior shares rules with web but not DOM/CSS or sibling source.
- Mobile presentation consumes approved `DU-SH-brand-visual-language` revision 1: red primary actions, occasional non-interactive yellow highlights, appearance-aware neutrals, and platform serif headings with system sans body text.
- Buyer/Customer has five bottom positions: Home, Explore, Shop, Services, Account. An activated Service Provider Profile has Home, Explore, a center Add action, Services, Account. Provider Services manages requests, Offerings, ideas, and plan tools. One User Account switches workspaces through Account without another login.
- The center Add control uses a plus icon and is an action, not a destination tab: in the Service Provider workspace it offers Post room idea and Create Service Offering, then keeps the previously selected tab. Idea publication requires an existing active Offering and both before and after photos. When none exists, the creation path leads to Offering creation first. Service Provider activation requires the independent verified capability in `DU-SH-account-capabilities`; pending, rejected, or suspended profiles cannot enter the Service Provider workspace or create Offerings or ideas. Account shows the activation or status path instead.
- Home is the same room-ideas feed in every workspace; Explore is an image grid over the same ideas, organized by room category. Search and Inbox are shared header actions on top-level screens in every workspace. Search accepts a deliberate query across ideas, Listings, and Providers/Offerings without switching workspaces. Inbox separates contextual Messages from Updates/notifications; Chat is not a bottom position. Opening a result or conversation and returning preserves the originating workspace and place.
- Ideas use `DU-SH-service-booking-contract` revision 3 draft: an idea belongs to its Provider, links one Offering, and may link separately attributed Seller Listings. Launch ideas use photos only, with an accessible non-gesture alternative to the before/after comparison. Followed/Friends and video are deferred.
- Universal/app links target Service Offerings, Service Requests/accepted Leads, and Chats. Authentication gates preserve and resume authorized destinations.
- Product minimums are Android 10+ and iOS 16+. Backend contracts support the latest two app major versions; force update is limited to security or incompatible contracts.
- Mobile may cache recently viewed Offerings and current Leads with stale indication and preserve unfinished Request/Offering drafts. Offline Request submission, lead acceptance, contact release, messages, plan purchase, outcome changes, complaints, and Reviews are prohibited.
- Launch media is images only. Use the system picker, request camera access only when selected, avoid microphone permission, strip location metadata, and show upload progress/retry.
- An in-app inbox is always available. Push permission is requested after an explanation and supports security, chat, service-lead, Provider-plan/trial-expiry, and relevant account events; marketing defaults off.
- Service UI uses the approved lead lifecycle and external-transaction disclaimer; it never shows Booking, service deposit/payment/refund/dispute, or payout controls.
- Services, Chat, Media, Notification, and Identity modules expose public entrypoints; backend topology remains behind the API-client boundary.

## High-Level Design

Expo Router composes five bottom positions in each workspace and nested service routes. The Service Provider center position opens the two creation choices while the other four positions navigate; the current workspace is visible and can be changed in Account. Home and Explore share idea content, while Search spans idea, item, and service discovery. An idea leads through its Offering → qualified Request → redacted Provider review → accepted Lead/contact exchange → external negotiation/work/payment → Lead Outcome → eligible Review. Provider Services presents requests, Offerings, ideas, plan/trial, allowance, organic performance, and labelled sponsorship without making another Home dashboard.

## Low-Level Design

- Service views use shared UI color and typography roles from the consumed brand revision; highlight meaning is also conveyed in text or an accessible label.
- Routes cover Offering/Provider detail, Request creation/detail, accepted Lead/contact, contextual Chat, Lead Outcome, pricing complaint, Review, and nested Provider plan/lead tools.
- Service Provider Services groups lead management, Offerings, published ideas, plan state, and public profile preview; Service Provider Home remains the shared idea feed. Buyers, Sellers, and Providers can browse public content through Home, Explore, and Search without changing workspaces.
- The Add control has a visible or accessible "Create" label, a sufficient touch target, labelled creation choices, and a deterministic return to the previously selected tab after creation or cancellation. Capability and Offering eligibility are rechecked before publication; a revoked capability shows its status instead of an editable form.
- Top-level headers expose labelled Search and Inbox actions. Search results distinguish ideas, Listings, and Provider/Offerings; an empty query does not duplicate Explore's image grid. Inbox keeps Messages and Updates distinct, and Offering/Request details still open their contextual Chat directly.
- A room idea requires two valid photos, one active Offering, and optional linked Listings. Its detail presents Provider attribution, Offering scope/pricing basis, and Seller attribution on linked Listings; an unavailable Listing explains its current state. The persistent Add action is the sole primary create shortcut in the Provider workspace; empty states may link to it.
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
- AC-05 (US-04): Expo Router provides the approved workspace bars, shared header Search/Inbox, and authorized deep links for idea, Offering, Request/Lead, and Chat, including post-login resume.
- AC-06 (US-04): Android 10+/iOS 16+ clients support additive contracts for the latest two app major versions and show explicit upgrade handling.
- AC-07 (US-01): Cached content and drafts remain usable offline while every authoritative service mutation is blocked clearly.
- AC-08 (US-01): Image selection/capture requests only necessary permissions, strips location metadata, and supports interrupted upload retry.
- AC-09 (US-04): In-app notifications work without push; push events route to authorized security/chat/lead/plan contexts and marketing defaults off.
- AC-10 (US-04): Eligible service Reviews expose verified-lead wording, timing, Customer edit, Provider response, reporting, and moderation state.
- AC-11 (US-01): No web component/CSS, sibling source import, or backend service topology is required.
- AC-12 (US-05): An activated Service Provider sees exactly five bottom positions: Home, Explore, Add, Services, Account; Add offers idea or Offering creation without becoming a selected tab, and Services manages requests, Offerings, and ideas.
- AC-13 (US-05): An unverified, pending, rejected, or suspended Service Provider Profile cannot create an Offering; Account exposes the appropriate activation or status path without requiring another User Account.
- AC-14 (US-05): A User with both activated profiles can switch workspaces; public discovery and shared search remain available in every workspace.
- AC-15 (US-06): Buyer/Customer sees Home, Explore, Shop, Services, Account; Home and Explore use the same idea source in different layouts, while Search is a shared query action in every workspace.
- AC-16 (US-05): Idea publication requires an active Offering and valid before/after photos; without an Offering, the Provider is guided to create one first, and video is unavailable at launch.
- AC-17 (US-06): An idea shows the Provider and linked Offering separately from any linked Seller Listings; opening an Offering or Listing and returning preserves the originating workspace and place.

## Testing

- Contract tests cover shared service examples, unsupported versions, additive fields, stale content, allowance/contact authorization, plan state, outcomes, complaints, and Reviews.
- Route tests cover Buyer/Customer and Service Provider tab sets, common Home/Explore, shared Search/Inbox from every workspace, Add creation and return, absent/inactive Offering, capability changes, workspace switching, idea-to-Offering/Listing, Offering/Request/Lead/Chat links, auth gate/resume, invalid links, and push destinations.
- Native interaction checks include before/after comparison by touch and screen reader controls, missing photos, interrupted idea drafts, and empty search or Provider Services states.
- Native interaction checks cover Android/iOS offline cache/drafts, upload interruption, permission denial, notification denial/tap, acceptance retry, keyboard, accessibility, lifecycle interruption, and resumption.
- Brand checks cover light/dark appearance, red and yellow role use, contrast, Vietnamese diacritics, and enlarged text on both platforms.
- Device evidence must cover Android 10+ and iOS 16+; TypeScript, Metro, or Expo Go alone is insufficient, and Android remote push requires a development build.

## Dependencies

- Parent Epic: `DU-EP-hcmc-marketplace-services-launch`.
- Shared contracts: `DU-SH-account-capabilities`, `DU-SH-service-booking-contract` revision 3 draft; the idea requirements need exact-revision approval before implementation.
- Visual language: approved `DU-SH-brand-visual-language` revision 1.
- Backend lifecycle: `DU-BE-service-booking-lifecycle`.
- Existing mobile architecture: `../decoup-mb/docs/ARCHITECTURE.md` relative to this repository.
- Implementation requires a separately approved Expo Router/runtime dependency change, app/universal-link configuration, notification provider/build setup, and regional privacy text.
- Provider beta requires approved Free/Pro prices and lead allowances.

## Out of Scope

- React Native implementation, package installation, EAS/store setup, managed Booking, service-work payment/refund/dispute/payout, offline mutation queues, video/audio upload, Followed/Friends sections, a social graph, background location, marketing push, PC assembly, marketplace Orders, and web/landing behavior.

## Open Questions

- None. Media-rights and moderation approval remains a production dependency of the shared contract.

## Revision History

- Revision 5 approval: User approved both exact mobile revision 5 Feature specs on 2026-09-20; status promoted without changing requirements.
- Revision 5: Draft consumption of approved `DU-SH-brand-visual-language` revision 1, with native brand validation; revision 4 approval remains historical.
- Revision 4 approval: User confirmed approval of both mobile revision 4 Feature specs on 2026-09-20; status promoted without changing requirements.
- Revision 4: Draft shared Home/Explore/Search/Inbox, Buyer/Customer and Provider bars, Provider Services work area, and photo-only room idea creation/discovery. Revision 3 remains an unapproved draft.
- Revision 3: Draft Service Provider workspace with a center Add Service Offering action, capability gating, and same-account workspace switching. Revision 2 approval remains historical and does not approve this change.
- Revision 2 approval: User approved the exact revision and testing seams on 2026-09-10; status promoted without changing requirements.
- Revision 2: Replaced Booking with qualified lead generation and confirmed Expo Router tabs/deep links, platform minimums, two-major-version support, offline/cache boundaries, image permissions/uploads, notification behavior, plan UX, and Reviews. Stable ID retained; not approved.
- Revision 1: Initial mobile service draft for the confirmed companion set; not approved.
