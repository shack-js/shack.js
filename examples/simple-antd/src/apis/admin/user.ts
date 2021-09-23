import { User } from '../../common/db/User'
import { IUser } from '../../common/user'

export const list = async () => await User.find()
export const update = async (obj: { [key: string]: any, id: number }) => {
  let { id, ...rest } = obj
  if (!id) throw 'id needed!'
  return await User.update({ id }, rest)
}

export const del = async (id: number) => await User.delete({ id })

export const add = async (obj: IUser) => await User.insert(obj)