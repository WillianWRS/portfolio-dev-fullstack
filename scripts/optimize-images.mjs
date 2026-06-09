import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');

const jobs = [
  {
    input: 'wall2.png',
    outputs: [
      { file: 'wall2.webp', width: 3578, quality: 92 },
      { file: 'wall2-lq.webp', width: 48, quality: 35, blur: 4 },
    ],
  },
  {
    input: 'wall2 - mobile.png',
    outputs: [
      { file: 'wall2-mobile.webp', width: 2048, quality: 92 },
      { file: 'wall2-mobile-lq.webp', width: 32, quality: 35, blur: 4 },
    ],
  },
  {
    input: 'habit builder project.png',
    outputs: [
      { file: 'habit-builder.webp', width: 994, quality: 90 },
      { file: 'habit-builder-lq.webp', width: 32, quality: 35, blur: 4 },
    ],
  },
];

async function formatKb(filePath) {
  const { size } = await stat(filePath);
  return `${Math.round(size / 1024)} KB`;
}

async function processJob({ input, outputs }) {
  const inputPath = path.join(publicDir, input);
  const meta = await sharp(inputPath).metadata();

  for (const output of outputs) {
    const outputPath = path.join(publicDir, output.file);
    let pipeline = sharp(inputPath).rotate();

    if (output.width && meta.width && meta.width > output.width) {
      pipeline = pipeline.resize({ width: output.width, withoutEnlargement: true });
    }

    if (output.blur) {
      pipeline = pipeline.blur(output.blur);
    }

    await pipeline.webp({ quality: output.quality, effort: 6 }).toFile(outputPath);
    console.log(`  ${output.file}: ${await formatKb(outputPath)}`);
  }
}

async function main() {
  await mkdir(publicDir, { recursive: true });
  console.log('Optimizing critical images...\n');

  for (const job of jobs) {
    console.log(job.input);
    await processJob(job);
    console.log('');
  }

  console.log('Done.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
