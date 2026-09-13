# DecoUp specification repository

This is the canonical, Git-versionable source for shared, backend, frontend and mobile specifications. It is not a product implementation repository.

- Markdown under `specs/` is authoritative. The HTML reader and generated catalog are views; never edit them to change a requirement.
- Read `docs/authoring.md` before creating/revising a spec and `docs/workflow.md` before planning tickets.
- Product-repo to-spec skills are authorized to write their scoped specs here and propose shared specs when the user requests cross-client scope. They may not silently modify another scope's accepted specification.
- Existing product decisions live in the relevant code repo's CONTEXT.md and ADRs. Link them; do not treat this repo's technical setup as a business spec.
- Keep mobile-first priorities explicit. Web app and landing-page scope both belong to FE, differentiated by the spec's surface metadata.
- Accepted requirements require recorded user approval. An implementation discrepancy is not permission to rewrite the agreed requirement to match the code.
- The reader remains local-only per the user's request. No remote, commit, push, hosted deployment, Trello card or production action is authorized by scaffolding these workflows.
- No credentials, tokens, customer records or private logs in source or viewer output. Trello is not connected yet.
- Run `npm run catalog` after source changes, and `npm run check` for validation. Rebuild the reader when its code changes.
- Delivery uses lightweight Epics containing bounded Feature specs. Features contain stable User Story and Acceptance Criterion IDs plus HLD/LLD sections and optional data modelling; follow docs/authoring.md. Skills inventory is generated read-only from sibling repository SKILL.md files, invocation policies and ownership registries. Never install or alter a source skill just to display it here. Inventory excludes host-global/plugin skills.
- Generated public output includes all current specs (including drafts); it is not permission to publish them. Revisit access/filtering before any hosted version.
