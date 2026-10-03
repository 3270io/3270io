import sharp from "sharp"
import { readdir } from "node:fs/promises"
import { resolve } from "node:path"

const directory = "src/assets/shots/web"
for (const file of await readdir(directory)) {
  if (!file.endsWith(".png")) continue
  const input = resolve(directory, file)
  const stem = file.slice(0, -4)
  const metadata = await sharp(input).metadata()
  for (const width of [640, 1024].filter(width => width < metadata.width)) {
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 88 }).toFile(resolve(directory, `${stem}-${width}.webp`))
  }
  await sharp(input).webp({ quality: 92 }).toFile(resolve(directory, `${stem}.webp`))
}
