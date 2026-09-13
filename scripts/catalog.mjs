import {
  mkdir,
  readdir,
  readFile,
  writeFile,
  rename,
  rm,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { readSkills } from './skills-catalog.mjs';

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const scopes = { backend: 'BE', frontend: 'FE', mobile: 'MB', shared: 'SH' };
const surfaces = {
  backend: ['backend'],
  frontend: ['web-app', 'marketing'],
  mobile: ['mobile'],
  shared: ['shared'],
};
const guides = [
  'docs/shared-brand-native-ui.md',
  'docs/workflow.md',
  'docs/format-choice.md',
  'docs/authoring.md',
  'docs/trello.md',
];
const requiredSections = [
  'Problem',
  'Scope',
  'User Stories',
  'Decisions and Contracts',
  'High-Level Design',
  'Low-Level Design',
  'Acceptance Criteria',
  'Testing',
  'Dependencies',
  'Out of Scope',
  'Open Questions',
  'Revision History',
];
const epicRequiredSections = [
  'Outcome',
  'Scope',
  'Features',
  'Success Measures',
  'Out of Scope',
  'Open Questions',
  'Revision History',
];

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const found = [];
  for (const entry of entries.sort((left, right) =>
    left.name.localeCompare(right.name),
  )) {
    if (entry.isSymbolicLink())
      throw new Error(`Symlinks are not allowed in specs: ${entry.name}`);
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...(await markdownFiles(filename)));
    else if (entry.isFile() && entry.name.endsWith('.md')) found.push(filename);
  }
  return found;
}

function parseDocument(source, relativePath, kind) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const fail = (message) => {
    throw new Error(`${relativePath}: ${message}`);
  };
  if (!match) fail('YAML front matter is required');
  const metadata = parse(match[1]);
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata))
    fail('metadata must be a mapping');
  for (const field of [
    'id',
    'title',
    'scope',
    'status',
    'summary',
    'updated',
  ]) {
    if (typeof metadata[field] !== 'string' || !metadata[field].trim())
      fail(`${field} must be a nonempty string`);
  }
  if (!Number.isSafeInteger(metadata.revision) || metadata.revision < 1)
    fail('revision must be a positive integer');
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(metadata.updated) ||
    Number.isNaN(Date.parse(metadata.updated)) ||
    new Date(metadata.updated).toISOString().slice(0, 10) !== metadata.updated
  )
    fail('updated must be a quoted ISO date');
  const related = metadata.related ?? [];
  if (
    !Array.isArray(related) ||
    related.some((identifier) => typeof identifier !== 'string') ||
    new Set(related).size !== related.length
  )
    fail('related must contain unique spec IDs');
  if (kind === 'spec') {
    if (!Object.hasOwn(scopes, metadata.scope)) fail('unknown scope');
    if (
      !new RegExp(
        `^DU-${scopes[metadata.scope]}-[a-z0-9]+(?:-[a-z0-9]+)*$`,
      ).test(metadata.id)
    )
      fail('ID must match scope and use a lowercase slug');
    if (relativePath !== `specs/${metadata.scope}/${metadata.id}.md`)
      fail('filename and directory must match ID and scope');
    if (!surfaces[metadata.scope].includes(metadata.surface))
      fail('surface does not match scope');
    if (!['draft', 'approved', 'superseded'].includes(metadata.status))
      fail('unknown spec status');
    if (
      typeof metadata.epic !== 'string' ||
      !/^DU-EP-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.epic)
    )
      fail('epic must be a DU-EP slug');
    if (
      metadata.status === 'approved' &&
      (metadata.approved_revision !== metadata.revision ||
        typeof metadata.approval_evidence !== 'string' ||
        !metadata.approval_evidence.trim())
    )
      fail('approved specs need current revision approval and evidence');
    if (
      metadata.status === 'draft' &&
      (metadata.approved_revision !== null ||
        metadata.approval_evidence !== null)
    )
      fail('draft approval fields must be null');
    for (const section of requiredSections) {
      if (!sectionContent(match[2], section))
        fail(`missing section: ${section}`);
    }
    if (metadata.status !== 'superseded') {
      const stories = userStoryIds(match[2]);
      if (!stories.length) fail('at least one US-XX heading is required');
      if (new Set(stories).size !== stories.length)
        fail('User Story IDs must be unique');
      const criteria = sectionContent(match[2], 'Acceptance Criteria')
        .split(/\r?\n/)
        .filter((line) => /^- AC-\d+/.test(line));
      if (!criteria.length)
        fail('at least one Acceptance Criterion is required');
      const criterionIds = [];
      for (const criterion of criteria) {
        const mapping = criterion.match(/^- (AC-\d{2,}) \((US-\d{2,})\): /);
        if (!mapping) fail(`criterion must map to a User Story: ${criterion}`);
        if (!stories.includes(mapping[2]))
          fail(`${mapping[1]} references unknown Story ${mapping[2]}`);
        criterionIds.push(mapping[1]);
      }
      if (new Set(criterionIds).size !== criterionIds.length)
        fail('Acceptance Criterion IDs must be unique');
    }
  } else if (kind === 'epic') {
    if (!/^DU-EP-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.id))
      fail('Epic ID must use DU-EP and a lowercase slug');
    if (relativePath !== `epics/${metadata.id}.md`)
      fail('Epic filename must match its ID');
    if (metadata.scope !== 'shared') fail('Epic scope must be shared');
    if (!['draft', 'approved', 'superseded'].includes(metadata.status))
      fail('unknown Epic status');
    if (
      metadata.status === 'approved' &&
      (metadata.approved_revision !== metadata.revision ||
        typeof metadata.approval_evidence !== 'string' ||
        !metadata.approval_evidence.trim())
    )
      fail('approved Epics need current revision approval and evidence');
    if (
      metadata.status === 'draft' &&
      (metadata.approved_revision !== null ||
        metadata.approval_evidence !== null)
    )
      fail('draft Epic approval fields must be null');
    if (
      !Array.isArray(metadata.features) ||
      metadata.features.some((identifier) => typeof identifier !== 'string') ||
      new Set(metadata.features).size !== metadata.features.length
    )
      fail('features must contain unique Feature IDs');
    for (const section of epicRequiredSections) {
      if (!sectionContent(match[2], section))
        fail(`missing section: ${section}`);
    }
  } else if (
    !/^GUIDE-[A-Z-]+$/.test(metadata.id) ||
    metadata.status !== 'reference' ||
    metadata.scope !== 'shared'
  )
    fail('invalid guide metadata');
  return {
    id: metadata.id,
    title: metadata.title,
    scope: metadata.scope,
    status: metadata.status,
    revision: metadata.revision,
    updated: metadata.updated,
    surface: metadata.surface || 'shared',
    summary: metadata.summary,
    related,
    epic: metadata.epic || null,
    features: metadata.features || [],
    stories: kind === 'spec' ? userStoryIds(match[2]) : [],
    kind,
    path: relativePath,
    content: match[2],
    source,
    designs: {
      hld: sectionContent(match[2], 'High-Level Design'),
      lld: sectionContent(match[2], 'Low-Level Design'),
      data: sectionContent(match[2], 'Data Modelling'),
    },
  };
}

function userStoryIds(content) {
  return [...content.matchAll(/^### (US-\d{2,})\b/gm)].map((match) => match[1]);
}

export function sectionContent(content, heading) {
  const lines = [];
  let active = false;
  let fence = null;
  for (const line of content.split(/\r?\n/)) {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (!fence && /^##? /.test(line)) {
      if (active) break;
      active = line === `## ${heading}`;
      continue;
    }
    if (active) lines.push(line);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (
        marker[1][0] === fence[0] &&
        marker[1].length >= fence.length &&
        line.trim() === marker[1]
      )
        fence = null;
    }
  }
  return lines.join('\n').trim();
}

export async function buildCatalog(root = projectRoot) {
  const sources = [
    ...guides.map((relativePath) => ({ relativePath, kind: 'guide' })),
    ...(await markdownFiles(path.join(root, 'epics'))).map((filename) => ({
      relativePath: path.relative(root, filename).split(path.sep).join('/'),
      kind: 'epic',
    })),
    ...(await markdownFiles(path.join(root, 'specs'))).map((filename) => ({
      relativePath: path.relative(root, filename).split(path.sep).join('/'),
      kind: 'spec',
    })),
  ];
  const documents = [];
  for (const { relativePath, kind } of sources)
    documents.push(
      parseDocument(
        await readFile(path.join(root, relativePath), 'utf8'),
        relativePath,
        kind,
      ),
    );
  if (
    new Set(documents.map((document) => document.id)).size !== documents.length
  )
    throw new Error('Duplicate document IDs');
  const specIds = new Set(
    documents
      .filter((document) => document.kind === 'spec')
      .map((document) => document.id),
  );
  const epicIds = new Set(
    documents
      .filter((document) => document.kind === 'epic')
      .map((document) => document.id),
  );
  for (const document of documents) {
    for (const identifier of document.related)
      if (identifier === document.id || !specIds.has(identifier))
        throw new Error(
          `${document.path}: unknown/self related spec ${identifier}`,
        );
  }
  for (const feature of documents.filter(
    (document) => document.kind === 'spec',
  )) {
    if (!epicIds.has(feature.epic))
      throw new Error(`${feature.path}: unknown Epic ${feature.epic}`);
    const epic = documents.find((document) => document.id === feature.epic);
    if (feature.status !== 'superseded' && !epic.features.includes(feature.id))
      throw new Error(
        `${feature.path}: parent Epic does not list this Feature`,
      );
  }
  for (const epic of documents.filter((document) => document.kind === 'epic')) {
    for (const featureId of epic.features) {
      if (!specIds.has(featureId))
        throw new Error(`${epic.path}: unknown Feature ${featureId}`);
      const feature = documents.find((document) => document.id === featureId);
      if (feature.epic !== epic.id)
        throw new Error(
          `${epic.path}: Feature ${featureId} names another Epic`,
        );
    }
  }
  const repositories = await readSkills(root);
  await mkdir(path.join(root, 'lib'), { recursive: true });
  const staging = path.join(root, 'public', '.sources-next');
  await rm(staging, { recursive: true, force: true });
  for (const document of [
    ...documents,
    ...repositories.flatMap((repository) => repository.skills),
  ]) {
    const destination = path.join(staging, document.path);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, document.source);
  }
  await rm(path.join(root, 'public', 'sources'), {
    recursive: true,
    force: true,
  });
  await rename(staging, path.join(root, 'public', 'sources'));
  await writeFile(
    path.join(root, 'public', 'llms.txt'),
    '# DecoUp specification library\n\n> Local generated index. Markdown is authoritative; drafts are not approved requirements.\n\n' +
      documents
        .map(
          (document) =>
            `- [${document.id}: ${document.title}](/sources/${document.path}): ${document.status}, revision ${document.revision}`,
        )
        .join('\n') +
      '\n',
  );
  const destination = path.join(root, 'lib', 'catalog.generated.json');
  const inventory = repositories.map((repository) => ({
    ...repository,
    skills: repository.skills.map(
      ({ source: _source, ...metadata }) => metadata,
    ),
  }));
  await writeFile(
    destination + '.tmp',
    JSON.stringify({ documents, repositories: inventory }, null, 2) + '\n',
  );
  await rename(destination + '.tmp', destination);
  return documents;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const documents = await buildCatalog();
    console.log(
      `Catalog valid: ${documents.filter((document) => document.kind === 'epic').length} Epics, ${documents.filter((document) => document.kind === 'spec').length} Features, ${documents.filter((document) => document.kind === 'guide').length} guides.`,
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
