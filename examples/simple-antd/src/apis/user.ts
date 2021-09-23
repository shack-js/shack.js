import { User } from "../common/db/User"
import { addUser, IUser } from "../common/user"
import { jwtSign, validateHash } from "../common/user"

export const register = async (obj: IUser) => {
  return await addUser(obj)
}

export const login = async (account: string, pass: string) => {
  let [user] = await User.find({ account })
  if (!user) throw '无此账号'
  let valid = await validateHash(pass, user.pass)
  if (!valid) throw '密码错误'
  let token = await jwtSign({ account })
  return token
}