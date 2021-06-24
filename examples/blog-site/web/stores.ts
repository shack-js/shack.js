import Store from 'react-tiny-states'
import { setHeaders } from '@shack-js/loader-fetch/src/fetch'
import { info } from '../apis/user'

export const token = new Store('', [], async () => localStorage.getItem('jwt'))
export const user = new Store(null, [token], async token => {
  if (!token) {
    setHeaders({})
    localStorage.setItem('jwt', '')
    return null
  }
  localStorage.setItem('jwt', token)
  setHeaders({ jwt: token })
  let user = await info()
  return user
})