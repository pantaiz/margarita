import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ASSETS = {
  'background.png': '7e52b055-f170-4755-9fde-be7fa9f9e857',
  'card-bg.png': '1201b55b-8822-411c-9ff3-9e69166404d7',
  'paperclip.png': 'b53070a8-a4ed-4262-944b-ffdf812e1080',
  'photo.png': '80c44e3d-4568-4f50-b3d4-6eac4684bd2f',
  'arrow.png': '157f0b9c-1895-40da-9f65-e5b1b4538ee8',
  'underline.png': 'b2a9cc0c-b022-42f7-9667-ad69754f1954',
  'sun.png': '1baf360e-b6e2-4473-9bdc-b89bc2bd992a',
  'cloud1.png': '1eccdc48-1afe-4dc3-9cf8-f27b40cf690c',
  'cloud2.png': '2a48bf21-1582-4959-ab71-e5648987801d',
  'cloud3.png': 'fbd3dd72-1705-4a95-8902-c7f494fd53d8',
  'flower-red.png': 'bf03a5fd-cd90-4379-bd02-0eea27dd6b68',
  'flower-pink.png': '891bcf7b-401d-47d9-b495-f42d465ef91f',
  'star1.png': '7cfb6d43-0418-44f7-9cd5-7eb267f13746',
  'star2.png': '329e0f99-2ec7-41c4-958b-15f6df8f06b1',
  'star3.png': '7ff3d233-4db5-4cab-b095-aa19e58fb9fd',
  'sticker-bg.png': '47ba6129-a234-4e47-87fd-7a8e0337037c',
  'sticker-texture.png': 'c65fde07-a692-4061-a716-987c1bc5a641',
  'tape.png': 'c56394a8-c649-4738-a009-262f07bbd729',
  'color-blue.png': 'a7c7125e-5742-4695-ab9c-3f21a91e003e',
  'color-red.png': 'b152d605-84bb-4413-8b81-8d04878b3b92',
  'color-yellow.png': 'd5532928-2edc-43aa-8922-d079962ab000',
  'color-pink.png': 'd92ed483-7ac3-4adb-b011-43da22017e7b',
  'color-green.png': '8fa6a12b-d56c-4ee8-9a2e-e52291465d25',
  'eraser.png': '479a51c5-3b32-4224-a67d-b878a88e4f55',
  'trash-body.png': '6e62b23b-f51c-44ee-b0c0-33c35a6e9890',
  'trash-lid.png': '8b4706e1-2a97-419d-b0b4-57435bb6ad5e',
  'icon-linkedin.png': '862678e2-f04c-4841-995b-0299873709d1',
  'icon-telegram.png': '51dfd659-8416-4407-98d8-a7b6d95184a7',
  'icon-mail.png': '29cdd9ba-3b45-47a9-8348-e8f30294c160',
  'palitra.png': '787196ea-498c-45ae-84e0-ac82b9e25a8c',
  'palitra-overlay.png': 'f73bc906-8c35-486c-8a5c-f75bb753f559',
  'palette-check.png': '41b59d54-0cdd-435b-8154-25d4d7ed6c5a',
  'arrow-ux.png': 'f39f5503-c67f-4093-98fd-ea0e85fd51a1',
  'arrow-ui.png': 'f07f8a1f-bbc1-42bc-8840-67286b028e6a',
  'arrow-pm.png': 'bd4cf1f2-587e-4689-b5ff-1ea3eb28ba23',
  'footer-telegram.png': 'a811e3d5-f719-4b81-80f4-acdf0fbc9605',
  'footer-mail.png': '53dea418-cc71-4b21-a94c-9a9157739f93',
  'footer-linkedin.png': '2ffe5a22-26c1-447a-a54d-845c9eafa502',
};

const outDir = join(process.cwd(), 'public', 'assets');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

function resolveExtension(buffer, contentType) {
  const head = buffer.subarray(0, 64).toString('utf8');
  if (head.includes('<svg') || contentType?.includes('svg')) return '.svg';
  if (head.startsWith('\x89PNG')) return '.png';
  if (head.startsWith('RIFF') && buffer.subarray(8, 12).toString('utf8') === 'WEBP') return '.webp';
  if (head.startsWith('GIF')) return '.gif';
  if (contentType?.includes('png')) return '.png';
  return '.png';
}

const manifest = {};

for (const [baseName, id] of Object.entries(ASSETS)) {
  const url = `https://www.figma.com/api/mcp/asset/${id}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Failed: ${baseName}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get('content-type') ?? '';
  const ext = resolveExtension(buf, contentType);
  const stem = baseName.replace(/\.(png|svg|webp)$/i, '');
  const filename = `${stem}${ext}`;
  writeFileSync(join(outDir, filename), buf);
  manifest[stem] = filename;
  console.log(`Saved ${filename} (${contentType || ext})`);
}

writeFileSync(
  join(process.cwd(), 'public', 'assets', 'manifest.json'),
  JSON.stringify(manifest, null, 2),
);
console.log('Done. Run scripts/generate-assets-ts.mjs to refresh lib/assets.ts');
