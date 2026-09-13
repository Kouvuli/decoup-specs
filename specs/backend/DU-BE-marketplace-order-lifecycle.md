---
id: DU-BE-marketplace-order-lifecycle
title: "Marketplace Order lifecycle"
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
  - DU-SH-marketplace-transaction-contract
  - DU-FE-marketplace-launch
  - DU-MB-marketplace-launch
summary: "Backend ownership and lifecycle enforcement for Listings, inventory, one-Seller Orders, fulfillment, disputes, and Reviews."
---

# Marketplace Order lifecycle

## Problem

Marketplace state must be authoritative, duplicate-safe, and bounded so clients cannot oversell inventory or create incompatible payment, fulfillment, dispute, and Review outcomes while the modular monolith remains extractable later.

## Scope

Define backend responsibilities and module seams for `DU-SH-marketplace-transaction-contract`. This is design only: no endpoint, schema, provider, or business implementation is authorized.

## User Stories

### US-01 — Publish an eligible Listing

As a Seller, I can make an eligible item available with authoritative price, condition, inventory, fulfillment, and moderation state.

### US-02 — Negotiate safely

As a Buyer or Seller, I can act on an eligible Price Offer without conflicting results.

### US-03 — Claim inventory for one-Seller Orders

As a Buyer, I can place an Order only from current inventory and one valid purchase basis.

### US-04 — Resolve and review an Order

As a participant, I receive authoritative payment, fulfillment, cancellation, return, dispute, completion, and Review state.

## Decisions and Contracts

- `marketplace` owns Listings, inventory, Price Offers, Listing moderation, marketplace Reviews, and Seller reputation projection.
- `order` owns Order lifecycle, purchased snapshots, cancellations, returns, disputes, and evidence records.
- `payment`, `shipping`, `media`, and `identity` own their provider-specific state; peers retain IDs/projections rather than writing foreign data.
- Immediate invariants use reviewed synchronous module APIs: Order asks `marketplace :: api` to validate and atomically claim/release inventory, and uses `identity :: api`, `payment :: api`, or `shipping :: api` only when the current command requires their authority.
- Committed effects that must survive crashes use durable publication/outbox behavior with idempotent consumers and reconciliation. This includes payment confirmation, shipment changes, notification/search updates, and Review eligibility.
- Notification and Search consume events rather than becoming synchronous Order-creation dependencies.
- No module imports another module's `internal` package, entity, table, or repository; allowed dependencies remain explicit and acyclic.
- External contracts conform to `DU-SH-marketplace-transaction-contract` and expose explicit currency, idempotency, version/conflict, eligibility, and policy outcomes.

## High-Level Design

Marketplace validates purchase basis and owns the inventory claim. Order coordinates one-Seller Order state without owning marketplace, payment, shipping, identity, or media data. Payment and Shipping publish durable outcomes; Order reconciles its projection, then publishes lifecycle facts used by Marketplace Review eligibility, Notification, and Search.

## Low-Level Design

- Mutations require actor, target/version, and an idempotency key where duplicate submission is possible.
- `Place Order` revalidates Seller consistency, Listing/Price Offer snapshot, regional policy, and inventory. A single atomic marketplace operation claims all requested quantities or returns an unavailable/conflict result without a partial Order.
- Cart state never claims inventory. COD claims remain consumed at Order creation; online-payment claims expire and release through an idempotent timeout/reconciliation path.
- Order transitions cover pending payment/COD confirmation, confirmed, fulfillment, completed, cancelled, return/dispute, and refunded outcomes without allowing clients to set state directly.
- Buyer cancellation is accepted before carrier handover; later cancellation or return uses carrier and policy authority.
- Evidence records reference immutable Listing/Order snapshots, Chat, Payment, Shipping, and Media evidence while preserving actor, timestamp, and access scope.
- Marketplace creates Review eligibility/content from durable completion facts; Order never owns Review text or ratings.
- Every durable publication has a stable event identity, idempotent handling, retry visibility, and reconciliation path before implementation approval.

## Data Modelling

Marketplace owns Listing, inventory quantity/mode, Price Offer, moderation, Review, and Seller rating projection. Order owns Order, purchased-item snapshot, lifecycle, cancellation, return/dispute case, and evidence references. Identity owns accounts/profiles; Payment owns payment attempts/outcomes; Shipping owns Shipment/provider state; Media owns secured objects. Cross-owner relationships use stable IDs and explicit projections.

## Acceptance Criteria

- AC-01 (US-01): Listing, inventory, Price Offer, moderation, marketplace Review, and Seller rating writes remain inside Marketplace ownership.
- AC-02 (US-02): Conflicting, expired, duplicate, stale, and unauthorized Price Offer actions return explicit outcomes.
- AC-03 (US-03): Cart does not reserve stock; duplicate-safe Order placement atomically claims all current inventory or creates no Order.
- AC-04 (US-03): Order creation rejects mixed Sellers and preserves authoritative Listing/Price Offer, condition, money, and fulfillment snapshots.
- AC-05 (US-04): Order does not write Payment, Shipment, Identity, Media, or Marketplace-owned data.
- AC-06 (US-04): Cancellation, return, refund, dispute, and evidence outcomes conform to the shared regional policy.
- AC-07 (US-04): Marketplace receives durable completion facts and owns resulting Review eligibility/content.
- AC-08 (US-04): Crash-sensitive events are durable, idempotent, observable, retryable, and reconcilable.
- AC-09 (US-03): Required dependencies are API-only and acyclic; Notification/Search are not synchronous placement dependencies.

## Testing

- Modulith verification covers discovered modules, allowed dependencies, cycles, and internal-package access.
- Contract tests cover duplicate/stale Price Offers and Orders, mixed Sellers, inventory races, all-or-nothing claims, payment expiry release, COD, and authoritative snapshots.
- Lifecycle tests cover cancellation handover boundary, returns/refunds/disputes, evidence authorization, and marketplace Review eligibility.
- Failure tests cover durable publication retry/idempotency and payment/shipping timeout reconciliation.

## Dependencies

- Parent Epic: `DU-EP-hcmc-marketplace-services-launch`.
- Shared account contract: `DU-SH-account-capabilities`.
- Shared marketplace contract: `DU-SH-marketplace-transaction-contract`.
- Existing backend architecture: `../decoup-be/docs/ARCHITECTURE.md` relative to this repository.
- Regional payment, carrier, consumer, moderation, and retention policy must be approved before production.

## Out of Scope

- Java implementation, database schema, endpoints, provider selection, auctions, multi-Seller launch checkout, service leads, and microservice deployment.

## Open Questions

- None.

## Revision History

- Revision 2 approval: User approved the exact revision and testing seams on 2026-09-10; status promoted without changing requirements.
- Revision 2: Assigned Marketplace Review ownership, specified API-only immediate invariants, order-time inventory claims, Order/dispute boundaries, bilateral evidence, and durable event/outbox requirements; not approved.
- Revision 1: Initial backend marketplace lifecycle draft for the confirmed companion set; not approved.
