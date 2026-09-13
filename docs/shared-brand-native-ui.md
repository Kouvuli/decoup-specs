---
id: GUIDE-BRAND-NATIVE-UI
title: "Shared brand, native mobile UI"
scope: shared
status: reference
summary: "How to reuse approved brand decisions while designing, implementing and checking native mobile UI."
revision: 1
updated: "2026-09-07"
---

# Shared brand, native mobile UI

Use the same approved brand intent on web and mobile, not the same screen code. This page documents the requested workflow; it does not select a palette, font, logo, component library or product feature. No brand specification has been approved by this installation.

## What is shared and what is native?

| Share as approved design decisions | Keep platform-specific |
| --- | --- |
| Brand identity, voice, logo usage and licensed assets | DOM/CSS versus React Native components |
| Semantic color roles and agreed brand accents | Native semantic colors, dark-mode/accessibility adaptation |
| Typography intent and approved font licensing | Font loading, fallback, scaling and platform metrics |
| Spacing rhythm, hierarchy and motion intent | Safe areas, keyboard avoidance, touch feedback and reduced motion |
| Consistent meaning for loading, error and empty states | Navigation, Android back behavior, gestures and native controls |

A similar brand does not require identical pixel sizes or desktop layouts on a phone. Never import decoup-web source into decoup-mb. If code sharing becomes worthwhile, propose a reviewed, versioned platform-neutral package; none is created now.

## Where decisions live

1. Optional website extraction or screenshot study is **reference material**, not approved DecoUp branding. Keep source/usage rights and distinguish inspiration from copying.
2. When brand choices are actually agreed, explicitly request a shared draft under `specs/shared/` using the normal authoring template. Record each decision, evidence, unresolved questions and platform exceptions. Do not invent an approved shared spec just to satisfy a link.
3. Approve its exact revision. Mobile and web feature specs link the real shared ID through `related` and record the consumed revision in their text. HLD records brand intent and platform behavior; LLD records native mapping/component ownership; data modelling is included only if needed.
4. Repo-local DESIGN.md or token documentation may describe implementation and link the canonical revision; they do not replace requirements or constitute independent approval. If a shared revision changes, assess both clients and reapprove affected scope revisions before implementing stale tickets.

No branding is agreed yet? Use the discovery prompt below and leave decisions open. Skill example colors, fonts and theme values are not DecoUp defaults.

## Installed mobile UI skills

All three are unchanged, pinned originals from [Expo](https://github.com/expo/skills). They can be selected during matching authorized work or invoked directly; they do not run continuously. Ownership is recorded separately from Matt's and DecoUp's skills.

| Skill | Use it for | Dependencies / limits | Read original in mobile repo |
| --- | --- | --- | --- |
| `expo-overview` | Start Expo work: identify SDK and route the task to relevant guidance. | Router mentions do not install other skills. No project reinitialization, EAS linking, SDK upgrades or remote feedback as a side effect. | `.agents/skills/expo-overview/SKILL.md` |
| `expo-native-ui` | Plan or implement native layouts, platform styling and native behavior within agreed scope. | References `expo-ui` for component selection and `expo-router` for navigation; neither is installed. Pause that portion and propose the needed skill/dependency review. Do not guess APIs or treat HTML as native evidence. | `.agents/skills/expo-native-ui/SKILL.md` |
| `expo-design-system` | Map approved decisions into one native token/component system and audit visual drift. | Uses native-UI guidance; do not introduce a competing theme, copy demo tokens as approved branding, or restructure the repo to match upstream examples. | `.agents/skills/expo-design-system/SKILL.md` |

Runtime packages are separate from instruction files. Installing these skills did not add Expo Router, @expo/ui, NativeWind, animations, UI components or hooks. Deferred routing targets are not available merely because expo-overview names them. Verify SDK-specific documentation and both platforms when implementation is authorized; upstream iOS examples and broad Expo Go claims are not universal compatibility guarantees.

## Recommended flows

### Discover and specify

Optional web reference study in decoup-web → draft brand decisions → user approval of shared revision → expo-overview → expo-native-ui + expo-design-system for mobile planning → decoup-mb-to-spec → approve mobile revision → decoup-mb-to-ticket.

SkillUI/Hallmark/Impeccable stay in web. Choose one web visual lead; mobile consumes the approved decisions, not extracted CSS or a mandatory chain of redesign tools. Planning guidance does not authorize writing product code.

### Implement and validate

Explicit implementation request for an approved ticket → implement + tdd → expo-overview → native-ui/design-system as needed → code-review + native evidence → report remaining gaps.

Mobile shared UI stays behind `src/shared/ui/index.ts`; one future theme belongs within that shared UI area, not a second upstream-example folder. Private feature views remain in their owning `src/modules/<domain>/internal/`; the app shell composes public module entrypoints. Build only components justified by real features.

## Prompts to use

Run these in a task opened in the named repository. Replace placeholders with real approved IDs/revisions before delivery work. Skill invocations below are agent prompts, not terminal commands.

**Mobile — plan first, without implementing:**

```text
Use $expo-overview, $expo-native-ui and $expo-design-system to plan
the mobile UI for the feature we discussed. Read the shared brand
spec if one exists; otherwise list open brand decisions for my review.
Reuse approved intent, but account for iOS and Android behavior.
Do not add runtime packages, screens or a navigation system yet.
```

**Mobile — create the canonical specification:**

```text
Use $decoup-mb-to-spec to capture our agreed mobile UI plan.
Link the actual approved shared brand spec and record its revision.
Include HLD, LLD, native accessibility checks and optional data modelling.
Keep it draft until I approve the exact revision. Do not implement.
```

**Mobile — plan tickets after approval:**

```text
Use $decoup-mb-to-ticket for <approved spec ID>, revision <number>.
Include native validation and any missing dependency review as explicit work.
Save unpublished drafts only; do not send Trello cards.
```

**Mobile — review existing UI without edits:**

```text
Use $expo-design-system and $expo-native-ui to review <screen/files>
against <approved brand spec and revision>. Report design drift,
platform/accessibility issues and missing device evidence. Do not edit.
```

**Web — consume the same agreement:**

```text
Use $decoup-fe-to-spec for the agreed web surface, linking the same
approved shared brand revision. Keep desktop/web interactions appropriate
and record differences from mobile. Do not copy native components.
```

## What counts as validation?

- Types/import checks and Metro exports: structural/bundling evidence only.
- Native simulator/device checks: record platform, OS, app build and tested scenario; mark unavailable checks as not run.
- Inspect safe areas, keyboard/input, scrolling, navigation/back behavior and touch feedback on both iOS and Android where relevant.
- Check screen-reader labels/order, text scaling, contrast, dark mode, reduced motion, loading/error/empty states and relevant offline behavior.
- Compare native screenshots with approved intent, not pixel clones of a website. Browser or Impeccable audit results do not prove native accessibility or performance.

## Read, customize and update

The mobile [Agent Skills Guide](../../decoup-mb/docs/AGENT_SKILLS_GUIDE.md) gives exact paths and outputs. Read supporting references beside each SKILL.md. Keep Expo originals unchanged; create a separately named project-owned adaptation if customization is needed. Review Expo updates separately using its pinned external source registry; the Matt updater must not overwrite Expo skills. No automatic feedback submission, telemetry, plugin/MCP setup, cloud build or publication is enabled.
