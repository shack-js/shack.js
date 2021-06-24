import md5 from 'md5'
import { User, SECRET } from '../common/User'
import jwt from 'jsonwebtoken'
import promisefy from '../common/promisefy'

export const login = async (account: string, pass: string) => {
  let user = await User.findOne({ where: { account }, raw: true })
  if (!user) throw 'no such user!'
  if (md5(pass) != user['pass']) throw 'wrong pass!'
  delete user['pass']
  return (await promisefy(jwt.sign)(
    user,
    SECRET,
    { expiresIn: '1 day' }
  )) as string
}

export const register = async (account: string, pass: string) => {
  await User.build({ account, pass: md5(pass) }).save()
  return await login(account, pass)
}

interface User {
  account: string
}
export async function info() {
  return this.user as (User | undefined)
}

