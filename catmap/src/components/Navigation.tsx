import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {MapFill} from 'react-bootstrap-icons';

const Navigation = () => <Navbar
  bg='light'
  variant="light"
  expand='lg'>
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
    </Navbar.Collapse>
  </Container>
</Navbar>;

export default Navigation;
