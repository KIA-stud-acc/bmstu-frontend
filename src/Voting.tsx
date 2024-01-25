import { useEffect, useState } from 'react'
import './Voting.css'
import { useParams } from 'react-router-dom';
import { Voting, voteById } from './modules/vote-by-id.ts'
import {Breadcrumb} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';



function VotingPage() {
    const { id } = useParams<{ id: string }>();
    const [voting, setVote] = useState<Voting>({id: 0, name: '', type: '', status: '', image_src: ''})
    const dispatch = useDispatch();
    const handleSearch = async () =>{
        const response = await voteById(id)
        await setVote(response)
    }
    useEffect(()=>{
      handleSearch();
    },[dispatch]);
    
    


  return ( 
    <>
    <Breadcrumb>
        <Breadcrumb.Item><Link to="/bmstu-frontend/">Главная</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/bmstu-frontend/vybory">Каталог</Link></Breadcrumb.Item>
        <Breadcrumb.Item active>
        {voting.name}
        </Breadcrumb.Item>
    </Breadcrumb>
    <h2>{voting.name}{voting.status=="удалён"&&<p style={{color:"red"}}>(УДАЛЕНА)</p>}</h2>
<br/><hr/><br/>
<img className="imgVoting" src =  {voting.image_src || 'https://dostavka.phali-hinkali.ru/murino/api2/images/placeholder_1000x.jpg'} />
<br/>
<p className = "pVoting"> {voting.type} </p>

    </>
  )
}

export default VotingPage
