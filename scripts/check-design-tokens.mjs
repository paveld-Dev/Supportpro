import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const TOKENIZED_FILES = [
  'app/cloudmanagement/page.tsx',
  'app/dedicated-server-support/page.tsx',
  'app/dedicated-tech-support/page.tsx',
  'app/semi-dedicated-support/page.tsx',
  'app/dedicated-team-support/page.tsx',
  'src/components/ui/sp-button.tsx',
];

const GREEN_BUTTON_REGEX = /(?:bg-\[#00[78]000\]|hover:bg-\[#00[78]000\]|bg-green-\d{2,3})/;
const RAW_HEX_REGEX = /(?:\[#|['"]#)[0-9a-fA-F]{3,8}\b|#[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?\b/g;
const BUTTON_INLINE_STYLE_REGEX = /<button[^>]*\bstyle=\{\{/;

function walkTsxFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      results.push(...walkTsxFiles(full));
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      results.push(full);
    }
  }
  return results;
}

const errors = [];

// 1. Global check: fail on any green button color across app/ and src/
for (const baseDir of ['app', 'src']) {
  for (const absPath of walkTsxFiles(path.join(ROOT, baseDir))) {
    const relPath = path.relative(ROOT, absPath).replace(/\\/g, '/');
    const lines = fs.readFileSync(absPath, 'utf8').split(/\r?\n/);
    lines.forEach((line, idx) => {
      if (GREEN_BUTTON_REGEX.test(line)) {
        errors.push(`${relPath}:${idx + 1} — Green button color forbidden; use PrimaryButton (--primary)`);
      }
    });
  }
}

// 2. Strict token check on locked pages & button component
for (const relPath of TOKENIZED_FILES) {
  const absPath = path.join(ROOT, relPath);
  if (!fs.existsSync(absPath)) {
    errors.push(`${relPath} — Missing expected tokenized file`);
    continue;
  }
  const lines = fs.readFileSync(absPath, 'utf8').split(/\r?\n/);
  lines.forEach((line, idx) => {
    const hexMatches = line.match(RAW_HEX_REGEX);
    if (hexMatches) {
      errors.push(`${relPath}:${idx + 1} — Raw hex color (${hexMatches.join(', ')}) forbidden outside styles/tokens.css`);
    }
    if (BUTTON_INLINE_STYLE_REGEX.test(line)) {
      errors.push(`${relPath}:${idx + 1} — Inline style on <button> forbidden; use PrimaryButton or SecondaryButton`);
    }
  });
}

if (errors.length > 0) {
  console.error('\nDesign Token Enforcement Failed:\n' + errors.map((e) => `  - ${e}`).join('\n') + '\n');
  process.exit(1);
}

console.log('Design token & button enforcement passed.');
