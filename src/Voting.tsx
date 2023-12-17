import { useEffect, useState } from 'react'
import './Voting.css'
import { useParams,Link } from 'react-router-dom';
import { Voting, voteById } from './modules/vote-by-id.ts'
import {Breadcrumb} from 'react-bootstrap'



function VotingPage() {
    const { id } = useParams<{ id: string }>();
    const [voting, setVote] = useState<Voting>({id: 0, name: '', type: '', status: '', image_src: ''})
    const handleSearch = async () =>{
        const response = await voteById(id)
        console.log(response)
        await setVote(response)
    }
    useEffect(()=>{
      handleSearch();
    },[])
    
    


  return ( 
    <>
    <Breadcrumb>
        <Breadcrumb.Item href="#home">Главная</Breadcrumb.Item>
        <Breadcrumb.Item href="../vybory">Каталог</Breadcrumb.Item>
        <Breadcrumb.Item active>
        {voting.name}
        </Breadcrumb.Item>
    </Breadcrumb>
    <h2>{voting.name}</h2>
<br/><hr/><br/>
<img className="imgVoting" src =  {voting.image_src || 'https://dostavka.phali-hinkali.ru/murino/api2/images/placeholder_1000x.jpg'} />
<br/>
<p className = "pVoting"> {voting.type} </p>
    </>
  )
}

export default VotingPage
