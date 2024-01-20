import { Card, Button } from 'react-bootstrap'
import './VotingCard.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { chDraftExistAction } from '../slices/dataSlice';
import Cookies from 'js-cookie';





function VotingCard( id: number, name: string, image_src: any ){
    const dispatch = useDispatch()
    const addHandler = async (id:number) =>{
        dispatch(chDraftExistAction(true))
        Cookies.set("draft_exist", "1")
        axios.post(`../../api/vybory/${id}/addToAppl`)
    }

    return(
    <Card className = "d-inline-block">
        <Card.Img className="card-img-top" src={image_src || 'https://dostavka.phali-hinkali.ru/murino/api2/images/placeholder_1000x.jpg'} alt = {name} />
        <Card.Body>                
            <div className="card-title">
                <Card.Title>{name}</Card.Title>
            </div>
            <div className = "execBtn">
                <Button className="cardButton" variant="primary"><Link className='link' to={`/bmstu-frontend/vybory/${id}`}>Узнать больше</Link></Button>
                <a className = "add" onClick={()=>addHandler(id)}>
                    <img src="https://atvin.ru/img/basket1.svg" alt="Добавить в корзину" height = "20"/>
                </a>
            </div>
        </Card.Body>
    </Card>
)}

export default VotingCard;