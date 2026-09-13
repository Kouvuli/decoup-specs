import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';

export async function readSkills(root) {
  const repositories = [];
  for (const [name, short] of [
    ['decoup-be', 'be'],
    ['decoup-web', 'fe'],
    ['decoup-mb', 'mb'],
    ['decoup-specs', 'specs'],
  ]) {
    const directory =
      name === 'decoup-specs' ? root : path.resolve(root, '..', name);
    const repository = { name, short, available: true, skills: [] };
    try {
      await readdir(directory);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      repositories.push({ ...repository, available: false });
      continue;
    }
    const origins = new Map();
    for (const [filename, origin] of [
      ['local-skills.json', 'Project-owned'],
      ['skills-source.json', 'Matt Pocock'],
      ['external-skills-source.json', 'External provider'],
    ]) {
      try {
        const registry = JSON.parse(
          await readFile(path.join(directory, 'docs/agents', filename), 'utf8'),
        );
        for (const skill of registry.skills)
          origins.set(skill.name, skill.provider || origin);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }
    let entries = [];
    try {
      entries = await readdir(path.join(directory, '.agents/skills'), {
        withFileTypes: true,
      });
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    for (const entry of entries.sort((left, right) =>
      left.name.localeCompare(right.name),
    )) {
      if (!entry.isDirectory()) continue;
      const relativePath = `.agents/skills/${entry.name}/SKILL.md`;
      let source;
      try {
        source = await readFile(path.join(directory, relativePath), 'utf8');
      } catch (error) {
        if (error.code === 'ENOENT') continue;
        throw error;
      }
      const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
      if (!match)
        throw new Error(`${name}/${relativePath}: missing skill metadata`);
      const metadata = parse(match[1]);
      if (
        metadata.name !== entry.name ||
        typeof metadata.description !== 'string'
      )
        throw new Error(
          `${name}/${relativePath}: invalid skill identity/description`,
        );
      let policy;
      try {
        policy = parse(
          await readFile(
            path.join(
              directory,
              '.agents/skills',
              entry.name,
              'agents/openai.yaml',
            ),
            'utf8',
          ),
        )?.policy;
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
      repository.skills.push({
        name: metadata.name,
        description: metadata.description,
        invocation:
          policy?.allow_implicit_invocation === false
            ? 'Manual'
            : 'Automatic / direct',
        origin: origins.get(metadata.name) || 'Unregistered',
        path: `repos/${name}/${relativePath}`,
        editPath: `${name}/${relativePath}`,
        source,
      });
    }
    repositories.push(repository);
  }
  return repositories;
}
