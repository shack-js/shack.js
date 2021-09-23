import Store from 'react-tiny-states'
import decode from 'jwt-decode'

type IUser = {
  account: string
  isadmin: boolean
  token: string
} | undefined

export const user = new Store(undefined as IUser)

// decode()