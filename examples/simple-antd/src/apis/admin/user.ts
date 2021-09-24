import { User } from '../../common/db/User'
import { addUser, IUser, toHash } from '../../common/user'

const selectFields: any = ['id', 'account', 'isAdmin', 'disabled']

export const list = async () => await User.find({
  select: selectFields,
})
export const update = async (obj: { [key: string]: any, id: number }) => {
  let { id, pass, ...rest } = obj
  if (!id) throw 'id needed!'
  return await User.update({ id }, { ...rest, pass: await toHash(pass) })
}


export const del = async (id: number) => await User.delete({ id })

export const add = async (obj: IUser) => await addUser(obj)

export const findById = async (id: number | string) => await User.findOne(id, {
  select: selectFields
})