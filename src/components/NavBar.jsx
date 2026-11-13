
import { Link, NavLink } from 'react-router-dom';
import {
  Container,
  Navbar as BootstrapNavbar,
  Nav
} from 'react-bootstrap';

function Navbar() {
  return (
    <BootstrapNavbar expand="lg" className="app-navbar">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="brand">
          <span className="brand-icon">🤑</span> BookFinder
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="main-navbar" />

        <BootstrapNavbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Search
            </Nav.Link>

            <Nav.Link as={NavLink} to="/list">
              My List
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
