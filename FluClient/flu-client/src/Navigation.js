import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
          <Navbar.Brand href="/">React Multipage</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">          
            <Nav className="mr-auto">           
             <Nav.Link href="/" id="home">Home</Nav.Link>
             <Nav.Link href="/searchform" id="searchform">SearchForm</Nav.Link>
             <Nav.Link href="/searchdb" id="searchdb">SearchDB</Nav.Link>       
            </Nav>          
          </Navbar.Collapse>
      </Navbar>
    );
}
export default Navigation;