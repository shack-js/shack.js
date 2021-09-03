import { services } from "../micrized" 

export const hello = async (name: string) => {
  let {hello} = await services.test()
  return await hello(name,1,1)
}