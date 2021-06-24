import jwt from 'jsonwebtoken'
import promisefy from '../common/promisefy'
import { SECRET } from '../common/User'
import { Request } from 'express'

export default async (req: Request, ctx: any) => {
  // console.log(`inside _auth!`)
  let token = req.headers['jwt'] as string
  // console.log({ token }, req.headers)
  if (!token) return
  try {
    let user = await (promisefy(jwt.verify)(token, SECRET))
    // console.log({ user })
    return { ...ctx, user }
  } catch (error) {
    console.log({ error })
  }
}