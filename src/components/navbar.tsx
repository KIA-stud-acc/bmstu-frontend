import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { chDraftExistAction, chLogAction, setUsernameAction, useDraftExist, useIsLogged, useUsername } from '../slices/dataSlice';
import { useEffect } from 'react';
import { checkName } from '../modules/checkName';
import { useDispatch } from 'react-redux';
import { logout } from '../modules/logout'
import { searchInVoteList } from '../modules/search-in-vote-list';
import Cookies from 'js-cookie';


function NavBar() {
  const draft = useDraftExist()
  const username = useUsername()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const authCheck = async () =>{
    dispatch(setUsernameAction(await checkName()));
    const prom = await searchInVoteList()
    prom
}
  

const SubmitLogout = async () =>{
  await logout();
  dispatch(chLogAction());
  Cookies.remove("draft_exist")
  dispatch(chDraftExistAction(false))
  navigate("/bmstu-frontend/vybory");
  }
  


  useEffect(() => {
    authCheck()
    
    }, []);
  


  return (
    <Navbar className="navbar-light navbar-expand" expand="lg" >
      <Container fluid className="new flex-column" style={{width:"100%"}}>
        <Navbar.Brand as={Link} to="#home" className="brand text-center brandcss" style={{fontSize:"2em"}}>Выборы</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100 d-flex justify-content-center ">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link as={Link} to="#home" className="li mx-3 left" style={{flex:"1"}}><p className='navtext'>Главная</p></Nav.Link>
            <Nav.Link  as={Link} to="/bmstu-frontend/vybory" className="li mx-3 left" style={{flex:"1"}}>Каталог</Nav.Link>
            <Nav.Link as={Link} to="#link" className="li mx-3 left" style={{flex:"1"}}>Контакты</Nav.Link>
            {useIsLogged() && <><Nav.Link as={Link} to="/bmstu-frontend/applications" className="li mx-3 left" style={{flex:"1"}}>Голосования</Nav.Link></>}
          </Nav>
          <Nav className="d-flex me-2">
            <>
            
            {
              useIsLogged()?(
                (<>{draft?<Nav.Link as={Link} to="/bmstu-frontend/applications/current" className="ml-auto rightnav">Черновик голосования</Nav.Link>:
                <Nav.Link disabled className="ml-auto">Черновик голосования</Nav.Link>}
                <Nav.Link onClick={()=>SubmitLogout()} className="ml-auto  rightnav">({username}) Выйти</Nav.Link></>)
                ): <><Nav.Link as={Link} to="/bmstu-frontend/auth/reg" className="ml-auto rightnav">Регистрация</Nav.Link>
                <Nav.Link as={Link} to="/bmstu-frontend/auth" className="ml-auto rightnav">Войти</Nav.Link></>
            }</></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default NavBar;


