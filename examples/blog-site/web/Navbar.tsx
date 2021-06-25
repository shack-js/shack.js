import { Menu, Icon, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { token, user } from './stores'

const Navbar: React.FC<{}> = () => {
  let [currentUser] = user.use()
  let [, , setToken] = token.use()
  let account = currentUser && currentUser.account || ''
  return <Menu secondary={true} pointing={true}>
    <Menu.Item as={Link} name='home' to='/'>
      <Icon name='home' />
      home 
    </Menu.Item>
    {account && <Menu.Item as={Link} name='write' to='/write'>
      <Icon name='write' />
      write
    </Menu.Item>}
    <Menu.Item position="right">
      {account
        ? <Dropdown item text={account}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setToken('')}>logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        : <Link to="/login">login</Link>
      }
    </Menu.Item>
  </Menu>
};

export default Navbar