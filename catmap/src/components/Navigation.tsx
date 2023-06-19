import React, {useContext} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Moon, Sun} from 'react-bootstrap-icons';
import {ThemeContext} from '../contexts/Theme';

const Navigation = () => {
  const {theme, setTheme} = useContext(ThemeContext);

  return <Navbar
    bg={theme}
    variant={theme}
    expand='lg'
    fixed='top'
    className='shadow'>
    <Container>
      <Navbar.Brand
        className='fw-bold'>
        CatMap
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls='basic-navbar-nav' />
      <Navbar.Collapse
        id='basic-navbar-nav'>
        <Nav
          className='me-auto'>
        </Nav>
        <Nav>
          <Nav.Link
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {
              theme === 'light' ?
                <Moon
                  className='mx-2' /> :
                <Sun
                  className='mx-2' />
            }Mode
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>;
};

export default Navigation;
