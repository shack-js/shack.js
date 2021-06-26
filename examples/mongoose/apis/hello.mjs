import { Cat } from '../common/Cat.mjs'

export const hello = async name => {
  let cat = await Cat.findOne({})
  return `hello ${name}! from ${cat.name}`
}