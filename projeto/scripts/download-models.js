import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Extract } from 'unzipper';

const MODELS_URL = 'https://github.com/ant0nelli/Objetos3D-2026-1/releases/download/v1.0-models/models.zip';
const DEST = './public/models';

if (existsSync(DEST)) {
  console.log('Modelos já existem, pulando download.');
  process.exit(0);
}

console.log('Baixando modelos...');
mkdirSync(DEST, { recursive: true });

const res = await fetch(MODELS_URL);

await pipeline(res.body, Extract({ path: './public/models' }));

console.log('Modelos extraídos em public/models');