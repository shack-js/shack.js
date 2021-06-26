import { init, add } from "../common/elastic.mjs"

export default async () => {
  await init()
  await add({ name: 'Zildjian' })
}