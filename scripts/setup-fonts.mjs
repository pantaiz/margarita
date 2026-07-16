import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, renameSync, unlinkSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const root = process.cwd();
const outDir = join(root, 'public', 'fonts');
const downloads = join(homedir(), 'Downloads');

const sources = {
  benzin: process.env.BENZIN_ZIP ?? join(downloads, 'font.zip'),
  zeequada: process.env.ZEEQUADA_ZIP ?? join(downloads, 'Zeequada.zip'),
  gilroy: process.env.GILROY_ZIP ?? join(downloads, 'Gilroy.zip'),
};

const extractions = [
  {
    zip: sources.benzin,
    entry: 'Benzin-Medium.woff2',
    dest: join(outDir, 'benzin-medium.woff2'),
  },
  {
    zip: sources.zeequada,
    entry: 'Zeequada-Regular.otf',
    dest: join(outDir, 'zeequada-regular.otf'),
  },
  {
    zip: sources.gilroy,
    entry: 'Gilroy-Regular_0.ttf',
    dest: join(outDir, 'gilroy-regular.ttf'),
  },
  {
    zip: sources.gilroy,
    entry: 'Gilroy-Medium_0.ttf',
    dest: join(outDir, 'gilroy-medium.ttf'),
  },
];

function extractFromZip(zipPath, entry, dest) {
  if (!existsSync(zipPath)) {
    throw new Error(`Missing archive: ${zipPath}`);
  }

  const tmpDir = join(outDir, '.tmp');
  mkdirSync(tmpDir, { recursive: true });

  execSync(`unzip -jo ${JSON.stringify(zipPath)} ${JSON.stringify(entry)} -d ${JSON.stringify(tmpDir)}`, {
    stdio: 'inherit',
  });

  const extracted = join(tmpDir, entry);
  if (!existsSync(extracted)) {
    throw new Error(`Entry not found in ${zipPath}: ${entry}`);
  }

  if (existsSync(dest)) unlinkSync(dest);
  renameSync(extracted, dest);

  try {
    execSync(`rmdir ${JSON.stringify(tmpDir)}`);
  } catch {
    // ignore non-empty tmp dir
  }
}

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

for (const { zip, entry, dest } of extractions) {
  extractFromZip(zip, entry, dest);
  console.log(`Installed ${dest}`);
}

// Remove legacy fallback files from older setup.
for (const legacy of ['gilroy-regular.woff', 'gilroy-medium.woff', 'zeequada-regular.woff2']) {
  const path = join(outDir, legacy);
  if (existsSync(path)) {
    unlinkSync(path);
    console.log(`Removed legacy ${path}`);
  }
}

console.log('Fonts installed: Benzin, Zeequada, Gilroy.');
