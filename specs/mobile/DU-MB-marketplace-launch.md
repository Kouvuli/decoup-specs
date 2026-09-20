---
id: DU-MB-marketplace-launch
title: "Mobile marketplace launch"
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
  - DU-SH-service-booking-contract
  - DU-SH-marketplace-transaction-contract
  - DU-BE-marketplace-order-lifecycle
  - DU-FE-marketplace-launch
summary: "Native idea-to-Listing discovery, Seller workspace, checkout, fulfillment, disputes, chat, Reviews, navigation, caching, media, and notifications."
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

### US-05 — Create from the Seller workspace

As a verified Seller, I can start a Listing from the center action without switching accounts or losing my current place.

### US-06 — Find an item from anywhere

As a User, I can find a marketplace Listing through a room idea or shared search while retaining my current workspace.

## Decisions and Contracts

- Mobile consumes `DU-SH-account-capabilities` and `DU-SH-marketplace-transaction-contract`; native behavior shares business rules with web but not DOM/CSS or sibling source.
- Mobile presentation consumes approved `DU-SH-brand-visual-language` revision 1: red primary actions, occasional non-interactive yellow highlights, appearance-aware neutrals, and platform serif headings with system sans body text.
- Expo Router is the approved navigation direction. Buyer/Customer has five bottom positions: Home, Explore, Shop, Services, Account. An activated Seller Profile has Home, Explore, a center Add action, Shop, Account. Seller Shop manages Listings and Orders. One User Account switches workspaces through Account without another login.
- The center Add control uses a plus icon and is an action, not a destination tab: in the Seller workspace it opens Listing creation and keeps the previously selected tab. Seller activation requires the independent verified capability in `DU-SH-account-capabilities`; pending, rejected, or suspended profiles cannot enter the Seller workspace or create Listings. Account shows the activation or status path instead.
- Home is the same room-ideas feed in every workspace; Explore is an image grid over the same ideas, organized by room category. Neither requires a follow/friend graph or a personalized recommendation claim. A room idea can open a linked Listing with its actual Seller, price, and availability, or its linked Provider Offering under `DU-SH-service-booking-contract`.
- Search and Inbox are shared header actions on top-level screens in every workspace. Search accepts a deliberate query across ideas, Listings, and Providers/Offerings without switching workspaces. Inbox separates contextual Messages from Updates/notifications; Chat is not a bottom position. Opening a result or conversation and returning preserves the originating workspace and place.
- Universal/app links target Listings, Orders, and Chats. Authentication gates preserve and resume the intended destination after successful login.
- Product minimums are Android 10+ and iOS 16+. Backend contracts support the latest two app major versions; forced upgrade is limited to security or incompatible-contract cases.
- Mobile may cache recently viewed Listings and current Orders with freshness/stale indication and preserve unfinished form drafts. Offline checkout, payment, Price Offer, message send, and other authoritative mutations are prohibited.
- Launch media is images only. Use the system picker where available, request camera access only after the user chooses it, avoid microphone permission, strip location metadata, and show upload progress/retry.
- An in-app notification inbox is always available. Push permission is requested after an explanation and supports security, chat, Order/shipping, and relevant account events; marketing is off by default.
- Marketplace, Order, Shipping, Payment, Chat, Media, Notification, Search, and Identity modules expose only public entrypoints. Backend topology stays behind the shared API-client boundary.

## High-Level Design

Expo Router composes five bottom positions in each workspace and nested marketplace routes. The Seller center position opens Listing creation while the other four positions navigate; the current workspace is visible and can be changed in Account. Home and Explore share idea content, while Search spans idea, item, and service discovery. An idea can lead to a Listing → optional Price Offer → one-Seller checkout → Order/payment/fulfillment → completion or return/dispute → Review. Deep links and notifications resolve through stable client routes and backend identifiers rather than service topology.

## Low-Level Design

- Marketplace views use shared UI color and typography roles from the consumed brand revision; highlight meaning is also conveyed in text or an accessible label.
- Routes cover Listing detail, one-Seller checkout, Order detail, return/dispute evidence, contextual Chat, Review, and nested Seller tools.
- Seller Shop groups Listing and Order management with a public storefront preview; Seller Home remains the shared idea feed. Buyers, Sellers, and Providers can browse public content through Home, Explore, and Search without changing workspaces.
- The Add control has a visible or accessible "Add listing" label, a sufficient touch target, and a deterministic return to the previously selected tab after creation or cancellation. Capability state is rechecked before creation; a revoked capability shows its status instead of an editable form.
- Top-level headers expose labelled Search and Inbox actions. Search results distinguish ideas, Listings, and Provider/Offerings; an empty query does not duplicate Explore's image grid. Inbox keeps Messages and Updates distinct, and Listing/Order details still open their contextual Chat directly.
- The persistent Add action is the sole primary create shortcut in the Seller workspace; empty states may link to it. An unavailable or removed linked Listing explains its live state rather than inheriting an idea's stale price or stock.
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
- AC-04 (US-04): Expo Router provides the approved workspace bars, shared header Search/Inbox, and authorized deep links for Listing, Order, and Chat, including post-login resume.
- AC-05 (US-04): Android 10+/iOS 16+ clients support additive contracts for the latest two app major versions and show explicit upgrade handling.
- AC-06 (US-04): Cached content and drafts remain usable offline while authoritative mutations are blocked with a clear explanation.
- AC-07 (US-03): Image selection/capture requests only necessary permissions, strips location metadata, and supports interrupted upload retry.
- AC-08 (US-04): In-app notifications work without push permission; push events route to the correct authorized context and marketing defaults off.
- AC-09 (US-01): No web component/CSS, sibling source import, or backend service topology is required.
- AC-10 (US-05): An activated Seller sees exactly five bottom positions: Home, Explore, Add, Shop, Account; Add opens Listing creation without becoming a selected tab, and Shop manages Listings and Orders.
- AC-11 (US-05): An unverified, pending, rejected, or suspended Seller Profile cannot create a Listing; Account exposes the appropriate activation or status path without requiring another User Account.
- AC-12 (US-05): A User with both activated profiles can switch workspaces; public discovery and shared search remain available in every workspace.
- AC-13 (US-06): Buyer/Customer sees Home, Explore, Shop, Services, Account; Home and Explore use the same idea source in different layouts, while Search is a shared query action in every workspace.
- AC-14 (US-06): An idea's linked Listing opens with its Seller attribution and current marketplace state, and Back returns to the originating workspace and place.

## Testing

- Contract tests cover shared marketplace examples, unsupported versions, additive fields, stale content, and idempotent retry.
- Route tests cover Buyer/Customer and Seller tab sets, common Home/Explore, shared Search/Inbox from every workspace, Add creation and return, capability changes, workspace switching, idea-to-Listing, Listing/Order/Chat links, auth gate/resume, invalid links, and push destinations.
- Native interaction checks cover Android/iOS offline cache/drafts, upload interruption, permission denial, notification denial/tap, keyboard, accessibility, lifecycle interruption, and resumption.
- Brand checks cover light/dark appearance, red and yellow role use, contrast, Vietnamese diacritics, and enlarged text on both platforms.
- Device evidence must cover Android 10+ and iOS 16+; TypeScript, Metro, or Expo Go alone is insufficient, and Android remote push requires a development build.

## Dependencies

- Parent Epic: `DU-EP-hcmc-marketplace-services-launch`.
- Shared contracts: `DU-SH-account-capabilities`, `DU-SH-marketplace-transaction-contract`.
- Visual language: approved `DU-SH-brand-visual-language` revision 1.
- Room-idea links: `DU-SH-service-booking-contract` revision 3 draft; this dependency requires exact-revision approval before implementation.
- Backend lifecycle: `DU-BE-marketplace-order-lifecycle`.
- Existing mobile architecture: `../decoup-mb/docs/ARCHITECTURE.md` relative to this repository.
- Implementation requires a separately approved Expo Router/runtime dependency change, app/universal-link configuration, notification provider/build setup, and regional privacy text.

## Out of Scope

- React Native implementation, package installation, EAS/store setup, offline mutation queues, offline payments/messages, video/audio upload, Followed/Friends sections, a social graph, background location, marketing push, service leads, and web/landing behavior.

## Open Questions

- None.

## Revision History

- Revision 5 approval: User approved both exact mobile revision 5 Feature specs on 2026-09-20; status promoted without changing requirements.
- Revision 5: Draft consumption of approved `DU-SH-brand-visual-language` revision 1, with native brand validation; revision 4 approval remains historical.
- Revision 4 approval: User confirmed approval of both mobile revision 4 Feature specs on 2026-09-20; status promoted without changing requirements.
- Revision 4: Draft shared Home/Explore/Search/Inbox, Buyer/Customer and Seller bars, Seller Shop work area, and idea-to-Listing navigation. Revision 3 remains an unapproved draft.
- Revision 3: Draft Seller workspace with a center Add Listing action, capability gating, and same-account workspace switching. Revision 2 approval remains historical and does not approve this change.
- Revision 2 approval: User approved the exact revision and testing seams on 2026-09-10; status promoted without changing requirements.
- Revision 2: Confirmed Expo Router tabs/deep links, Android/iOS minimums, two-major-version support, freshness-aware cache/drafts, online-only mutations, image permissions/uploads, and notification behavior plus resolved shared marketplace policy; not approved.
- Revision 1: Initial mobile marketplace draft for the confirmed companion set; not approved.
