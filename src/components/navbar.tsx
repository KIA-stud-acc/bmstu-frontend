import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { chLogAction, setUsernameAction, useIsLogged, useUsername, useVotingDateToSearchQuery } from '../slices/dataSlice';
import { useEffect } from 'react';
import { checkName } from '../modules/checkName';
import { useDispatch } from 'react-redux';
import { res, logout } from '../modules/logout'



function NavBar() {
  const username = useUsername()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const authCheck = async () =>{
    dispatch(setUsernameAction(await checkName()));
}
  

const SubmitLogout = async () =>{
  const response = await logout();
  dispatch(chLogAction());
  navigate("/bmstu-frontend/vybory");
  }
  


  useEffect(() => {
    authCheck()
    }, []);
  


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
            {useIsLogged() && <><Nav.Link as={Link} to="/bmstu-frontend/applications" className="li mx-3" style={{flex:"1"}}>Голосования</Nav.Link></>}
          </Nav>
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <>
            {
              useIsLogged()?(
                (<><Nav.Link onClick={()=>SubmitLogout()} className="ml-auto">({username}) Выйти</Nav.Link></>)
                ): <><Nav.Link as={Link} to="/bmstu-frontend/auth/reg" className="ml-auto">Регистрация</Nav.Link>
                <Nav.Link as={Link} to="/bmstu-frontend/auth" className="ml-auto">Войти</Nav.Link></>
            }</>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default NavBar;


