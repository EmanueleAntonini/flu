import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
          <Navbar.Brand className="nav_brand" href="/">Flu Homepage</Navbar.Brand> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">          
            <Nav className="mr-auto">           
             <Nav.Link href="/searchform" id="searchform">Ricerca un Influencer</Nav.Link>
             <Nav.Link href="/searchdb" id="searchdb">Visualizza tutti</Nav.Link>       
            </Nav>          
          </Navbar.Collapse>
      </Navbar>
    );
}
export default Navigation;