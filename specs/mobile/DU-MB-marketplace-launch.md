---
id: DU-MB-marketplace-launch
title: "Mobile marketplace launch"
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
  - DU-SH-marketplace-transaction-contract
  - DU-BE-marketplace-order-lifecycle
  - DU-FE-marketplace-launch
summary: "Native marketplace discovery, checkout, fulfillment, disputes, chat, Reviews, navigation, caching, media, and notifications."
---

# Mobile marketplace launch

## Problem

Mobile is DecoUp's primary participant experience and must support authoritative marketplace policy through native navigation, lifecycle interruption, accessibility, limited connectivity, and released-client compatibility rather than copying web screens.

## Scope

Define Android/iOS behavior from public Listing discovery through eligible Review. DecoUp is intended worldwide; Ho Chi Minh City is the first operational region. Product implementation and provider selection remain outside this specification.

## User Stories

### US-01 — Discover and inspect an item

As a Buyer, I can inspect a Listing, Seller, price, condition, inventory, verification, and fulfillment on mobile.

### US-02 — Negotiate or purchase

As a Buyer, I can submit an eligible Price Offer or place a one-Seller Order with clear inventory/payment state.

### US-03 — Sell and resolve fulfillment

As a Seller, I can act through my Seller Profile and respond to authorized fulfillment, return/dispute, evidence, and Review states.

### US-04 — Resume important activity

As a participant, I can deep-link or return to an Order, Chat, notification, or unfinished form without stale state becoming authority.

## Decisions and Contracts

- Mobile consumes `DU-SH-account-capabilities` and `DU-SH-marketplace-transaction-contract`; native behavior shares business rules with web but not DOM/CSS or sibling source.
- Expo Router is the approved navigation direction. Root tabs are Home, Marketplace, Services, Chat, and Account. Orders, Seller tools, and creation flows are nested rather than root tabs.
- Universal/app links target Listings, Orders, and Chats. Authentication gates preserve and resume the intended destination after successful login.
- Product minimums are Android 10+ and iOS 16+. Backend contracts support the latest two app major versions; forced upgrade is limited to security or incompatible-contract cases.
- Mobile may cache recently viewed Listings and current Orders with freshness/stale indication and preserve unfinished form drafts. Offline checkout, payment, Price Offer, message send, and other authoritative mutations are prohibited.
- Launch media is images only. Use the system picker where available, request camera access only after the user chooses it, avoid microphone permission, strip location metadata, and show upload progress/retry.
- An in-app notification inbox is always available. Push permission is requested after an explanation and supports security, chat, Order/shipping, and relevant account events; marketing is off by default.
- Marketplace, Order, Shipping, Payment, Chat, Media, Notification, Search, and Identity modules expose only public entrypoints. Backend topology stays behind the shared API-client boundary.

## High-Level Design

Expo Router composes the five root tabs and nested marketplace routes. The Marketplace journey follows Listing → optional Price Offer → one-Seller checkout → Order/payment/fulfillment → completion or return/dispute → Review. Deep links and notifications resolve through stable client routes and backend identifiers rather than service topology.

## Low-Level Design

- Routes cover Listing detail, one-Seller checkout, Order detail, return/dispute evidence, contextual Chat, Review, and nested Seller tools.
- Auth-required links save the validated destination, route through sign-in, then resume only if the destination remains authorized.
- Mutations present pending, success, validation, stale/conflict, unauthorized, offline/network, and recoverable failure states and use backend-supported idempotency.
- Cached views expose freshness and revalidate price, availability, payment, and lifecycle state before commitment.
- Draft forms are account-scoped and never treated as submitted; logout clears private drafts/caches according to policy.
- Media uses system selection/camera intent, strips location metadata before upload, reports progress, and reconciles interrupted/duplicate upload attempts.
- Push taps deep-link to an authorized route; denied push permission leaves the in-app inbox usable.
- Accessibility covers screen-reader labels, focus order, scalable text, touch targets, non-color-only state, reduced motion, and evidence-media alternatives.

## Data Modelling

Mobile owns transient navigation, freshness-aware cache, notification-inbox presentation, and account-scoped draft/upload state only. Canonical Listing, Price Offer, Order, Shipment, Payment, Chat, evidence, and Review state remains backend-owned. Persisted client records include account scope, contract version, freshness, and submission state.

## Acceptance Criteria

- AC-01 (US-01): Mobile presents the shared Listing/Seller contract with native accessibility and explicit freshness.
- AC-02 (US-02): Price Offer appears only when eligible; Order placement handles stale/cross-Seller/unavailable commitments without duplicate creation.
- AC-03 (US-03): Seller actions require the activated capability and expose authorized fulfillment, dispute evidence, and Review-response states.
- AC-04 (US-04): Expo Router provides the approved tabs and authorized deep links for Listing, Order, and Chat, including post-login resume.
- AC-05 (US-04): Android 10+/iOS 16+ clients support additive contracts for the latest two app major versions and show explicit upgrade handling.
- AC-06 (US-04): Cached content and drafts remain usable offline while authoritative mutations are blocked with a clear explanation.
- AC-07 (US-03): Image selection/capture requests only necessary permissions, strips location metadata, and supports interrupted upload retry.
- AC-08 (US-04): In-app notifications work without push permission; push events route to the correct authorized context and marketing defaults off.
- AC-09 (US-01): No web component/CSS, sibling source import, or backend service topology is required.

## Testing

- Contract tests cover shared marketplace examples, unsupported versions, additive fields, stale content, and idempotent retry.
- Route tests cover tabs, Listing/Order/Chat links, auth gate/resume, invalid links, and push destinations.
- Native interaction checks cover Android/iOS offline cache/drafts, upload interruption, permission denial, notification denial/tap, keyboard, accessibility, lifecycle interruption, and resumption.
- Device evidence must cover Android 10+ and iOS 16+; TypeScript, Metro, or Expo Go alone is insufficient, and Android remote push requires a development build.

## Dependencies

- Parent Epic: `DU-EP-hcmc-marketplace-services-launch`.
- Shared contracts: `DU-SH-account-capabilities`, `DU-SH-marketplace-transaction-contract`.
- Backend lifecycle: `DU-BE-marketplace-order-lifecycle`.
- Existing mobile architecture: `../decoup-mb/docs/ARCHITECTURE.md` relative to this repository.
- Implementation requires a separately approved Expo Router/runtime dependency change, app/universal-link configuration, notification provider/build setup, and regional privacy text.

## Out of Scope

- React Native implementation, package installation, EAS/store setup, offline mutation queues, offline payments/messages, video/audio upload, background location, marketing push, service leads, and web/landing behavior.

## Open Questions

- None.

## Revision History

- Revision 2 approval: User approved the exact revision and testing seams on 2026-09-10; status promoted without changing requirements.
- Revision 2: Confirmed Expo Router tabs/deep links, Android/iOS minimums, two-major-version support, freshness-aware cache/drafts, online-only mutations, image permissions/uploads, and notification behavior plus resolved shared marketplace policy; not approved.
- Revision 1: Initial mobile marketplace draft for the confirmed companion set; not approved.
