---
id: GUIDE-AUTHORING
title: "Authoring and revising specifications"
scope: shared
status: reference
summary: "Stable identifiers, scoped ownership and explicit revision approval."
revision: 2
updated: "2026-09-08"
---

# Stable identity, explicit approval

Start Features from `templates/spec.md` and Epics from `templates/epic.md`. Metadata uses YAML front matter. A spec is a decision artifact; its status is not an implementation-completion status.

## Required metadata

- `id`: `DU-BE-<slug>`, `DU-FE-<slug>`, `DU-MB-<slug>` or `DU-SH-<slug>`. Slugs use lowercase words/digits and hyphens. Search before allocating; check again before writing.
- `title`: human-readable title.
- `scope`: backend, frontend, mobile or shared; matches both ID prefix and directory.
- `surface`: backend, web-app, marketing, mobile or shared. FE covers either web-app or marketing, not both implicitly.
- `status`: draft, approved or superseded.
- `revision`: positive integer starting at 1; increment for any edit to canonical spec content after creation (including editorial fixes), so card references cannot silently drift.
- `approved_revision`: null for a draft; equal to revision for approved specs.
- `approval_evidence`: null for a draft; an actual user approval reference/summary for approved specs. Never manufacture approval.
- `updated`: quoted ISO date (YYYY-MM-DD).
- `related`: list of existing spec IDs; unresolved future work is recorded in Open Questions, not a dangling ID.
- `summary`: one-line scope statement.

Feature specs also require `epic`, containing one existing `DU-EP-<slug>` ID. An Epic is a lightweight outcome and ordering container, not a replacement for a Feature spec.

## Delivery hierarchy

Use the smallest hierarchy that preserves traceability:

```text
Epic → Feature spec → User Story → Acceptance Criterion → repo-owned ticket
```

- **Epic:** a broad business outcome spanning multiple Features. Store it under `epics/` from `templates/epic.md`; do not add implementation detail or duplicate Feature requirements.
- **Feature:** one bounded, independently approvable specification under `specs/<scope>/`.
- **User Story:** a user-visible outcome inside one Feature, headed `### US-01 — ...`. IDs are stable within that Feature.
- **Acceptance Criterion:** a verifiable requirement formatted `AC-01 (US-01): ...`; every criterion maps to one Story.
- **Ticket:** a small implementation slice owned by one repository. One Story may require multiple BE/web/mobile tickets; do not force one Story to equal one ticket.

Epic IDs use `DU-EP-<slug>`. Epic metadata contains `features`, a unique list of current Feature IDs. Feature `epic` metadata and the Epic list must agree. Superseded Feature specs remain historical sources but are removed from the Epic's current `features` list.

Epic status and approval fields follow the same revision rules as Feature specs. Approving an Epic confirms its outcome and Feature breakdown; it does not approve the requirements inside its Features.

The filename is the exact ID plus `.md`. Every spec needs the template's sections. Keep acceptance criteria individually identifiable, testable and scoped. Never fill unknown business rules with plausible defaults.

## Feature delivery documents

One scope-owned feature spec is one Delivery entry. Keep its high-level and low-level design in the same Markdown file under exact `## High-Level Design` and `## Low-Level Design` headings. These sections are required; mark undecided details explicitly rather than inventing them. The optional `## Data Modelling` section covers entities, relationships, ownership and lifecycle only when the feature needs it; omit it otherwise, or explicitly document why no change is needed. Missing data modelling means not documented, not an automatic decision that it is unnecessary.

The reader offers separate design views of those sections, not separate competing documents or approvals. All sections share the spec ID, revision and approval rules. Related scope-specific specs use `related`; the reader does not infer that similarly named specs are the same feature.

Keep Stories and Criteria in the Feature source. Trello stores execution summaries and references these IDs; it is not the canonical Story store.

Product-repo to-spec skills already read this authoring guide and template, so future specs use this structure without editing Matt's skills. No schema or business implementation is authorized by a design document.

## Updates and history

Inspect the existing source and capture its hash or content before editing. Recheck immediately before writing; if another session changed it, reconcile instead of overwriting.

Keep the ID and path stable. Increment revision, reset status to draft and clear approved_revision/approval_evidence when editing an approved spec. Preserve the previous approval and summarize the delta under Revision History. A status-only promotion after user approval does not change revision because the approved requirement text is unchanged; record that approval in history. Superseding is explicit and links the successor.

Git supplies durable revision history only after the user commits. These repos initially have no commits: the in-document Revision History is useful, but is not a replacement for future reviewed Git history or a byte-exact immutable snapshot.

## Scope rules

Shared specs define joint product behavior/contracts, not a dumping ground for every implementation detail. Scope-specific skills may propose shared specs when asked; editing another owner's accepted scope requires an explicit request. Capture reciprocal impacts as linked proposals.

Reference actual architecture/ADRs in the product repo and agreed contract artifacts. Do not invent endpoints, schema definitions or provider choices merely to complete a template.

## Verification

Run `npm run catalog` here after edits. It validates IDs, scope/surface, revisions/approval metadata, required headings and related-spec links before replacing generated views. When validation fails, the previous catalog remains; fix the source and regenerate before treating the reader as current.
