import React, {useContext} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {MapFill, Moon, Sun} from 'react-bootstrap-icons';
import {ThemeContext} from '../contexts/Theme';

const Navigation = () => {
  const {theme, setTheme} = useContext(ThemeContext);

  return <Navbar
    bg={theme}
    variant={theme}
    expand='lg'
    fixed='top'>
    <Container>
      <Navbar.Brand
        className='fw-bold text-danger'>
        <MapFill
          className='mx-2' />
        CatMap
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls='basic-navbar-nav' />
      <Navbar.Collapse
        id='basic-navbar-nav'>
        <Nav
          className='me-auto'>
          <Nav.Link>
            Map
          </Nav.Link>
          <Nav.Link>
            List
          </Nav.Link>
          <Nav.Link>
            About
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {
              theme === 'light' ?
                <Moon /> :
                <Sun />
            }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>;
};

export default Navigation;
