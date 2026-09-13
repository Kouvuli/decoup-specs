---
id: DU-SH-marketplace-transaction-contract
title: "Marketplace transaction contract"
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
  - DU-BE-marketplace-order-lifecycle
  - DU-FE-marketplace-launch
  - DU-MB-marketplace-launch
summary: "Shared behavior for Listings, inventory claims, one-Seller Orders, payment, fulfillment, disputes, and Reviews."
---

# Marketplace transaction contract

## Problem

Backend, web, and mobile need one definition of marketplace commitments so clients do not disagree about price negotiation, inventory, Seller ownership, fulfillment, payment, cancellation, disputes, or Review eligibility.

## Scope

Define shared launch behavior for new and used decor, furniture, and PC-related goods. DecoUp is intended worldwide; Ho Chi Minh City is the first operational region and uses VND launch policy.

## User Stories

### US-01 — Understand an available Listing

As a Buyer, I can understand the Seller's item, fixed price, condition, inventory basis, and eligible fulfillment methods.

### US-02 — Negotiate when allowed

As a Buyer, I can submit a Price Offer only when the Listing permits it.

### US-03 — Form one-Seller Orders

As a Buyer, I can purchase currently available goods from one Seller per launch checkout.

### US-04 — Resolve transaction problems fairly

As a Buyer or Seller, I can follow explicit cancellation, return, refund, and dispute policy and submit evidence.

### US-05 — Review a completed purchase

As a Buyer, I can review an eligible delivered Order item while the Seller can respond publicly.

## Decisions and Contracts

- Listings have fixed prices and may accept Price Offers; there are no auctions.
- Item condition (`new` or `used`) is separate from inventory mode. Single-item Listings have quantity one; stocked Listings are available only to verified businesses.
- Adding an item to cart does not reserve it. `Place Order` atomically claims a single item or requested stock quantity. COD consumes inventory at Order creation; online-payment inventory remains claimed only for the provider's payment-expiry window. Failed, expired, or cancelled Orders restore eligible inventory.
- Each Order belongs to one Seller; launch checkout contains one Seller.
- Sellers declare eligible integrated shipping, seller-arranged delivery, or pickup methods.
- Ho Chi Minh City launch money is VND. A licensed provider handles bank QR/transfer and debit/credit cards. DecoUp has no stored-value wallet or BNPL at launch and makes no escrow claim without an approved contract.
- COD is available only for supported carriers, regions, Sellers, categories, Buyers, and an operational value limit. It excludes pickup and oversized freight; Sellers may disable it and repeated refusal may remove Buyer eligibility.
- Buyers may cancel before carrier handover. After handover, eligible damaged, missing, counterfeit, wrong, or materially not-as-described goods use the return/dispute process. Region and Seller type determine displayed return windows and any mandatory consumer rights.
- Dispute evidence may include the immutable Listing/condition snapshot, Order chat, payment/carrier events, Seller packing or serial-number evidence, and Buyer unboxing evidence. Outcomes may be return-and-refund, partial refund, refund without return, or denial.
- Listings follow region-specific prohibited-item rules. Publication validation, risk flags, user reports, Seller evidence, removal, and evidence-based appeal cover illegal, unsafe, recalled, counterfeit, and materially misleading content.
- Sellers pay disclosed commission after successful completion; no Buyer platform fee at launch.
- A Buyer may submit one Review per eligible delivered Order item within 30 days and edit it once within that period. The Seller may post one public response. Either party may report abuse; removed Reviews no longer affect ratings.
- Marketplace Reviews remain separate from service Reviews.

## High-Level Design

The shared sequence is Listing → optional Price Offer → one-Seller checkout → atomic inventory claim → Order → Payment/Shipment or pickup → completion or cancellation/return/dispute → Review. Regional policy determines available payment, COD, fulfillment, moderation, and consumer-protection behavior without changing stable contract identity.

## Low-Level Design

- Money values carry amount and currency; clients never infer currency from locale.
- State-changing requests support idempotency and stale-version rejection.
- Price Offer outcomes include accepted, rejected, expired, withdrawn, and invalid.
- Order creation revalidates Seller, price basis, condition, inventory, fulfillment, Buyer eligibility, and regional policy at the authoritative boundary.
- Inventory claim and release are atomic and quantity-aware; a losing Buyer receives an explicit no-longer-available result.
- Payment, fulfillment, cancellation, return, refund, dispute, completion, and Review transitions are backend-authorized.
- Evidence records preserve submitted-at time, actor, source snapshot/reference, and moderation visibility without granting clients write authority over outcomes.
- Review eligibility references one delivered Order item and becomes unavailable after its deadline or a policy-invalidating outcome.

## Data Modelling

Marketplace owns Listing, condition, inventory mode/quantity, Price Offer, moderation state, and marketplace Review. Order owns Order, purchased-item snapshots, cancellation/return/dispute state, and evidence records. Payment and Shipping own provider-specific attempts/events; Media owns secured evidence objects. Cross-owner relationships use IDs and immutable projections rather than shared entities.

## Acceptance Criteria

- AC-01 (US-01): Contracts distinguish item condition from single-item versus stocked inventory.
- AC-02 (US-02): Price Offer is available only for an eligible Listing and never means auction bidding.
- AC-03 (US-03): Cart does not reserve stock; `Place Order` atomically claims current inventory and returns an explicit unavailable result to a losing Buyer.
- AC-04 (US-03): Every launch Order belongs to one Seller, preserves its agreed item/price basis, and records explicit VND currency.
- AC-05 (US-03): Payment and COD options expose only region-, carrier-, participant-, category-, and value-eligible methods.
- AC-06 (US-04): Cancellation is available before carrier handover; later problems follow an explicit return/dispute path.
- AC-07 (US-04): Buyers and Sellers can submit scoped evidence and receive one authorized dispute outcome.
- AC-08 (US-01): Prohibited or misleading Listings can be reported, moderated, removed, and appealed.
- AC-09 (US-05): One eligible delivered Order item permits one Review within 30 days, one Buyer edit, and one public Seller response.
- AC-10 (US-05): Removed Reviews no longer affect marketplace ratings and service reputation remains separate.

## Testing

- Shared examples cover fixed-price purchase, accepted Price Offer, single used/new items, stocked business inventory, lost inventory races, payment expiry, COD eligibility, and each fulfillment class.
- Contract tests cover idempotency, stale versions, cancellation boundaries, inventory restoration, return/refund/dispute outcomes, moderation appeal, and Review timing/response.
- Evidence authorization tests cover Buyer, Seller, moderator, and unrelated-party access.
- Regional tests prove payment/COD/return/public-policy changes do not alter stable Order identity.

## Dependencies

- Parent Epic: `DU-EP-hcmc-marketplace-services-launch`.
- Account capabilities: `DU-SH-account-capabilities`.
- Production activation requires approved licensed payment/carrier integrations and regional consumer, prohibited-item, evidence-retention, and Seller-verification policy.

## Out of Scope

- Auctions, multi-Seller launch checkout, DecoUp-owned inventory, standalone driver marketplace, service leads, and provider selection.
- Concrete endpoints, database schemas, payment/shipping vendors, stored-value wallet, BNPL, and additional regional payment methods.

## Open Questions

- None.

## Revision History

- Revision 2 approval: User approved the exact revision and testing seams on 2026-09-10; status promoted without changing requirements.
- Revision 2: Confirmed condition/inventory separation, order-time inventory claims, VND payment and COD boundaries, cancellation/returns/disputes, bilateral evidence, listing moderation, and marketplace Review rules; not approved.
- Revision 1: Initial shared marketplace contract linked to the confirmed first owner Features; not approved.
