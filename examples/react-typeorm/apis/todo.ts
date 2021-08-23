import { TodoItem } from '../common/db/TodoItem'

export const list = async () => await TodoItem.find()
export const update = async (obj: { [key: string]: any, id: number }) => {
  let { id, ...rest } = obj
  if (!id) throw 'id needed!'
  return await TodoItem.update({ id }, rest)
}

export const del = async (id: number) => await TodoItem.delete({ id })

export const add = async (text: string) => await TodoItem.insert({ text, checked: false })