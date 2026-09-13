---
id: GUIDE-WORKFLOW
title: "From a product decision to a Trello ticket"
scope: shared
status: reference
summary: "From agreed scope to reviewed specifications and repo-owned Trello tickets."
revision: 5
updated: "2026-09-10"
---

# Decide → Epic → Feature → approve → ticket

## Choose the repository skill

| Repository | Write/update the canonical spec | Plan/publish implementation tickets |
| --- | --- | --- |
| decoup-be | `$decoup-be-to-spec` | `$decoup-be-to-ticket` |
| decoup-web | `$decoup-fe-to-spec` | `$decoup-fe-to-ticket` |
| decoup-mb | `$decoup-mb-to-spec` | `$decoup-mb-to-ticket` |

These are project-owned adaptations of Matt Pocock's spec/ticket disciplines. They do not edit or automatically invoke his user-only orchestration skills. Mobile now has 21 unchanged Matt Pocock skills plus four project-owned skills and a React Native + Expo + TypeScript scaffold. Web-only design providers remain in decoup-web. Repo folder renames do not change skill command names, spec scope directories or stable spec IDs. Existing reader bookmarks using the former repository names resolve to the renamed repositories.

## Source of truth

For visual work, follow [Shared brand, native mobile UI](shared-brand-native-ui.md). Mobile additionally has three Expo skills (28 total): use approved shared brand decisions, then native-specific planning/implementation and device evidence. The guide includes prompts and uninstalled dependency gates; web providers remain web-only.

Specs live here in `specs/<scope>/<stable-id>.md`, not as full copies in product repos, Confluence, or Trello. Shared behavior/contracts belong to a shared spec linked by the relevant BE/FE/MB specs. Scope-specific details remain in the owner spec.

Epics live in `epics/` and contain only the outcome, scope, success measures, and links to current Feature specs. Every Feature identifies its parent Epic and contains stable User Story and Acceptance Criterion IDs. A Story describes user value; a Trello ticket describes one repository's implementation work, so one Story may map to multiple tickets.

The code repo's `docs/agents/planning.json` locates this sibling checkout and its Trello configuration. If the checkout is missing, stop and ask for its location; never silently create a competing local spec.

## Review before work

A to-spec invocation synthesizes agreed discussion; uncertain facts stay explicit. New or semantically changed specs are drafts. Acceptance criteria and test seams need user agreement. Approve the exact current revision before publishing implementation tickets.

When a Feature still has Open Questions, `decoup-fe-to-spec` asks dependency-aware rounds before writing: every question explains why it matters, presents viable trade-offs, and marks one recommendation that the user must confirm or override. Answers remain in the active conversation until all blocking questions are settled or explicitly deferred; the skill then applies one consolidated revision per affected canonical document. Recommendations never count as answers, and resolved questions never imply revision approval.

To-ticket reads the canonical source and creates small verifiable slices within its repo's ownership. Every ticket records Epic ID, Feature ID/revision, Story IDs, and Acceptance Criterion IDs. Cross-repo prerequisites become links/blockers, not permission to write another repo's code. A web ticket identifies whether it concerns the web app or marketing surface; mobile tickets account for app lifecycle/client compatibility when relevant.

## Trello later

No MCP or destination has been configured. To-ticket can save reviewed local drafts under the product repo's `.scratch/trello/`, clearly marked **not published**. These are drafts, not an automatic outgoing queue.

After the user connects Trello, verify the actual board/list and capabilities, review the proposed cards, and publish only the approved set. Record returned IDs/URLs after read-back verification. See [Trello setup](trello.md).

## Keep specs current

Before implementing a ticket, compare its recorded spec revision with the canonical approved revision. If stale, reassess the ticket; do not silently implement old requirements. After implementation, record evidence and proposed requirement changes separately. A changed accepted spec becomes a new draft revision requiring renewed approval; do not overwrite approval history or rewrite requirements merely to match code.
