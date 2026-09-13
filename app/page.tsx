'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BookOpen, FileText, ArrowUpRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import catalog from '@/lib/catalog.generated.json';

const { documents } = catalog;
// Keep the reader type stable when sibling checkouts contain no skills.
const repositories: {
  name: string;
  short: string;
  available: boolean;
  skills: {
    name: string;
    description: string;
    invocation: string;
    origin: string;
    path: string;
    editPath: string;
  }[];
}[] = catalog.repositories;
const specifications = documents.filter((document) => document.kind === 'spec');
const currentSpecifications = specifications.filter(
  (document) => document.status !== 'superseded',
);
const epics = documents.filter((document) => document.kind === 'epic');
const groups = [
  { key: 'epic', label: 'Epics' },
  { key: 'guide', label: 'Workspace guides' },
  { key: 'shared', label: 'Shared contracts' },
  { key: 'backend', label: 'Backend' },
  { key: 'frontend', label: 'Web & landing' },
  { key: 'mobile', label: 'Mobile' },
];
type Document = (typeof documents)[number];
type Repository = (typeof repositories)[number];

function Markdown({
  content,
  sourcePath,
}: {
  content: string;
  sourcePath?: string;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      skipHtml
      components={{
        h1: ({ children }) => <h2>{children}</h2>,
        a: ({ href, children }) => {
          let destination = href;
          if (href && !/^(https?:|mailto:|#)/i.test(href)) {
            const resolved = new URL(
              href,
              'https://local.invalid/' + (sourcePath || ''),
            );
            const target = documents.find(
              (document) => '/' + document.path === resolved.pathname,
            );
            destination =
              resolved.origin === 'https://local.invalid' && target
                ? '?tab=delivery&doc=' + encodeURIComponent(target.id)
                : undefined;
          }
          return destination ? (
            <a href={destination}>{children}</a>
          ) : (
            <span>{children}</span>
          );
        },
        img: ({ alt }) => (
          <span>[Image: {alt || 'not loaded in the local reader'}]</span>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function DocumentReader({ document }: { document: Document }) {
  return (
    <>
      <div className="document-heading">
        <div>
          <p className="eyebrow">
            {document.kind === 'guide'
              ? 'WORKSPACE GUIDE'
              : document.kind === 'epic'
                ? 'DELIVERY EPIC'
                : document.scope.toUpperCase() + ' FEATURE SPEC'}
          </p>
          <h1>{document.title}</h1>
          <p className="summary">{document.summary}</p>
          <div className="metadata">
            <span className="badge">{document.status}</span>
            <span>Revision {document.revision}</span>
            <span>{document.updated}</span>
          </div>
        </div>
        <a
          className="source-link"
          href={'/sources/' + document.path}
          target="_blank"
          rel="noreferrer"
        >
          Read Markdown <ArrowUpRight size={16} />
        </a>
      </div>
      {document.kind === 'guide' || document.kind === 'epic' ? (
        <article className="document">
          <Markdown content={document.content} sourcePath={document.path} />
        </article>
      ) : (
        <Tabs defaultValue="spec" className="design-tabs">
          <TabsList aria-label="Feature documents">
            <TabsTrigger value="spec">Specification</TabsTrigger>
            <TabsTrigger value="hld">High-level design</TabsTrigger>
            <TabsTrigger value="lld">Low-level design</TabsTrigger>
            <TabsTrigger value="data">Data modelling</TabsTrigger>
          </TabsList>
          <TabsContent value="spec">
            <article className="document">
              <Markdown content={document.content} sourcePath={document.path} />
            </article>
          </TabsContent>
          {(['hld', 'lld', 'data'] as const).map((part) => (
            <TabsContent key={part} value={part}>
              <article className="document">
                {document.designs[part] ? (
                  <Markdown
                    content={document.designs[part]}
                    sourcePath={document.path}
                  />
                ) : (
                  <p>
                    {part === 'data'
                      ? 'No data modelling documented. This section is optional when the feature has no data-model impact.'
                      : 'Not yet documented. Record the agreed design in the canonical spec.'}
                  </p>
                )}
              </article>
            </TabsContent>
          ))}
        </Tabs>
      )}
      <footer className="document-footer">
        <FileText size={16} />
        <code>{document.path}</code>
        <span>One source · one revision · edit Markdown</span>
      </footer>
    </>
  );
}

function Flow({
  title,
  steps,
  repository,
}: {
  title: string;
  steps: string[][];
  repository: Repository;
}) {
  return (
    <figure className="flow">
      <figcaption>{title}</figcaption>
      <ol className="flow-steps">
        {steps.map((stage, index) => (
          <li key={index}>
            <div className="flow-node">
              {stage.map((name) => {
                const skill = repository.skills.find(
                  (entry) =>
                    entry.name === name || name.startsWith(entry.name + ' '),
                );
                return skill ? (
                  <a key={name} href={'#' + repository.name + '-' + skill.name}>
                    {name}
                  </a>
                ) : (
                  <span key={name}>{name}</span>
                );
              })}
            </div>
            {index < steps.length - 1 && (
              <span className="flow-arrow" aria-hidden="true">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}

function Skills({
  repository,
  onOpenGuide,
}: {
  repository: Repository;
  onOpenGuide: () => void;
}) {
  const has = (name: string) =>
    repository.skills.some((skill) => skill.name === name);
  return (
    <>
      <div className="document-heading">
        <div>
          <p className="eyebrow">INSTALLED IN THIS REPOSITORY</p>
          <h1>{repository.name}</h1>
          <p className="summary">
            {repository.skills.length} skills · read from the checkout when the
            catalog refreshes.
          </p>
        </div>
      </div>
      <section className="invocation-note">
        <strong>Local does not mean manual.</strong> Manual skills require your
        explicit invocation. Automatic / direct skills can be selected for
        matching work, or invoked by you. Neither mode runs in the background or
        grants permission to publish, commit or change requirements.
      </section>
      {!repository.available ? (
        <section className="document">
          <h2>Checkout unavailable</h2>
          <p>
            Restore the sibling repository and refresh the catalog to see its
            installed skills.
          </p>
        </section>
      ) : !repository.skills.length ? (
        <section className="document">
          <h2>No repo-local skills installed</h2>
          <p>
            This repository provides the spec source and reader. Use the BE, FE
            or mobile planning skill from its owning repository. Global and
            plugin skills are not included in this inventory.
          </p>
        </section>
      ) : (
        <>
          <section className="flow-panel">
            <h2>Skill flows</h2>
            <p>
              Suggested handoffs, not automatic chains. Click a skill to find
              its instructions below.
            </p>
            {(repository.short === 'fe' || repository.short === 'mb') && (
              <p>
                <button
                  type="button"
                  className="underline"
                  onClick={onOpenGuide}
                >
                  Shared brand, native mobile UI: usage prompts and approval
                  flow
                </button>
              </p>
            )}
            {repository.short === 'mb' &&
              has('expo-overview') &&
              has('expo-native-ui') &&
              has('expo-design-system') && (
                <>
                  <Flow
                    title="Mobile UI planning · shared brand, native interpretation"
                    repository={repository}
                    steps={[
                      ['Approved shared brand revision or open decisions'],
                      ['expo-overview'],
                      ['expo-native-ui', 'expo-design-system'],
                      ['decoup-mb-to-spec'],
                      ['Review & approve revision'],
                      ['decoup-mb-to-ticket'],
                    ]}
                  />
                  <Flow
                    title="Mobile UI delivery · explicit implementation request required"
                    repository={repository}
                    steps={[
                      ['Approved ticket', 'implement', 'tdd'],
                      ['expo-overview'],
                      ['expo-native-ui', 'expo-design-system'],
                      ['code-review'],
                      ['Native device / accessibility evidence'],
                    ]}
                  />
                  <p>
                    Reuse approved brand intent, not web components or CSS.
                    expo-ui and expo-router are not installed: review missing
                    skill and runtime dependencies before work needing them.
                    Screenshots from a browser and Metro exports do not prove
                    native behavior. These flows do not implement screens or run
                    manual planning skills automatically.
                  </p>
                </>
              )}
            {has('wayfinder') && (
              <Flow
                title="Discover and clarify · manual entry points"
                repository={repository}
                steps={[
                  ['setup-matt-pocock-skills'],
                  ['ask-matt'],
                  ['wayfinder', 'grill-with-docs'],
                  ['Agreed scope'],
                ]}
              />
            )}
            <Flow
              title="Deliver · exact-revision approval before tickets"
              repository={repository}
              steps={[
                ['Agreed scope'],
                ['decoup-' + repository.short + '-to-spec'],
                ['Review & approve revision'],
                ['decoup-' + repository.short + '-to-ticket'],
                ['Review drafts → approve Trello publication'],
              ]}
            />
            {has('implement') && (
              <Flow
                title="Implement · only after an explicit implementation request"
                repository={repository}
                steps={[
                  ['implement'],
                  ['tdd', 'codebase-design'],
                  ['code-review'],
                  ['Acceptance evidence'],
                ]}
              />
            )}
            {repository.short === 'fe' &&
              has('decoup-fe-skillui') &&
              has('hallmark') &&
              has('impeccable') && (
                <>
                  <Flow
                    title="FE design discovery · optional reference study before specification"
                    repository={repository}
                    steps={[
                      ['decoup-fe-skillui', 'hallmark study'],
                      ['impeccable shape'],
                      ['decoup-fe-to-spec'],
                      ['Review & approve revision'],
                      ['decoup-fe-to-ticket'],
                    ]}
                  />
                  <Flow
                    title="FE visual delivery · choose one visual lead, review only what is needed"
                    repository={repository}
                    steps={[
                      ['Explicit implementation request', 'implement', 'tdd'],
                      ['hallmark', 'impeccable'],
                      ['hallmark audit', 'impeccable audit'],
                      ['Approved refinements', 'impeccable polish'],
                      ['code-review'],
                    ]}
                  />
                  <p>
                    SkillUI extraction and Hallmark study are alternatives, not
                    required consecutive steps. Choose Hallmark or Impeccable as
                    the visual lead. SkillUI CLI execution and Impeccable
                    engine, hooks and live tools are not activated by this
                    installation. Command variants link to their owning skill
                    below; arrows do not authorize implementation or run manual
                    planning skills.
                  </p>
                </>
              )}
            {has('research') && (
              <Flow
                title="Supporting disciplines · selected as needed, not a sequence"
                repository={repository}
                steps={[
                  ['research', 'grilling', 'domain-modeling', 'prototype'],
                ]}
              />
            )}
            {has('mono-to-microservices') && (
              <Flow
                title="Project maintenance · matching-task invocation, not background jobs"
                repository={repository}
                steps={[
                  ['mono-to-microservices', 'update-matt-pocock-skills'],
                  ['Review impact / upstream audit'],
                  ['Apply only authorized changes'],
                ]}
              />
            )}
          </section>
          <div className="skills-list">
            {repository.skills.map((skill) => (
              <article
                className="skill-card"
                key={skill.name}
                id={repository.name + '-' + skill.name}
              >
                <div className="skill-card-heading">
                  <h2>{skill.name}</h2>
                  <span className="badge">{skill.invocation}</span>
                </div>
                <p>{skill.description}</p>
                <div className="metadata">
                  <span
                    className={
                      'badge ' +
                      (skill.origin === 'Project-owned' ? 'owned' : '')
                    }
                  >
                    {skill.origin}
                  </span>
                  <code>${skill.name}</code>
                </div>
                <p className="skill-path">
                  <strong>Read / edit:</strong> <code>{skill.editPath}</code>
                </p>
                <a
                  className="source-link"
                  href={'/sources/' + skill.path}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read SKILL.md <ArrowUpRight size={16} />
                </a>
                {skill.origin !== 'Project-owned' &&
                  skill.origin !== 'Unregistered' && (
                    <p className="source-note">
                      Keep this original untouched; customize an independently
                      named project-owned copy.
                    </p>
                  )}
              </article>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default function Library() {
  const [location, setLocation] = useState({
    tab: 'delivery',
    doc: '',
    repo: 'decoup-be',
  });
  useEffect(() => {
    const update = () => {
      const query = new URLSearchParams(window.location.search);
      const repositoryAliases: Record<string, string> = {
        'decoup-frontend': 'decoup-web',
        'decoup-backend': 'decoup-be',
        'decoup-mobile': 'decoup-mb',
      };
      const requestedRepository = query.get('repo') || 'decoup-be';
      setLocation({
        tab: query.get('tab') === 'skills' ? 'skills' : 'delivery',
        doc: query.get('doc') || '',
        repo: repositoryAliases[requestedRepository] || requestedRepository,
      });
    };
    update();
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);
  function navigate(change: Partial<typeof location>) {
    const next = { ...location, ...change };
    window.history.pushState(null, '', '?' + new URLSearchParams(next));
    setLocation(next);
    window.scrollTo({ top: 0 });
  }
  const selected = documents.find((document) => document.id === location.doc);
  const repository = repositories.find(
    (candidate) => candidate.name === location.repo,
  );
  return (
    <Tabs
      value={location.tab}
      onValueChange={(tab) => navigate({ tab: String(tab) })}
    >
      <SidebarProvider className="library">
        <Sidebar>
          <SidebarHeader className="brand">
            <div className="brand-mark">D</div>
            <div>
              <strong>DecoUp</strong>
              <span>Delivery & skills</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            {location.tab === 'skills' ? (
              <SidebarGroup>
                <SidebarGroupLabel>Repositories</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {repositories.map((entry) => (
                      <SidebarMenuItem key={entry.name}>
                        <SidebarMenuButton
                          className="document-link"
                          isActive={location.repo === entry.name}
                          onClick={() => navigate({ repo: entry.name })}
                        >
                          <BookOpen />
                          <span>
                            {entry.name} ·{' '}
                            {entry.available
                              ? entry.skills.length
                              : 'unavailable'}
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ) : (
              <>
                <SidebarGroup>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className="document-link"
                        isActive={!location.doc}
                        onClick={() => navigate({ doc: '' })}
                      >
                        <FileText />
                        {epics.length} Epics · {currentSpecifications.length}{' '}
                        current Features
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
                {groups.map((group) => {
                  const entries = documents.filter((document) =>
                    group.key === 'guide'
                      ? document.kind === 'guide'
                      : group.key === 'epic'
                        ? document.kind === 'epic'
                        : document.kind === 'spec' &&
                          document.scope === group.key,
                  );
                  return (
                    <SidebarGroup key={group.key}>
                      <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {entries.map((document) => (
                            <SidebarMenuItem key={document.id}>
                              <SidebarMenuButton
                                isActive={location.doc === document.id}
                                onClick={() => navigate({ doc: document.id })}
                                className="document-link"
                              >
                                {document.kind === 'guide' ? (
                                  <BookOpen />
                                ) : (
                                  <FileText />
                                )}
                                <span>{document.title}</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                          {!entries.length && (
                            <li className="empty-group">
                              No specifications yet
                            </li>
                          )}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  );
                })}
              </>
            )}
          </SidebarContent>
          <SidebarFooter className="sidebar-note">
            <span className="local-dot" />
            Local workspace · read-only
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="reading-pane">
          <header className="topbar">
            <div>
              <SidebarTrigger />
              <TabsList aria-label="Workspace sections" variant="line">
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>
            </div>
            <span className="badge">Markdown source</span>
          </header>
          <main id="main-content">
            <TabsContent value="delivery">
              {location.doc ? (
                selected ? (
                  <DocumentReader key={selected.id} document={selected} />
                ) : (
                  <section className="document">
                    <h1>Document not found</h1>
                    <p>Choose an existing feature or guide from the sidebar.</p>
                  </section>
                )
              ) : (
                <>
                  <div className="document-heading">
                    <div>
                      <p className="eyebrow">
                        EPICS AND FEATURE SPECIFICATIONS
                      </p>
                      <h1>Delivery</h1>
                      <p className="summary">
                        Business outcomes grouped into bounded Features with
                        stable Stories, acceptance criteria and designs.
                      </p>
                    </div>
                  </div>
                  {!epics.length ? (
                    <section className="document">
                      <h2>No delivery Epics yet</h2>
                      <p>
                        Create an Epic and its first agreed Feature with your
                        repository’s to-spec skill.
                      </p>
                      <p>
                        Each feature will appear here with its scope, approval
                        status and design sections. Shared behavior and
                        owner-specific specs remain linked through their
                        existing spec IDs.
                      </p>
                    </section>
                  ) : (
                    <div className="feature-list">
                      {epics.map((epic) => (
                        <article className="feature-card" key={epic.id}>
                          <div className="metadata">
                            <span>Epic</span>
                            <span className="badge">{epic.status}</span>
                          </div>
                          <h2>
                            <a
                              href={
                                '?tab=delivery&doc=' +
                                encodeURIComponent(epic.id)
                              }
                            >
                              {epic.title}
                            </a>
                          </h2>
                          <p>{epic.summary}</p>
                          <p className="eyebrow">FEATURES</p>
                          <ul>
                            {epic.features.map((featureId) => {
                              const feature = specifications.find(
                                (document) => document.id === featureId,
                              );
                              return feature ? (
                                <li key={feature.id}>
                                  <a
                                    href={
                                      '?tab=delivery&doc=' +
                                      encodeURIComponent(feature.id)
                                    }
                                  >
                                    {feature.title}
                                  </a>{' '}
                                  · {feature.stories.length} Stories ·{' '}
                                  {feature.status}
                                </li>
                              ) : null;
                            })}
                          </ul>
                        </article>
                      ))}
                    </div>
                  )}
                </>
              )}
            </TabsContent>
            <TabsContent value="skills">
              {repository ? (
                <Skills
                  repository={repository}
                  onOpenGuide={() =>
                    navigate({ tab: 'delivery', doc: 'GUIDE-BRAND-NATIVE-UI' })
                  }
                />
              ) : (
                <section className="document">
                  <h1>Repository not found</h1>
                  <p>Choose an available repository from the sidebar.</p>
                </section>
              )}
            </TabsContent>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </Tabs>
  );
}
