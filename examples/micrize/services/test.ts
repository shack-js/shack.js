import { services } from '../micrized'

export const hello = async (name: string, a: number, b: number) => {
  let { add } = await services.math()
  return `hello ${name}, ${a}+${b}=${await add(a, b)}`
}