// Reassembles public/cv.pdf from its base64 parts at build time.
// (The PDF is committed split because single-file uploads have a size cap.)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'cv.pdf');

if (existsSync(out)) {
  console.log('[assemble-cv] cv.pdf already exists, skipping.');
  process.exit(0);
}

const parts = ['public/cv.pdf.b64.part1', 'public/cv.pdf.b64.part2'];
const b64 = parts.map((p) => readFileSync(join(root, p), 'utf8')).join('');
writeFileSync(out, Buffer.from(b64, 'base64'));
console.log('[assemble-cv] cv.pdf reassembled.');
