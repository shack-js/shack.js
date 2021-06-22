import jwt from 'jsonwebtoken'
import { HEADER_KEY, SECRET } from '../common/consts.mjs'

export default async (req, ctx) => {
  let token = req.headers[HEADER_KEY]
  if (!token) return
  try {
    let user = await verify(token)
    return { ...ctx, user }
  } catch (e) { }
}

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return reject(err)
      resolve(decoded)
    })
  })
}