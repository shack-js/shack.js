import { render } from "react-dom"
import Login from "./Login"
import Apis from "./Apis"

const Index = () => <div>
  <Login />
  <Apis />
</div>

render(<Index />, document.getElementById('react-root'))


