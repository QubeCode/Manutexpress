/**
 * Extract brand assets with precise coordinates (source: 1536×1024).
 * Run: node scripts/extract-brand-assets.mjs
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "public/brand/manutexpress-assets.png");
const outDir = path.join(root, "public/brand");

const crops = {
  "logo-full.png": { left: 8, top: 8, width: 560, height: 188 },
  "logo-icon-wordmark.png": { left: 112, top: 66, width: 496, height: 192 },
  "hero-worker-raw.png": { left: 1085, top: 255, width: 410, height: 560 },
};

for (const [filename, region] of Object.entries(crops)) {
  await sharp(source)
    .extract(region)
    .png()
    .toFile(path.join(outDir, filename));
  console.log(`✓ ${filename}`);
}

const heroRaw = path.join(outDir, "hero-worker-raw.png");
const heroOut = path.join(outDir, "hero-worker.png");

const { data, info } = await sharp(heroRaw)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r < 30 && g < 30 && b < 30) {
    data[i + 3] = 0;
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(heroOut);

console.log("✓ hero-worker.png (transparent bg)");
console.log("Done! Service photos use BrandPhoto CSS regions in src/lib/brand.ts");
