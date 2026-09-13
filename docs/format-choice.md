---
id: GUIDE-FORMATS
title: "Markdown for authors, HTML for readers"
scope: shared
status: reference
summary: "Why Markdown is canonical and HTML is a generated reading view."
revision: 1
updated: "2026-09-06"
---

# One source. Two ways to read it.

**Decision: use Markdown as the canonical specification and generate the HTML reading view from it.** This is a practical choice for DecoUp, not a claim that every AI always performs better on Markdown.

| Concern | Markdown source | Hand-authored HTML source |
| --- | --- | --- |
| AI consumption | Compact headings, lists and code blocks; little presentation noise | Semantic HTML is readable too; wrappers/styles/scripts can add irrelevant content |
| Human editing | Requirements remain visible in plain text | Markup can obscure small wording changes |
| Git review | Usually concise, meaningful text diffs | Template/layout changes can mix with requirement changes |
| Validation | Structured front matter plus explicit sections | Structured markup works, but needs a separate metadata convention |
| Human navigation | Plain text alone is limited | Search, filters, links and visual hierarchy are convenient |
| Consistency | One spec source rendered into several views | Maintaining HTML and Markdown separately risks divergence |

Actual token counts and retrieval quality depend on the content, model, parser and context window. Clean semantic HTML can be more useful than badly structured Markdown. No model benchmark or fixed token-saving percentage is claimed.

## DecoUp's implementation

- Authors and agents edit Markdown with validated metadata.
- The viewer renders the same content into HTML, with raw-source access.
- Specifications have stable IDs, explicit revision/approval state and links to related scopes.
- Agents read raw source plus needed linked specs, not the entire rendered site.
- Trello cards summarize approved work and reference a specific spec revision. Cards are not a second specification authority.
- Keep diagrams accompanied by text; no requirements should exist only in an image.
- Markdown files remain untrusted content when they contain third-party text. Raw HTML is not executed by the reader.

CommonMark defines a plain-text Markdown syntax and its HTML rendering semantics; this supports a single-source approach. [CommonMark specification](https://spec.commonmark.org/)

GitHub also renders Markdown with heading navigation and relative links, so the repo remains readable without running this viewer if a real remote is added later. [GitHub README documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)
