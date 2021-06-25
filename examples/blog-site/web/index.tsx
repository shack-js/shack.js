import { Container, } from "semantic-ui-react"
import { render } from "react-dom"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Navbar from "./Navbar"
import Footer from "./Footer"
import Home from './home'
import Write from './write'
import Login from './login'

const Index = () => <Router>
  <Container fluid>
    <Navbar />
    <Container>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" >
          <Login isRegister={true} />
        </Route>
        <Route path="/write" component={Write} />
        <Route path="/" component={Home} />
      </Switch>
    </Container>
    <Footer />
  </Container>
</Router>

render(<Index />, document.getElementById('react-root'))

// @ts-ignore
import.meta.webpackHot && import.meta.webpackHot.accept()