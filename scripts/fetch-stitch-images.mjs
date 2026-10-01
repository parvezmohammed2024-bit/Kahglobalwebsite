#!/usr/bin/env node
/**
 * Downloads the Google Stitch mock-up images listed in scripts/stitch-images.json
 * and saves them over the [PLACEHOLDER] files in public/images/.
 *
 *   node scripts/fetch-stitch-images.mjs          # skip files that are already real photos
 *   node scripts/fetch-stitch-images.mjs --force  # re-download everything
 *
 * These are AI-generated stand-ins from the design mock. Replace them with
 * real Kah Global product / factory photos (same path + filename) when ready.
 */
import { readFile, writeFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(path.join(root, 'scripts/stitch-images.json'), 'utf8'));
const force = process.argv.includes('--force');

// Generated placeholders are tiny (< 40 KB); real photos are larger.
const PLACEHOLDER_MAX_BYTES = 40_000;

let ok = 0;
let skipped = 0;
let failed = 0;

for (const [target, { src }] of Object.entries(manifest)) {
  const file = path.join(root, target);
  if (!force) {
    const info = await stat(file).catch(() => null);
    if (info && info.size > PLACEHOLDER_MAX_BYTES) {
      skipped++;
      continue;
    }
  }
  try {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(file, Buffer.from(await res.arrayBuffer()));
    console.log(`✓ ${target}`);
    ok++;
  } catch (err) {
    console.error(`✗ ${target} — ${err.message}`);
    failed++;
  }
}

console.log(`\nDone: ${ok} downloaded, ${skipped} skipped, ${failed} failed.`);
if (failed) process.exitCode = 1;
