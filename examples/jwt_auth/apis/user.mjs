import jwt from 'jsonwebtoken'
import { SECRET, EXPIRE } from '../common/consts.mjs'

export async function info() {
  return this.user
}

export const login = async (user = '', pass = '') => {
  if (['user', 'admin'].includes(user) && pass == '123456') {
    return jwt.sign({ user }, SECRET, { expiresIn: EXPIRE })
  }
  throw 'wrong user/pass'
}