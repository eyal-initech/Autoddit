import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import * as routes from './routes'

const NavBar = ({loggedIn, username}) => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item header content={`Autoddit ${(loggedIn) ? ` - ${username}` : ''}`}/>
      {
        (loggedIn) ? (
          <React.Fragment>
            <Menu.Item content={<Link to={routes.HOME}>Posts</Link>} />
            <Menu.Item content={<Link to={routes.ADD_POST}>Add Post</Link>} />
          </React.Fragment>
        ) : ''
      }
    </Container>
  </Menu>
);

const stateToProps = ({user}) => ({loggedIn: user.loggedIn, username: user.name});
export default connect(stateToProps)(NavBar);
