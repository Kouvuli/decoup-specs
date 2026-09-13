# Local setup verification

## Shared brand / native UI guide — 2026-09-07

Checks passed: catalog/TypeScript, targeted source lint, reader build, mobile type/import checks and HTTP 200 smoke requests for the new guide and raw Expo skill. Guide navigation uses the existing local state/history handler. Browser interactions and native/device behavior were not tested. Existing nonblocking Vinext build warnings remain; the temporary preview server was stopped after validation.

Current inventories: web 28, backend 25, mobile 28, specs zero. Added the reference guide GUIDE-BRAND-NATIVE-UI with copyable prompts, shared approval/revision ownership, native validation and missing dependency gates. Two mobile UI diagrams link installed Expo skills; web/mobile Skills views link to the same guide. Five guides and zero invented feature/brand specs are present. No palette or product requirement was silently approved.

Expo source/support files and license match their pinned provider source; all generated raw skill copies match their repository originals. Provider labels, invocation modes and local guide links validate. Expo's upstream version-key warnings from the generic validator are recorded in the mobile validation document, not removed from originals. Earlier inventory counts below are historical.

## Repository and mobile update — 2026-09-07

Current checkouts are decoup-web, decoup-be and decoup-mb. Their skill inventories are 28, 25 and 25 respectively. Mobile now uses the original research recommendation: React Native + Expo + TypeScript, with only a bootstrap screen and private domain placeholders. Web-only design skills remain isolated to web. Canonical spec scopes and existing skill command names are unchanged; reader query aliases preserve old repository bookmarks. Git directories are preserved; no remote, commit or hosted deployment is added.

The dated sections below describe earlier deliveries, not the current mobile inventory/framework state.

Local HTTP smoke checks return 200 for the mobile Skills page and its raw migration-skill source. The temporary validation server was stopped afterward. Browser interactions and native/device behavior were not tested.

Validation for the rename/mobile update: web TypeScript/import-boundary checks, backend Maven clean verify (two tests), reader catalog/TypeScript/build and targeted lint pass. Mobile TypeScript/import checks, Expo dependency alignment, all 21 Expo Doctor checks and Android/iOS Metro exports pass; see [mobile audit and device limitations](../../decoup-mb/docs/SETUP_VALIDATION.md). Source scanning finds old repo names only in intentional bookmark aliases. All 21 mobile Matt skill directories match the pinned web originals; all four mobile custom skills pass validation.

## FE design-provider update — 2026-09-06

The FE inventory now contains 28 skills: 21 Matt Pocock, two external design providers (Hallmark and Impeccable), and five project-owned skills including the SkillUI CLI adapter. BE remains 25, mobile two, and this spec repo zero. The reader resolves provider labels from external-skills-source.json and adds FE-only design-discovery/delivery diagrams. Subcommand nodes link to their owning skill. Source skill folders are installed only in FE; the spec repo holds generated read-only display copies.

Source-byte comparisons, required metadata, FE-only isolation, provider/invocation checks, TypeScript, targeted lint and existing isolated catalog checks were verified. Hallmark's upstream version-key warning in the generic skill validator is recorded in the FE design setup guide, not erased from the upstream source. No design extraction, Impeccable runtime acquisition, hooks or product UI work was performed.

## Delivery / Skills update — 2026-09-06

- Added header tabs for Delivery and Skills while preserving existing guide URLs.
- Delivery lists actual scope-owned feature specs, with HLD/LLD views and optional data modelling from the same canonical Markdown source. The template and authoring rules now require nonempty HLD/LLD sections. There are still no invented product features.
- Skills reads 25 backend, 25 frontend and two mobile skills from their real checkouts; the spec repository has no local skills. Invocation labels come from agents/openai.yaml, independently of project/upstream ownership. Global/plugin installations are outside this inventory.
- Flow diagrams explain discovery, approved spec-to-ticket handoffs, implementation support and maintenance without implying automatic user-workflow execution. Missing checkouts have an explicit unavailable state.
- TypeScript, targeted lint, build and isolated catalogue/design-section/invocation checks pass. Local Delivery and Skills HTTP smoke requests return 200. No browser interaction testing was requested or performed.
- No dependency, source skill, Trello configuration or product code was changed for this reader update. Generated inventories omit full skill bodies from the client bundle; exact SKILL.md copies remain available through raw-source links. Regenerate with npm run catalog after skill changes.

## Delivered scope

- Shared Markdown specification repository and a generated local-only HTML reader.
- Four workflow/reference guides; zero invented product specifications.
- Six project-owned planning skills across backend/frontend/mobile; upstream skills are unchanged.
- Backend/frontend each have 21 original upstream skills plus four project-owned skills. Mobile has only the two new planning skills, not a copied upstream installation or selected framework.
- No remote, commit, hosted deployment, Trello connection or card created.

## Checks performed

- All six SKILL.md files pass the bundled skill validator; JSON configuration, destination paths and ownership registries validate.
- All 21 upstream folders in each existing code repo compare byte-for-byte with their pinned upstream source, including supporting files.
- Catalog validation and TypeScript checks pass with Node 24.19.0.
- Reader build succeeds; targeted source lint passes and the four authored code/style files are formatted with the starter's formatter.
- Local HTTP reader smoke request returns 200. Preview opening was queued by the desktop app; no browser interaction or visual QA was requested or performed.
- Isolated temporary fixtures exercise empty libraries, draft/approved metadata, eight invalid-input cases, unchanged generated output after validation errors, exact raw-source copies, symlink rejection and deleted-source cleanup. Fixtures are not product specs and are not retained here.
- The dependency audit reports zero vulnerabilities after targeted security upgrades to the generated reader dependencies. The checked lockfile captures those versions; this is a point-in-time audit, not an ongoing guarantee.

## Limitations and maintenance

These are prompt-driven planning skills, not tested live Trello integrations or background synchronizers. Future publishing requires actual connector capability checks and an approved destination/card set. Local source links are not collaborator-readable: use a real authorized source URL later or approve a redacted snapshot attachment through a verified capability.

The reader is read-only and uses the Sites-generated Vinext beta framework. It does not select the mobile framework or replace the product's Next.js/Spring Boot decisions. The build emits nonblocking starter warnings about a future Vite JSON-import requirement and Vinext's incomplete route classification.

Use Node 24 and npm from this checkout. Run `npm ci`, then `npm run dev` and open its printed local URL. The validation preview session is stopped at task teardown; no persistent service is installed. After Markdown edits, run `npm run catalog`; this is explicit regeneration, not a file-watching daemon. AI can always consume canonical Markdown without the reader running.

The catalog validates current metadata, not historical approval authenticity or monotonic revisions across Git history. The skills enforce exact-revision approval and concurrent-edit reconciliation during authoring. Git history becomes durable only after the user requests commits.
