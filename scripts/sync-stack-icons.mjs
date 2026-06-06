import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const slugs = [
  'java',
  'springboot',
  'temporal',
  'angular',
  'typescript',
  'javascript',
  'reactivex',
  'tailwindcss',
  'html5',
  'css3',
  'postgresql',
  'mysql',
  'mongodb',
  'docker',
  'junit',
  'swagger',
  'flyway',
  'openai',
  'googlegemini',
  'grok',
  'cursor',
];

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'icons', 'stacks');

await mkdir(outDir, { recursive: true });

const cdnSlugByFile = {
  css3: 'css',
};

const customSources = {
  java: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
  junit: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/junit/junit-plain.svg',
  openai: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/openai.svg',
  grok: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/x.svg',
};

for (const slug of slugs) {
  const customUrl = customSources[slug];
  const url = customUrl ?? `https://cdn.simpleicons.org/${cdnSlugByFile[slug] ?? slug}`;
  const response = await fetch(url);

  if (!response.ok) {
    console.warn(`Failed to fetch ${slug}: ${response.status}`);
    continue;
  }

  const svg = await response.text();
  await writeFile(join(outDir, `${slug}.svg`), svg, 'utf8');
  console.log(`Saved ${slug}.svg`);
}
