---
id: DU-SH-brand-visual-language
title: "DecoUp visual language"
scope: shared
surface: shared
status: approved
revision: 1
approved_revision: 1
approval_evidence: "User approved the exact shared Feature revision 1 and launch Epic revision 4 in conversation on 2026-09-20."
updated: "2026-09-20"
epic: DU-EP-hcmc-marketplace-services-launch
related:
  - DU-MB-marketplace-launch
  - DU-MB-service-booking-launch
summary: "Provisional color and typography roles for a coherent, accessible DecoUp mobile visual language."
---

# DecoUp visual language

## Problem

The mobile concept images suggest a visual direction but are not approved brand assets or implementation instructions. Mobile needs named roles that work in light and dark appearance before screens consume them.

## Scope

Define provisional shared visual intent and its first mobile mapping. The images in the sibling mobile checkout's `docs/design-concepts/` directory are reference material only; their origin and reuse rights have not been established. This Feature does not change product behavior or require the web client to adopt tokens without its own approved scope revision.

## User Stories

### US-01 — Recognize actions and highlights

As a participant, I can identify primary actions, secondary emphasis, and occasional highlights consistently in either appearance.

### US-02 — Read content comfortably

As a participant, I can read display headings and body text with Vietnamese diacritics at my chosen text size on Android and iOS.

## Decisions and Contracts

The following values are **draft candidates**, not approved brand tokens:

| Role | Light | Dark |
| --- | --- | --- |
| Primary action fill / text | `#C62828` / `#FFFFFF` | `#C62828` / `#FFFFFF` |
| Accent text and icons | `#C62828` | `#FF6B6B` |
| Background / surface | `#FFFFFF` / `#FFFFFF` | `#111827` / `#1F2937` |
| Primary / secondary text | `#17202E` / `#5F6B7A` | `#F9FAFB` / `#C9D2DC` |
| Subtle emphasis fill | `#FFF4F2` | `#3B2327` |
| Occasional highlight fill / text | `#F4C95D` / `#17202E` | `#FFD66B` / `#17202E` |

- Red remains the primary action and navigation accent. Yellow is limited to small, non-interactive callouts or badges; it is not a second action, selection, warning, or status color. Every highlighted meaning also appears in text or an accessible label.
- Display headings use a platform serif; body and control text use the system sans face. The first mobile mapping uses `ui-serif` on iOS and `serif` on Android, with no bundled font or screenshot-derived logo.
- The concept images illustrate hierarchy, warm interiors, and restrained accents. They do not establish exact pixel measurements, navigation, controls, copy, or behavioral requirements. Existing mobile Feature specs own those decisions.
- Sources: `reference-buyer-room-idea-products.jpg`, `reference-customer-provider-request.jpg`, `reference-seller-storefront-listing-order.jpg`, `reference-provider-profile-idea-lead.jpg`, `concept-shared-explore-search-inbox.jpg`, and `concept-account-switch-and-create.jpg` in the mobile repository's `docs/design-concepts/` directory. Its README describes each image's flow and cautions.

## High-Level Design

The shared roles map to one appearance-aware mobile theme behind `src/shared/ui/index.ts`. The app uses role names rather than screen-specific hex values. Red draws attention to actions; yellow marks a small amount of supporting information. Typography separates expressive headings from readable body copy. The mobile scaffold demonstrates both accents before product screens adopt them.

## Low-Level Design

- Export `useColors()` for light/dark color roles and small typography, spacing, and radius scales from the existing shared UI entrypoint. Keep platform serif selection inside the typography mapping and use native text scaling.
- Initial spacing steps: `4`, `8`, `12`, `16`, `24`, `32`; radius steps: `8`, `16`. Initial typography roles: display `32/38`, title `24/30`, body `16/24`, label `14/20` (font size/line height in density-independent points). These are draft implementation candidates and may be revised after native evidence.
- Do not infer components from the images. Add a shared control only when an approved screen needs it and after reviewing the missing `expo-ui` guidance.
- On the dark surface, the red fill alone has less than `3:1` boundary contrast; use a `#C9D2DC` outline when that boundary is necessary to identify a control. The action remains red with white text.
- Preserve sufficient contrast for text and meaningful graphics in both modes, visible focus/selection and state cues beyond color, and legibility under text scaling. Avoid clipping or truncating Vietnamese diacritics.
- If the candidate palette or typography fails native checks, revise this draft and obtain exact-revision approval before implementation proceeds.

## Acceptance Criteria

- AC-01 (US-01): The draft identifies each color role and both appearance values, including yellow highlights that never replace red actions or convey meaning by color alone.
- AC-02 (US-01): On the mobile scaffold, role colors update with appearance; normal text has at least `4.5:1` contrast, large text and meaningful graphical controls at least `3:1`, and highlighted text remains legible in both modes.
- AC-03 (US-02): Platform serif headings and system sans body text render Vietnamese diacritics without clipping on Android and iOS at default and enlarged text sizes.
- AC-04 (US-02): The theme is exported only through `src/shared/ui/index.ts`; no font, logo, product screen, navigation system, or runtime package is added for this Feature.

## Testing

- Validate shared-spec metadata and links with `npm run catalog` and `npm run check` in this repository.
- After approval and mobile implementation, run mobile `npm run check` and an Expo bundle export; these establish structure and bundling only.
- Check the actual app on Android and iOS in light/dark appearance with default/enlarged text, Vietnamese diacritics, yellow/red role distinction, and contrast. Record platform/OS/build and mark unavailable device checks as not run.

## Dependencies

- Parent Epic: `DU-EP-hcmc-marketplace-services-launch`.
- Mobile consumption requires new exact-revision approvals of `DU-MB-marketplace-launch` and `DU-MB-service-booking-launch` after this Feature and the revised Epic are approved.
- Reference workflow: `docs/shared-brand-native-ui.md`; mobile architecture and source-image notes remain in the sibling mobile checkout's `docs/` directory.

## Out of Scope

- Product screens, navigation, controls, logo or font assets, web implementation, runtime packages, Trello publication, and image reuse as production assets.

## Open Questions

- None for this draft. Exact revision approval is pending; native findings may require a new draft revision.

## Revision History

- Revision 1 approval: User approved the exact revision and its testing seams on 2026-09-20; the listed candidate values are approved for this Feature's mobile mapping without changing requirements.
- Revision 1: Initial image-derived visual-language draft, including restricted yellow highlights; not approved.
