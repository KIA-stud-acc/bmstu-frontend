import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import { Link } from 'react-router-dom';

function NavBar() {



  return (
    <Navbar className="navbar-light navbar-expand" expand="lg">
      <Container fluid className="new flex-column" style={{width:"100%"}}>
        <Navbar.Brand href="#home" className="brand text-center" style={{fontSize:"2em"}}>Выборы</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100 d-flex justify-content-center ">
          <Nav className="me-auto">
            <Nav.Link className="li mx-3" style={{flex:"1"}}><Link to="#home" className='link'>Главная</Link></Nav.Link>
            <Nav.Link className="li mx-3" style={{flex:"1"}}><Link to="/bmstu-frontend/vybory" className='link'>Каталог</Link></Nav.Link>
            <Nav.Link className="li mx-3" style={{flex:"1"}}><Link to="#link" className='link'>Контакты</Link></Nav.Link>
          </Nav>
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link className="ml-auto"><Link to="/bmstu-frontend/auth/reg" className='link'>Регистрация</Link></Nav.Link>
            <Nav.Link className="ml-auto"><Link to="/bmstu-frontend/auth" className='link'>Войти</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default NavBar;


