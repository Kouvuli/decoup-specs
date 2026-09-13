# Contributing

## Local setup

Use Node 24 (see `.nvmrc`) and npm; run `npm ci`.
Enable the versioned native Git hooks once in every clone:

```sh
git config --local core.hooksPath .githooks
sh scripts/test-hooks.sh
```

Use a POSIX shell (Git Bash on Windows). No hook framework is required.
The pre-commit hook checks staged whitespace/conflict markers and runs
`npm run check` against the working tree. Review `git diff --cached` before committing;
partially staged changes are validated with your unstaged work present. CI checks
the clean checkout. Hooks never auto-stage or rewrite files.

## GitHub Flow

1. Keep `main` releasable. Start a short-lived branch from up-to-date `main`,
   e.g. `feat/booking-availability` or `fix/empty-request`.
2. Make focused commits and open a draft pull request early. Link the issue/spec
   and include validation evidence. Use separate linked PRs for cross-repo work.
3. Resolve review comments and pass CI. Squash merge, then delete the branch.
   No permanent `develop` branch is needed.

Commit subjects and PR titles use Conventional Commits:
`type(scope): description`. Scope is optional; `!` marks a breaking change.
Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
`build`, `ci`, `chore`, `revert`. Examples:

```text
feat(booking): add availability lookup
fix(api)!: reject the old request shape
docs: clarify local setup
```

The commit-msg hook enforces local subjects; CI enforces PR titles because the
PR title should become the squash commit subject. Local WIP history need not
be preserved on `main`.

## GitHub repository settings (after creating the remote)

- Default branch: `main`; enable squash merging only, with PR title as the
  default squash commit message. Automatically delete merged branches.
- Protect `main` with a ruleset requiring a pull request, resolved conversations,
  and the `check` status from this CI workflow after its first run. Block force
  pushes and deletion. Require branches to be current before merging.
- Require one approval when another maintainer is available; avoid an impossible
  self-approval requirement for a solo repository.
- Enable Dependabot alerts and available secret scanning/push protection.
  The checked-in Dependabot config updates pinned GitHub Actions weekly.

These hosted settings are not activated by files in this checkout. Ruleset
availability depends on repository visibility and the GitHub plan.

CI runs on PRs and pushes to `main` with read-only repository permission and
no deployment credentials. Add deployment automation when a deployment target
and release policy exist. Never commit real `.env` files, credentials, or
scratch drafts. Dependency lockfiles and the Maven wrapper belong in Git.

Specs CI validates and builds this checkout independently. Missing sibling
repositories appear as unavailable in the generated skills inventory; CI does
not fetch private sibling repositories. The reader remains local-only.

CI lints `app`, `lib`, `scripts`, `vite.config.ts` and `next.config.ts`.
The full `npm run lint` currently reports 19 pre-existing errors in scaffold
`components/ui` and `hooks/use-mobile.ts`; clean those up before expanding the
lint gate. TypeScript checking and the build still cover the whole reader.

References: [GitHub branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) and [squash merge settings](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/configuring-commit-squashing-for-pull-requests).
