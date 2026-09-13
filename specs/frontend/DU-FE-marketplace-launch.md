---
id: DU-FE-marketplace-launch
title: "Marketplace launch experience"
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
  - DU-SH-marketplace-transaction-contract
  - DU-BE-marketplace-order-lifecycle
  - DU-MB-marketplace-launch
summary: "Web discovery, negotiation, one-Seller checkout, fulfillment, disputes, chat, and Reviews for launch goods."
---

# Marketplace launch experience

## Problem

People need a trusted way to buy and sell new or used decor, furniture, and PC-related goods while understanding identity, condition, inventory, fulfillment, payment, protection, and Review state.

## Scope

Cover the web-app marketplace journey from public Listing discovery through eligible Review. DecoUp is intended worldwide, with Ho Chi Minh City as the first operational region. Backend authority, mobile presentation, public marketing pages, and provider integrations remain separately owned.

## User Stories

### US-01 — Discover an available item

As a Buyer, I can inspect Listing, Seller, price, condition, inventory basis, verification, and fulfillment before acting.

### US-02 — Negotiate an eligible price

As a Buyer, I can submit a Price Offer when the Seller enables it.

### US-03 — Purchase from one Seller

As a Buyer, I can place a VND Order using an eligible payment/fulfillment method and understand inventory conflicts.

### US-04 — Resolve an Order problem

As a Buyer or Seller, I can use authorized cancellation, return, refund, dispute, and evidence actions.

### US-05 — Communicate and review in context

As a marketplace participant, I can use contextual chat and submit/respond to an eligible post-delivery Review.

## Decisions and Contracts

- Public browsing is available without an account; transactional actions require the shared 18+ phone-OTP account policy.
- Listings cover new and used decor, furniture, and PC-related goods. Condition is separate from single-item or verified-business stocked inventory.
- A Listing has a fixed price and may accept Price Offers; there are no auctions.
- Cart does not reserve inventory. At `Place Order`, the backend atomically claims all requested inventory or returns an explicit unavailable result.
- Launch checkout contains one Seller and creates one Order for that Seller.
- Launch money is VND. Eligible methods are licensed-provider bank QR/transfer, debit/credit cards, and policy-approved COD. The UI never calls DecoUp a wallet or escrow.
- COD appears only when authorized for carrier, region, Seller, Buyer, category, and operational value limit; Sellers may disable it.
- Buyers can cancel before carrier handover. Later issues use the displayed return/dispute policy and accept Buyer and Seller evidence.
- Listing/report surfaces cover prohibited, unsafe, recalled, counterfeit, and materially misleading goods plus evidence-based appeals.
- Marketplace chat remains attached to Listing or Order; support remains separate.
- One eligible delivered Order item permits a one-to-five-star Review with optional text/photos within 30 days, one Buyer edit, and one public Seller response. Reported/removed Reviews expose moderation state and removed ratings no longer count.
- Public profiles show only approved verification claims and general trust/activity fields; private identity/contact evidence stays hidden.
- Sellers pay disclosed commission after successful completion; no Buyer platform fee, mandatory posting fee, generic display ads, or paid placement is included at launch.

## High-Level Design

The web journey is: discover Listing → inspect Seller/condition/inventory/fulfillment → optionally negotiate → one-Seller checkout → authoritative inventory claim and payment/COD result → fulfillment → completion or cancellation/return/dispute → Review. Frontend modules consume versioned backend state and never create business authority.

## Low-Level Design

- Listing actions expose Buy and, only when enabled, Make Price Offer; unavailable/removed Listings explain their state.
- Cart shows that availability is rechecked at Order placement and does not imply reservation.
- Checkout rejects cross-Seller selections, revalidates totals/currency/stock, and shows only authorized fulfillment and payment options.
- A lost inventory race preserves cart context where possible and identifies unavailable items without claiming an Order succeeded.
- Payment/COD, cancellation, return/refund, dispute, shipment, and completion controls render only backend-authorized transitions.
- Evidence capture distinguishes Buyer unboxing evidence from Seller condition/packing/serial evidence and explains access/privacy before upload.
- Chat resolves one Listing or Order context before loading messages.
- Review surfaces enforce eligibility/deadlines, one edit/response, abuse reporting, and moderation/removal state.
- Mutations expose pending, success, validation, conflict/stale-version, unauthorized, and recoverable failure states with duplicate-safe retry semantics.

## Data Modelling

The frontend owns no canonical marketplace records. It consumes versioned contracts for Listing, Seller/public verification summary, condition, inventory availability, Price Offer, Order, fulfillment option, Shipment, Payment/COD status, return/dispute/evidence state, contextual Chat, Review eligibility/content/response, and moderation. Visible relationships preserve one Seller per Order and one eligible Order item per Review.

## Acceptance Criteria

- AC-01 (US-01): A public visitor can inspect approved Listing, condition, inventory basis, Seller trust summary, and fulfillment without signing in.
- AC-02 (US-02): Make Price Offer appears only on eligible Listings and returns explicit accepted, rejected, expired, validation, and conflict outcomes.
- AC-03 (US-03): Cart does not promise reservation; `Place Order` handles unavailable inventory without showing a successful Order.
- AC-04 (US-03): Checkout accepts one Seller and displays explicit VND totals plus only authorized payment, COD, and fulfillment methods.
- AC-05 (US-04): Cancellation is offered before carrier handover and later eligible problems use the return/dispute flow.
- AC-06 (US-04): Buyer and Seller can submit their allowed evidence and see an authoritative outcome without seeing the other party's private evidence improperly.
- AC-07 (US-05): Chat opens in the correct Listing/Order context and support opens separately.
- AC-08 (US-05): Eligible Review UI enforces the 30-day window, one Buyer edit, one public Seller response, reporting, and removed-rating behavior.
- AC-09 (US-01): Verification indicators state what was verified without exposing evidence or promising quality.
- AC-10 (US-01): Listing report/appeal UI exposes authorized moderation states for prohibited or misleading goods.
- AC-11 (US-03): UI contains no wallet/escrow claim, Buyer platform fee, mandatory posting fee, display-ad inventory, or paid-placement control.

## Testing

- Contract tests cover Listing/moderation, Price Offer, inventory race, one-Seller checkout, payment/COD, cancellation, return/refund/dispute, shipment, and Review transitions.
- Interaction tests cover stale cart recovery, unavailable items, contextual chat, bilateral evidence capture, Review edit/response/report, and appeal state.
- Boundary tests prevent marketplace modules from importing service internals.
- Accessibility checks cover keyboard operation, labels, focus, errors, evidence media, status announcements, and non-color-only trust/payment/moderation indicators.

## Dependencies

- Parent Epic: `DU-EP-hcmc-marketplace-services-launch`.
- Shared contracts: `DU-SH-account-capabilities`, `DU-SH-marketplace-transaction-contract`.
- Backend lifecycle: `DU-BE-marketplace-order-lifecycle`.
- Domain language: `../decoup-web/CONTEXT.md` and `../decoup-be/CONTEXT.md` relative to this repository.
- Research: `../decoup-web/docs/research/vietnam-marketplace-account-and-checkout-patterns.md`, `../decoup-web/docs/research/ecommerce-marketplace-revenue-models.md`.
- Production requires approved payment/carrier providers and regional consumer, moderation, verification, and retention policy.

## Out of Scope

- Service leads, auctions, multi-Seller checkout, DecoUp-owned inventory, standalone driver marketplace, generic unsolicited messaging, public Buyer ratings, generic display ads, and paid placement.
- Backend implementation, database schema, endpoints, provider selection, and native-mobile screens.

## Open Questions

- None.

## Revision History

- Revision 3 approval: User approved the exact revision and testing seams on 2026-09-10; status promoted without changing requirements.
- Revision 3: Resolved account, inventory, VND payment/COD, cancellation/returns/disputes, bilateral evidence, listing moderation, and marketplace Review behavior; not approved.
- Revision 2: Confirmed worldwide product intent, Ho Chi Minh City first rollout, shared-account capabilities, and companion shared/backend/mobile Features; still draft.
- Revision 1: Split from `DU-FE-marketplace-service-launch`; requirements remain draft and unapproved.
