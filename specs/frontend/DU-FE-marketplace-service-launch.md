---
id: DU-FE-marketplace-service-launch
title: "Marketplace and service launch experience"
scope: frontend
surface: web-app
status: superseded
revision: 3
approved_revision: null
approval_evidence: null
updated: "2026-09-08"
epic: DU-EP-hcmc-marketplace-services-launch
related:
  - DU-FE-marketplace-launch
  - DU-FE-service-booking-launch
summary: "Retired combined web draft for DecoUp's worldwide marketplace and service platform, first launched in Ho Chi Minh City."
---

# Marketplace and service launch experience

## Problem

People need one trusted experience to buy or sell new and used decor, furniture, and PC-related goods, or to find and book home-decoration professionals. Generic listings, chat, and off-platform coordination do not preserve agreed prices, service scope, evidence, fulfillment status, or verified completion history.

## Scope

This specification defines the web-app experience for:

- marketplace discovery, fixed-price Listings, optional Price Offers, one-Seller checkout, Orders, and seller-declared fulfillment;
- discovery of selected Service Providers, Service Requests, Quotes, Bookings, and evidence-backed Change Proposals;
- contextual participant chat, support entry points, payment-status presentation, and post-completion Reviews;
- individual Sellers, verified business Sellers, independent Service Providers, and verified service companies;
- shared accounts and business rules with the mobile product, while mobile remains the primary participant experience.

Backend authority, native-mobile presentation, public marketing pages, and third-party provider implementation require separately owned specifications.

## User Stories

- As a Buyer, I can discover and purchase eligible goods from one Seller per checkout.
- As a Buyer, I can submit a Price Offer when a Listing allows negotiation.
- As a Seller, I can present an item and its supported shipping, delivery, or pickup methods.
- As a Customer, I can discover a Service Provider and send a detailed Service Request.
- As a Service Provider, I can return a Quote with explicit scope, price, and schedule.
- As a Customer, I can accept a Quote and understand the resulting Booking commitment.
- As either service participant, I can review evidence-backed changes without treating chat as an automatic contract amendment.
- As a marketplace or service participant, I can communicate in context and review an eligible completed transaction.

## Decisions and Contracts

- DecoUp is intended worldwide; launch operations begin in Ho Chi Minh City, Vietnam.
- The marketplace covers new and used decor, furniture, and PC-related goods. PC-assembly services are deferred.
- DecoUp does not own marketplace inventory at launch.
- A Listing has a fixed price and may allow a Buyer Price Offer; there are no auctions.
- Initial checkout contains items from one Seller and creates one Order for that Seller.
- Used Listings normally represent one item; verified businesses may represent stock quantities.
- A Customer sends a Service Request to a selected Service Provider; there is no open provider-bidding marketplace.
- An accepted Quote snapshot creates the Booking agreement.
- A Change Proposal changes the Booking only after Customer acceptance and includes evidence, reason, and price/schedule impact.
- A Seller declares available fulfillment methods; the Buyer chooses among eligible external shipping, seller-arranged delivery, or pickup options.
- Chat remains attached to its Listing, Order, Service Offering, or Booking. Support conversations remain separate.
- Marketplace and service Reviews remain separate. Eligible Reviews contain one overall one-to-five-star rating and optional text/photos; Customers do not receive public ratings at launch.
- Phone/email verification is required. Business Sellers and Service Providers require separate verification presentation.
- Online payments are coordinated through a licensed payment provider. The UI must not describe DecoUp as providing a wallet or escrow unless a later approved contract permits it.
- Service Booking requires an online deposit policy, still to be specified. Marketplace cash-on-delivery eligibility remains a backend/payment-policy dependency.
- No display advertisements, paid provider plans, mandatory posting fees, or paid placement are part of launch. Later promoted placement must be clearly labeled and must not imply guaranteed organic ranking.

## High-Level Design

The web app presents two primary journeys sharing identity, trust, chat, payment status, and review capabilities:

1. **Marketplace:** discover Listing → inspect Seller and fulfillment → optionally negotiate → checkout with one Seller → follow Order/payment/shipment → review after eligible completion.
2. **Services:** discover Service Offering and Provider → send Service Request → receive and compare the selected Provider's Quote with the original request → accept and fund the required deposit → follow Booking → review/accept any Change Proposal → complete/dispute → review after eligible completion.

Each journey uses its own domain language and status presentation. Order and Booking must never be presented as interchangeable records. Web modules consume backend-owned contracts through shared frontend transport conventions; they do not create independent business authority.

## Low-Level Design

- Each page or view resolves one primary context identifier before loading related chat, payment, fulfillment, or review state.
- Listing actions expose Buy and, only when enabled, Make Price Offer. Service Offering actions expose Send Service Request; they do not expose marketplace-style Price Offers.
- Checkout rejects or separates cross-Seller selections before Order confirmation. The interface explains the one-Seller launch limitation.
- Service Request input supports location, relevant space/equipment details, photos, budget, and preferred schedule.
- Quote review shows scope, total price, schedule, assumptions, and the Service Offering pricing snapshot available when the request was sent.
- A Quote outside an advertised starting price or range must display the Provider's explanation once the backend contract supplies it.
- Booking confirmation preserves the accepted Quote version and does not infer agreement from chat messages.
- Change Proposal review displays timestamped evidence, explanation, changed scope, added cost, and schedule impact. Rejecting a proposal does not authorize an extra charge.
- Provider and Seller verification indicators identify what was verified without promising work quality.
- Contact-sharing behavior before and after Booking commitment remains blocked on the policy decision in Open Questions.
- Payment, refund, dispute, shipment, and completion controls render only backend-authorized transitions; the client must not synthesize successful states.
- Review submission is available only for backend-confirmed eligible completion and remains reportable for moderation.
- Empty, loading, stale, unauthorized, rejected, cancelled, refunded, and disputed states require explicit user feedback rather than silent fallback.

## Data Modelling

The frontend owns no canonical commerce or service records. It consumes versioned read/action contracts for these concepts:

- Listing, Price Offer, Order, fulfillment option, Shipment, Seller, and business-verification summary;
- Service Offering, Service Request, pricing snapshot, Quote, Booking, Change Proposal, Change Evidence, Service Provider, and provider-verification summary;
- contextual Chat, Support Conversation, Payment status, Review eligibility, Review, and moderation status.

Relationships visible to the client preserve one Seller per Order, one accepted Quote snapshot per Booking revision, contextual chat ownership, and Review eligibility tied to an eligible completed Order or Booking. Backend and shared specifications must define identifiers, lifecycle transitions, money representation, and concurrency/version rules before implementation tickets are approved.

## Acceptance Criteria

- AC-01: The web app distinguishes marketplace Orders from service Bookings in labels, actions, and status presentation.
- AC-02: A Buyer can start checkout only with Listings belonging to one Seller and receives an explanation for cross-Seller selections.
- AC-03: A Price Offer action appears only on eligible Listings and is never used for a Service Offering.
- AC-04: A Customer can submit a Service Request to one selected Service Provider with the agreed request details.
- AC-05: Quote review displays scope, price, schedule, assumptions, and the request-time Service Offering pricing snapshot.
- AC-06: Accepting a Quote creates a Booking only through a backend-authorized action and preserves the accepted Quote reference/version.
- AC-07: A Change Proposal cannot appear as accepted or change displayed Booking totals until backend-confirmed Customer acceptance.
- AC-08: Rejecting a Change Proposal does not display or initiate an extra charge.
- AC-09: Marketplace fulfillment choices show only methods declared and authorized for that Order.
- AC-10: Participant chat opens in the correct Listing, Order, Service Offering, or Booking context; support opens separately.
- AC-11: Verification indicators describe verified identity/business status without representing a guarantee of quality.
- AC-12: Reviews are offered only after backend-confirmed eligible completion and keep marketplace and service reputation separate.
- AC-13: The launch experience contains no display-ad inventory, provider-plan upsell, posting-fee requirement, or paid-placement control.
- AC-14: Payment UI uses provider-neutral, legally accurate language and does not call DecoUp funds a wallet or escrow without an approved contract.
- AC-15: All mutating actions expose pending, success, validation-error, conflict/stale-version, unauthorized, and recoverable failure outcomes.

## Testing

- Contract tests cover authorized and rejected transitions for Price Offers, checkout, Quotes, Bookings, Change Proposals, fulfillment, payment status, and Reviews.
- Boundary tests verify that marketplace modules do not import service-domain internals and vice versa.
- Interaction tests verify one-Seller checkout, Quote snapshot presentation, Change Proposal acceptance/rejection, contextual chat routing, and completion-gated Reviews.
- Accessibility checks cover keyboard operation, labels, focus order, error association, status announcements, and non-color-only trust/payment indicators.
- Responsive checks cover supported web viewports without treating the web app as the native-mobile implementation.
- Policy-dependent tests remain blocked until the matching Open Question is resolved; tests must not encode an assumed answer.

## Dependencies

- Domain language: `../decoup-web/CONTEXT.md`, `../decoup-be/CONTEXT.md`, and `../decoup-mb/CONTEXT.md` relative to the specification repository.
- Research: `../decoup-web/docs/research/vietnam-marketplace-account-and-checkout-patterns.md`.
- Research: `../decoup-web/docs/research/ecommerce-marketplace-revenue-models.md`.
- Research: `../decoup-web/docs/research/service-marketplace-provider-pricing-and-circumvention.md`.
- Future backend/shared specs must define lifecycle contracts, money/payment rules, verification, moderation, and review eligibility.
- Future mobile spec must define the native primary experience without copying web DOM/CSS implementation.

## Out of Scope

- PC-assembly service booking.
- DecoUp-owned inventory or a standalone driver marketplace.
- Auctions, open provider bidding, multi-Seller checkout, or public Customer ratings.
- Generic unsolicited messaging or carrier chat.
- Provider wallet/escrow claims, generic page advertising, promoted placement, or provider subscription plans at launch.
- Backend implementation, database schema, API endpoint selection, payment/shipping vendor selection, and native-mobile screens.

## Open Questions

- OQ-01: Confirm one User account with separately activated Seller and Service Provider profiles and distinct onboarding/verification.
- OQ-02: Confirm Service Offering price modes: fixed package, genuine starting price with defined minimum scope, assumption-based range, or quote required; no service “open to offers.”
- OQ-03: Resolve the latest provider-fee conflict: retain provider-paid completion commission and no Customer platform fee at launch, or revise the earlier decision.
- OQ-04: Confirm no provider subscription tiers at launch and defer a Pro plan until concrete paid tools are validated.
- OQ-05: Confirm that pre-Booking scoping stays in DecoUp, obvious contact/payment redirection is restricted before commitment, and contact exchange is allowed after Booking/deposit for onsite coordination.
- OQ-06: Confirm price-snapshot comparison and warning/demotion/removal/suspension for repeated bait pricing.
- OQ-07: Define service deposit amount/timing, cancellation/refund rules, milestone use, dispute outcomes, and provider payout timing.
- OQ-08: Define marketplace cash-on-delivery eligibility and cancellation/return/refund policy.
- OQ-09: Define verification evidence, moderation appeal, Review eligibility window, and Review editing policy.

## Revision History

- Revision 3: Clarified worldwide product intent while retaining Ho Chi Minh City as the first rollout; remains superseded.
- Revision 2: Retired before approval and split into `DU-FE-marketplace-launch` and `DU-FE-service-booking-launch`; no requirements were approved by this structural decision.
- Revision 1: Initial draft synthesized from accepted product discovery; unresolved account, provider-pricing, contact, deposit, and trust policies remain open; not approved.
