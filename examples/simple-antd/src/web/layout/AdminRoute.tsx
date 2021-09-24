import { lazy } from "react"
import { Route } from "react-router"

const Adminhome = lazy(() => import('../pages/admin/Home'))
const Users = lazy(() => import('../pages/admin/tables/Users'))

export const AdminRoute = ()=>{
  return <Route
  path="/admin"
  render={({ match: { url } }) => (
    <>
      <Route path={`${url}/users`} component={Users} />
      <Route path={`${url}/home`} component={Adminhome}  />
    </>
  )}
/>
}