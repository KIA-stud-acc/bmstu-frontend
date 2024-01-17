import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import { Link } from 'react-router-dom';

function NavBar() {



  return (
    <Navbar className="navbar-light navbar-expand" expand="lg">
      <Container fluid className="new flex-column" style={{width:"100%"}}>
        <Navbar.Brand as={Link} to="#home" className="brand text-center" style={{fontSize:"2em"}}>Выборы</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100 d-flex justify-content-center ">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="#home" className="li mx-3" style={{flex:"1"}}>Главная</Nav.Link>
            <Nav.Link  as={Link} to="/bmstu-frontend/vybory" className="li mx-3" style={{flex:"1"}}>Каталог</Nav.Link>
            <Nav.Link as={Link} to="#link" className="li mx-3" style={{flex:"1"}}>Контакты</Nav.Link>
          </Nav>
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link as={Link} to="/bmstu-frontend/auth/reg" className="ml-auto">Регистрация</Nav.Link>
            <Nav.Link as={Link} to="/bmstu-frontend/auth" className="ml-auto">Войти</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default NavBar;


