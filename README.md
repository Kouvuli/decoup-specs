# DecoUp Specs

One specification repository for the mobile-first DecoUp product: backend, web application/landing site, mobile, and shared contracts. Markdown is the editable source; the local web reader provides scope-grouped navigation, rendered content and raw Markdown access. No product requirements have been invented.

## Read and update

The header has two sections:

- **Delivery:** groups bounded feature specifications under lightweight Epics. Each feature contains stable User Story and Acceptance Criterion IDs and offers its full specification, high-level design, low-level design and optional data modelling. These are views of one canonical Markdown source and share one revision/approval.
- **Skills:** lists the installed repo-local skills for backend, frontend, mobile and this spec repo. It reads actual SKILL.md files, ownership registries and agents/openai.yaml policies, displays source paths/raw instructions and diagrams the main workflow handoffs. Global/plugin skills are not repo-local inventory. Missing checkouts are reported rather than silently treated as empty.

Refresh both specs and skills with `npm run catalog` (also runs before dev/build/check). Keep sibling repo folder names alongside decoup-specs. This is a generated snapshot, not live synchronization. Source skill folders are never modified by the reader.

Local ownership and invocation are different: `decoup-*-to-spec` and `decoup-*-to-ticket` are manual entry points; `mono-to-microservices` and `update-matt-pocock-skills` permit automatic selection during matching tasks. Both kinds remain directly invokable, and neither is a background job or grants external-action permission.

Use Node 22.13+ (tested with Node 24) and npm:

```sh
npm ci
npm run dev
```

Open the local URL printed by the server. The reader is read-only; use the repo-specific to-spec skill or edit Markdown source, then run `npm run catalog`. The development reader reloads generated content through normal HMR; a restart also regenerates it.

- [Workflow](docs/workflow.md)
- [Shared brand, native mobile UI: skills and usage prompts](docs/shared-brand-native-ui.md)
- [Markdown versus HTML](docs/format-choice.md)
- [Spec authoring and revisions](docs/authoring.md)
- [Trello setup and sync](docs/trello.md)

## Layout

```text
specs/{shared,backend,frontend,mobile}/    canonical specs (empty until requested)
epics/                                    lightweight delivery outcomes and feature links
docs/                                    maintained workflow/reference pages
templates/epic.md                        reusable Epic template
templates/spec.md                        reusable metadata/section template
scripts/catalog.mjs                      metadata validation + reader index
lib/catalog.generated.json               generated, ignored
app/                                     local documentation reader
```

`npm run check` validates specs and TypeScript. `npm run build` builds the reader. Use `npm run catalog` after manual edits; do not maintain a separate HTML version of a spec.

The reader uses the Sites-generated Vinext scaffold; it does not change DecoUp's product framework decisions. Mobile now uses React Native + Expo + TypeScript; see [mobile stack evidence](../decoup-mb/docs/research/mobile-stack.md). Trello publishing is unavailable until its MCP and real board/list IDs are configured. No Git remote, commit, or deployment is created.

See [setup verification and limitations](docs/SETUP_VALIDATION.md). The reader framework is beta; Markdown remains portable and readable independently of it. No persistent preview process or background Trello sync is installed.

## Contributing

See [Git hooks, commit conventions, CI and GitHub Flow](CONTRIBUTING.md).
