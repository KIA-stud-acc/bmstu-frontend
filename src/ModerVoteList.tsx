import { useState, useEffect, FC } from 'react'
import './ModerVoteList.css'
import {Breadcrumb, Button, Table} from 'react-bootstrap'
import InputField from './components/InputField'

import { Voting, searchInVoteList } from './modules/search-in-vote-list.ts'
import {setNameSQModerAction, useNameSearchQueryModer} from "./slices/dataSlice";
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'




const ModerVoteList: FC = () => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState(useNameSearchQueryModer())
  const [voting, setVote] = useState<Voting[]>([])
  const searchQuery = useNameSearchQueryModer()
  const navigate = useNavigate();


  const handleSearch = async () =>{
    const response = await searchInVoteList(searchValue)
    await setVote(response.voting)
}



useEffect(() => {
  handleSearch();
  }, [searchQuery]);



  return (
    <>
    <Breadcrumb>
      <Breadcrumb.Item href="#home">Главная</Breadcrumb.Item>
      <Breadcrumb.Item active>Редактрование названий</Breadcrumb.Item>
    </Breadcrumb>
    <div className='topBar'>
      <div className='inputField'><InputField
                error ={false}
                value={searchValue}
                searchvalue={searchQuery}
                setValue={(value) => setSearchValue(value)}
                onEnter={(searchvalue) => dispatch(setNameSQModerAction(searchvalue))}
                placeHolder="Поиск"
            /></div><Button className='createBtn' onClick={()=>navigate(`/bmstu-frontend/moder/vybory/create`)}>Создать</Button>
            </div>
        <br/>
        <div className="table2">
        <Table className="w-100" responsive="sm">
            <thead>
            <tr>
                <th><div className='idField'>ID</div></th>
                <th>Название</th>
                <th>Тип объекта</th>
                <th className='voteImgCell'>Логотип</th>
            </tr>
            </thead>
            <tbody>
            {voting.map((item)=> (
                        <><tr  onClick={()=>navigate(`/bmstu-frontend/moder/vybory/${item.id}`)}> 
                            <td><p className="idField">{item.id}</p></td>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td className='voteImgCell'><img className='voteImg' src={item.image_src || 'https://dostavka.phali-hinkali.ru/murino/api2/images/placeholder_1000x.jpg'}></img></td>
                            </tr></>
                ))}
            </tbody>
        </Table>
        </div>
    </>
  )
}

export default ModerVoteList



