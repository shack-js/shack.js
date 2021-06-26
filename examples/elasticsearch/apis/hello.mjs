import { findOne } from '../common/elastic.mjs'

export const hello = async name => {
  let cat = await findOne()
  return `hello ${name}! from ${cat.name}`
}