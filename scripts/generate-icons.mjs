import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#1a5c4a"/>
  <path d="M8 11h16M8 21h16M12 6v5M20 21v5" fill="none" stroke="#fffdf8" stroke-width="2.4" stroke-linecap="round"/>
</svg>`;

function icoFromPngs(pngs) {
  const count = pngs.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];
  for (const png of pngs) {
    const size = png.size;
    entries.push({
      width: size >= 256 ? 0 : size,
      height: size >= 256 ? 0 : size,
      bytes: png.buffer.length,
      offset,
    });
    offset += png.buffer.length;
  }
  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(count, 4);
  let dir = 6;
  for (const e of entries) {
    buf.writeUInt8(e.width, dir);
    buf.writeUInt8(e.height, dir + 1);
    buf.writeUInt8(0, dir + 2);
    buf.writeUInt8(0, dir + 3);
    buf.writeUInt16LE(1, dir + 4);
    buf.writeUInt16LE(32, dir + 6);
    buf.writeUInt32LE(e.bytes, dir + 8);
    buf.writeUInt32LE(e.offset, dir + 12);
    dir += 16;
  }
  for (let i = 0; i < pngs.length; i++) {
    pngs[i].buffer.copy(buf, entries[i].offset);
  }
  return buf;
}

const app = path.join(root, "src", "app");
const publicDir = path.join(root, "public");

const make = (size) =>
  sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();

const [p16, p32, p48, p180, p192, p512] = await Promise.all(
  [16, 32, 48, 180, 192, 512].map(make),
);

fs.writeFileSync(
  path.join(app, "favicon.ico"),
  icoFromPngs([
    { size: 16, buffer: p16 },
    { size: 32, buffer: p32 },
    { size: 48, buffer: p48 },
  ]),
);
fs.writeFileSync(path.join(app, "icon.png"), p32);
fs.writeFileSync(path.join(app, "apple-icon.png"), p180);
fs.writeFileSync(path.join(publicDir, "icon-192.png"), p192);
fs.writeFileSync(path.join(publicDir, "icon-512.png"), p512);

const oldSvg = path.join(app, "icon.svg");
if (fs.existsSync(oldSvg)) fs.unlinkSync(oldSvg);

console.log("Generated favicon.ico, icon.png, apple-icon.png, icon-192/512.png");
