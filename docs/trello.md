---
id: GUIDE-TRELLO
title: "Trello publishing without duplicate cards"
scope: shared
status: reference
summary: "Configure Trello later, then publish reviewed cards without duplicate retries."
revision: 2
updated: "2026-09-08"
---

# Trello is the execution board

**Current state: disconnected. No cards, boards, lists or labels have been created.**

## Configure later in each product repo

Edit `docs/agents/planning.json`: confirm `specRepository`, and populate `trello.boardId`, `trello.listId`, optionally label IDs and the agreed shareable spec URL base. Set `trello.enabled` only after connecting MCP and verifying read/create/update capabilities. Keep credentials in the connector, never JSON or source files.

A board name is not an ID. Read back the configured destination and verify the list belongs to the intended board; do not choose the first board returned. Publish approval must identify the destination and proposed cards.

The connected MCP's actual schema is authoritative. Do not invent tool names or assume a particular integration supports native dependency links, custom fields or idempotent creation. Trello's REST API has card create/read/update operations; connector coverage must be discovered separately. [Trello card API](https://developer.atlassian.com/cloud/trello/rest/api-group-cards/)

## Delivery mapping

Trello remains a flat execution board rather than the canonical Epic/Feature/Story hierarchy:

- the Epic and Feature remain Markdown sources in this repository;
- User Stories and Acceptance Criteria remain inside the Feature spec;
- each Trello card is one repo-owned implementation ticket;
- checklists contain only small subtasks that do not need their own lifecycle.

A Story may map to separate backend, web, and mobile cards. Do not create a parent card for every Story merely to simulate hierarchy.

## Card content

A card contains its stable local ticket ID, owner scope/surface, Epic ID, canonical Feature spec ID and revision, User Story IDs, Acceptance Criterion IDs, a concise outcome, blockers, testing evidence expected, and a source reference. IDs must not encode credentials or personal data.

Existing human-facing keys such as `DE-09901` remain Trello ticket identifiers. Store the verified value separately as `externalKey`; do not guess the next key or reuse it as an Epic, Feature, or Story ID. Before Trello assigns or returns that key, use the deterministic local ID such as `DU-FE-price-offers-T01` for draft identity and idempotent reconciliation. When a key is known, card titles may use `[DE-09901] Outcome`; the managed description retains the local ID.

If verified connector capabilities expose Custom Fields, prefer fields for Epic ID, Feature ID, revision, Stories, repository, and external key. Otherwise keep the same mapping in the managed description; do not block drafting on a paid Trello feature.

Local source paths alone are not usable links for collaborators. Until a shareable approved repository/viewer URL exists, leave cards as drafts or obtain explicit approval to attach the exact redacted spec snapshot through a verified MCP capability. Do not claim a localhost URL is shareable.

## Idempotent reconciliation

Keep each ticket's draft and sync record in `.scratch/trello/<local-ticket-id>/` in its owning code repo. Local ticket IDs remain stable across retries and spec revisions; changing the title or receiving a `DE-` key is not a new identity.

Before creating a card, check the saved card ID and search the selected board for the exact ticket marker. If one match exists, verify and reconcile it; if multiple exist, stop for resolution. If create times out after sending, mark the operation uncertain and read/search before retrying. No blind second create.

After success, read back the card and record its real ID, URL, destination, published spec revision and timestamp. On partial failure, retain successes and resume only unsynced drafts. Do not move/archive/delete cards, change members/due dates/labels, or overwrite human edits unless those actions were approved.

Use a dedicated description section for managed ticket content; preserve other text, comments and checklist progress. Describe proposed update conflicts before writing. Blockers are explicit card links/text unless native dependency support is verified; do not pretend labels enforce scheduling.

## Draft is not published

Disconnected or unconfigured operation produces reviewable local drafts and a clear blocked reason. It never reports cards as live. Trello state and accepted spec state are separate, and published work becomes stale when its pinned spec revision no longer matches the approved canonical revision.
