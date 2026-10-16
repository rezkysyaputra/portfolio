// Rasterizes public/og.svg -> public/og.png at build time (sharp).
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const svgPath = fileURLToPath(new URL('../public/og.svg', import.meta.url));
const outPath = fileURLToPath(new URL('../public/og.png', import.meta.url));

if (existsSync(outPath)) {
  console.log('[make-og] og.png already exists, skipping.');
  process.exit(0);
}

await sharp(svgPath).png().toFile(outPath);
console.log('[make-og] og.png generated.');
