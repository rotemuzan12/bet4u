const fs = require('fs');
const { PNG } = require('pngjs');

const png = PNG.sync.read(fs.readFileSync('logo.png'));

// Scene palette — harmonizes with the emerald/gold luxury casino look
const GOLD    = [233, 199, 122]; // champagne gold → replaces pure black
const EMERALD = [ 94, 230, 180]; // scene emerald  → softens the vivid green

let blackCount = 0, greenCount = 0, transCount = 0;

for (let i = 0; i < png.data.length; i += 4) {
  const r = png.data[i];
  const g = png.data[i + 1];
  const b = png.data[i + 2];
  const a = png.data[i + 3];

  if (a === 0) { transCount++; continue; }

  // Classify: green-dominant vs. everything else (black + its anti-aliased edges)
  const sum = r + g + b + 0.0001;
  const gNorm = g / sum;
  const isGreen = gNorm > 0.42 && g > 60;

  const target = isGreen ? EMERALD : GOLD;
  png.data[i]     = target[0];
  png.data[i + 1] = target[1];
  png.data[i + 2] = target[2];
  // alpha untouched — preserves anti-aliased edges

  if (isGreen) greenCount++; else blackCount++;
}

fs.writeFileSync('logo-themed.png', PNG.sync.write(png));
console.log(`written logo-themed.png (${png.width}x${png.height})`);
console.log(`pixels → gold:${blackCount} emerald:${greenCount} transparent:${transCount}`);
