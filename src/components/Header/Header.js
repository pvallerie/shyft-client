import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#/index-all-bikes">Home</Nav.Link>
    <NavDropdown title="Account" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#/index-user-bikes">My Bikes</NavDropdown.Item>
      <NavDropdown.Item href="#/index-user-loans">My Loans</NavDropdown.Item>
      <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link href="#/">Home</Nav.Link>
//   </Fragment>
// )

const Header = ({ user }) => {
  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Navbar.Brand href="#/index-all-bikes">
        Shyft
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* { alwaysOptions } */ }
          { user ? authenticatedOptions : unauthenticatedOptions }
          { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default Header
