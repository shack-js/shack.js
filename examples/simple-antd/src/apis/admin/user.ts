import { FindManyOptions } from 'typeorm'
import { User } from '../../common/db/User'
import { toHash, IUser } from '../../common/user'

const selectFields: any = ['id', 'account', 'isAdmin', 'disabled'],
  DEFAULT_PAGE_SIZE = 10

type ListUserOptions = {
  pageSize?: number,
  page?: number,
  find?: FindManyOptions<User>,
}

export type ListUserResult = {
  total: number,
  pageSize: number,
  page: number,
  list: IUser[]
}

export const listUser = async (options: ListUserOptions = {}): Promise<ListUserResult> => {
  let { pageSize = DEFAULT_PAGE_SIZE, page = 1, find = {} } = options
  return {
    page,
    pageSize,
    total: await User.count(find),
    list: await User.find({
      ...find,
      select: selectFields,
      skip: (page - 1) * pageSize,
      take: pageSize
    })
  }
}

export const updateUser = async (obj: { [key: string]: any, id: number }) => {
  let { id, pass, ...rest } = obj
  if (!id) throw 'id needed!'
  return await User.update({ id }, pass ? { ...rest, pass: await toHash(pass) } : rest)
}


export const delUser = async (id: number) => await User.delete({ id })

export { addUser } from '../../common/user'

export const findUserById = async (id: number | string) => await User.findOne(id, {
  select: selectFields
})