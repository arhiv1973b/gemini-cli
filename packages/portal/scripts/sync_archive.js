/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import fs from 'node:fs';
import path from 'node:path';

const SOURCE_DIR = 'H:\\Загрузки';
const MANIFEST_PATH = path.join(process.cwd(), 'src', 'archive_manifest.json');

const CATEGORY_MAP = {
  '.pdf': 'Evidence',
  '.docx': 'Legal',
  '.doc': 'Legal',
  '.json': 'Legal',
  '.mp3': 'Media',
  '.mp4': 'Media',
  '.m4a': 'Media',
  '.zip': 'Archive',
  '.tar.gz': 'Archive',
};

const STATUS_MAP = {
  '.signed.pdf': 'verified',
  '.pdf': 'evidence',
  '.json': 'master',
  '.mp3': 'deployed',
};

function syncManifest() {
  console.log(`🔍 Scanning: ${SOURCE_DIR}`);

  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Error: Source directory ${SOURCE_DIR} not found.`);
    return;
  }

  const existingManifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const files = fs.readdirSync(SOURCE_DIR);

  const newItems = files.map((file) => {
    const ext = path.extname(file).toLowerCase();
    const isSigned = file.toLowerCase().includes('.signed');

    return {
      name: file,
      type: ext.replace('.', '') || 'directory',
      category: CATEGORY_MAP[ext] || 'Archive',
      status: isSigned ? 'verified' : STATUS_MAP[ext] || 'secured',
      timestamp: fs.statSync(path.join(SOURCE_DIR, file)).mtime.toISOString(),
    };
  });

  // Merge with static entries (like URLs) and prevent duplicates by name
  const staticEntries = existingManifest.filter(
    (item) => item.url || item.type === 'case' || item.type === 'system',
  );
  const combined = [...staticEntries, ...newItems];

  const uniqueItems = Array.from(
    new Map(combined.map((item) => [item.name, item])).values(),
  );

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(uniqueItems, null, 2), 'utf8');
  console.log(`✅ Manifest updated. Total items: ${uniqueItems.length}`);
}

syncManifest();
