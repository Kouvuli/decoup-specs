---
id: GUIDE-IMPECCABLE-COMMAND-FLOWS
title: "Impeccable command flows"
scope: shared
status: reference
summary: "Examples and handoffs for every Impeccable design command used by DecoUp web and mobile."
revision: 1
updated: "2026-09-16"
---

# Impeccable command flows

Run these prompts in the owning product repository. Web targets live in `decoup-web`; native targets live in `decoup-mb`. The installed Impeccable version has 23 primary commands plus `teach`, an alias for `init`, giving 24 invokable names.

Commands are tools, not a required sequence. Planning and review do not authorize implementation. Canonical requirements remain in approved DecoUp specs; PRODUCT.md, DESIGN.md, surface briefs and reports are supporting context.

## Standard delivery flow

```text
optional SkillUI evidence
→ $impeccable shape <surface>
→ scope-owned to-spec
→ approve exact spec revision
→ scope-owned to-ticket
→ approve and implement a ticket
→ one or more targeted Impeccable improvement commands
→ $impeccable critique <target> and/or $impeccable audit <target>
→ $impeccable harden <target>
→ $impeccable polish <target>
→ code review and platform evidence
```

Mobile additionally uses `expo-overview`, `expo-native-ui` and `expo-design-system` during planning and implementation. Browser evidence never substitutes for native device/accessibility evidence.

## Context and target rules

- Impeccable reads the target code plus repository instructions, PRODUCT.md, DESIGN.md and a matching surface brief when present.
- Use `init` once when durable product context is missing or stale. It is not required before a narrow review of existing code.
- Name a concrete route, screen, component or source path. Supply safe fixtures or a development environment when realistic loading, empty, error and permission states matter; never use production credentials or customer data.
- `shape`, `critique` and `audit` produce planning or findings. Commands that change UI require an explicit implementation request and must preserve approved requirements.
- `critique` may require permission for independent sub-agents. `live` is web-only and requires a running development server. Native `audit` and `adapt` use their native playbooks.

## Build and context commands

| Command | Example prompt | Result and next handoff |
| --- | --- | --- |
| `init` | `$impeccable init` | Inspect known project facts, ask only for material gaps, then create or update PRODUCT.md. Resume `shape` or the original design request; do not treat PRODUCT.md as requirement approval. |
| `teach` | `$impeccable teach` | Alias for `init`; use only when that wording is clearer. It produces the same PRODUCT.md flow, not a second setup path. |
| `shape` | `$impeccable shape the marketplace listing and detail experience` | Interview for UX/UI decisions and produce a confirmed design brief without coding. Send agreed requirements to `$decoup-fe-to-spec` or `$decoup-mb-to-spec`. |
| `craft` | `$impeccable craft a seller storefront` | Deprecated alias for ordinary new design work. Prefer a natural build request or `shape` followed by the approved delivery flow. |
| `document` | `$impeccable document` | Extract the incumbent visual system from existing code into DESIGN.md. Review it before using it as implementation guidance; it does not approve new requirements. |
| `extract` | `$impeccable extract the repeated listing-card styles into the shared design system` | Consolidate proven tokens/components during authorized implementation. Run targeted tests, then `audit` or `polish` the affected surfaces. |

## Evaluation commands

| Command | Example prompt | Result and next handoff |
| --- | --- | --- |
| `critique` | `$impeccable critique apps/web/src/modules/marketplace` | Produce a scored UX/design review of hierarchy, information architecture, cognitive load and visual quality. Approve selected findings before applying a matching refinement command. |
| `audit` | `$impeccable audit apps/web/src/modules/marketplace` | Produce a read-only technical report covering accessibility, performance, theming, responsiveness and implementation integrity. On mobile, target `src/modules/<domain>` and require later device evidence. |

## Refinement commands

| Command | Example prompt | Result and next handoff |
| --- | --- | --- |
| `polish` | `$impeccable polish the marketplace listing page` | Apply a bounded final pass for spacing, alignment, consistency and details. Re-run relevant checks and stop after the bounded confirmation pass. |
| `bolder` | `$impeccable bolder the seller storefront hero without changing approved copy` | Increase visual character while preserving product truth and behavior. Follow with `critique` at the same target. |
| `quieter` | `$impeccable quieter the checkout summary without weakening hierarchy` | Reduce visual intensity and distraction while keeping essential emphasis. Follow with accessibility and task-flow checks. |
| `distill` | `$impeccable distill the listing filters to the controls buyers actually need` | Remove unnecessary UI complexity without deleting approved capabilities. Recheck affected Acceptance Criteria before review. |
| `harden` | `$impeccable harden the listing detail screen for empty, loading, error, long-text and RTL states` | Add production edge-state resilience, safe overflow and internationalization behavior. Run automated checks plus web or native platform evidence. |
| `onboard` | `$impeccable onboard first-time sellers through listing creation` | Design or implement first-run guidance, activation and empty states within approved scope. Capture new behavioral requirements in a spec before coding them. |

## Enhancement commands

| Command | Example prompt | Result and next handoff |
| --- | --- | --- |
| `animate` | `$impeccable animate listing-card feedback and page transitions with reduced-motion support` | Add purposeful motion during authorized implementation. Verify focus, reduced motion and performance afterward. |
| `colorize` | `$impeccable colorize the marketplace filters using approved semantic brand roles` | Add strategic color through approved tokens, never invented brand values. Audit contrast and dark mode afterward. |
| `typeset` | `$impeccable typeset the product detail page for clearer price, seller and fulfillment hierarchy` | Improve font usage, sizing, weight and reading hierarchy. Validate text scaling, wrapping and licensed font availability. |
| `layout` | `$impeccable layout the marketplace result page for mobile, tablet and desktop` | Improve composition, spacing and hierarchy. Follow with responsive checks or native device validation. |
| `delight` | `$impeccable delight the saved-item interaction without delaying the core action` | Add restrained personality or feedback. Verify accessibility, performance and that the embellishment does not obscure state. |
| `overdrive` | `$impeccable overdrive the approved campaign landing hero while preserving performance and reduced motion` | Build an explicitly requested ambitious visual effect. Use only where the brief warrants it; follow with `optimize`, `audit` and browser evidence. |

## Fix commands

| Command | Example prompt | Result and next handoff |
| --- | --- | --- |
| `clarify` | `$impeccable clarify checkout labels and recoverable payment error messages` | Improve UX copy without inventing policies, promises or backend behavior. Send changed requirements through the spec approval flow. |
| `adapt` | `$impeccable adapt the listing detail experience for 320px web and one-handed native use` | Adapt layouts and interactions to devices/platforms. Web requires responsive evidence; mobile requires Expo guidance and native checks. |
| `optimize` | `$impeccable optimize the marketplace result page rendering, images and interaction latency` | Diagnose and improve UI performance without speculative rewrites. Record measurements before and after the bounded change. |

## Interactive command

| Command | Example prompt | Result and next handoff |
| --- | --- | --- |
| `live` | `$impeccable live` | On web only, connect to an already running development server for interactive variants. Selecting a variant is not approval to change requirements; finish with normal code review and checks. |

## Common examples

### Existing web feature

```text
$impeccable critique apps/web/src/modules/marketplace
→ approve the P0/P1 findings to address
→ $impeccable harden apps/web/src/modules/marketplace
→ $impeccable polish apps/web/src/modules/marketplace
→ $impeccable audit apps/web/src/modules/marketplace
→ npm run check
```

### New mobile surface

```text
optional $decoup-mb-skillui <approved reference>
→ $impeccable shape the native marketplace listing experience
→ $expo-overview with $expo-native-ui and $expo-design-system
→ $decoup-mb-to-spec
→ approve exact revision
→ $decoup-mb-to-ticket
→ explicitly authorized implementation
→ $impeccable adapt src/modules/marketplace
→ native $impeccable audit src/modules/marketplace
→ iOS and Android device/accessibility evidence
```

### Existing coherent interface without DESIGN.md

```text
$impeccable document
→ review DESIGN.md against approved brand/spec decisions
→ $impeccable extract <confirmed repeated pattern> when consolidation is needed
→ $impeccable audit <affected surface>
```

Impeccable also exposes `doctor` and `hooks` as operational maintenance controls. They are not part of the 24 design-command names. Use them only when explicitly requested; hooks, live bridges, shortcut pins and engine acquisition are not activated by ordinary setup.
