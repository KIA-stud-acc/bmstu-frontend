import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { chBasketAction, chLogAction, chModerAction, setUsernameAction, useBasket, useIsLogged, useIsModer, useUsername } from '../slices/dataSlice';
import { useEffect } from 'react';
import { checkName } from '../modules/checkName';
import { useDispatch } from 'react-redux';
import { logout } from '../modules/logout'
import { searchInVoteList } from '../modules/search-in-vote-list';
import Cookies from 'js-cookie';
import { application } from '../modules/applications';


function NavBar() {
  const username = useUsername()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const authCheck = async () =>{
    const userInfo = await checkName()
    const name = userInfo.username
    const isStaff = userInfo.is_staff
    const bas = await application("current")
    dispatch(setUsernameAction(name));
    if (name != ''){
      dispatch(chLogAction(true));
    }
    if (isStaff){
      dispatch(chModerAction(true));
    }
    if (bas.Voting.length > 0){
      dispatch(chBasketAction(true));
    }
    const prom = await searchInVoteList()
    prom
}
  

const SubmitLogout = async () =>{
  await logout();
  dispatch(chLogAction(false));
  dispatch(chBasketAction(false));
  dispatch(chModerAction(false));
  Cookies.remove("session_id")
  navigate("/bmstu-frontend/vybory");
  }
  


  useEffect(() => {
    authCheck()
    
    }, []);
  


  return (
    <Navbar className="navbar-light" expand="xl" >
      <Container fluid className="new" style={{width:"100%"}}>
        <Navbar.Brand as={Link} to="/bmstu-frontend/" className="brand text-center brandcss" style={{fontSize:"2em"}}>Выборы</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100 justify-content-center ">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link as={Link} to="/bmstu-frontend/" className="li mx-2 left"><p className='navtext'>Главная</p></Nav.Link>
            <Nav.Link  as={Link} to="/bmstu-frontend/vybory" className="li mx-2 left">Каталог</Nav.Link>
            <Nav.Link as={Link} to="#link" className="li mx-2 left">Контакты</Nav.Link>
            {useIsLogged() && <><Nav.Link as={Link} to="/bmstu-frontend/applications" className="li mx-2 left">Голосования</Nav.Link></>}
            {useIsModer() && <><Nav.Link as={Link} to="/bmstu-frontend/moder/vybory" className="li mx-2 left">Редактирование названий</Nav.Link></>}
          </Nav>
          <Nav className="d-flex me-2">
            <>
            {useBasket()?<Nav.Link as={Link} to="/bmstu-frontend/applications/current" className="ml-auto mx-2 rightnav">Черновик голосования</Nav.Link>:
                <Nav.Link disabled className="ml-auto mx-2 rightnav">Черновик голосования</Nav.Link>}
            {
              useIsLogged()?(
                (<>
                <Nav.Link onClick={()=>SubmitLogout()} className="ml-auto li mx-2 rightnav">({username}) Выйти</Nav.Link></>)
                ): <><Nav.Link as={Link} to="/bmstu-frontend/auth/reg" className="ml-auto li mx-2 rightnav">Регистрация</Nav.Link>
                <Nav.Link as={Link} to="/bmstu-frontend/auth" className="ml-auto li mx-2  rightnav">Войти</Nav.Link></>
            }</></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default NavBar;


