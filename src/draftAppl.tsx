import { useEffect, useState } from 'react'
import './draftAppl.css'
import { useParams } from 'react-router-dom';
import {Breadcrumb, Button, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { applVote, application } from './modules/applications';
import { delDateFromAction, delDateToAction, delStatusAction, setDateFromAction, setDateToAction, setStatusAction, useDraftExist, useVotingDateFromSearchQuery, useVotingDateToSearchQuery, useVotingStatusSearchQuery } from './slices/dataSlice';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DraftAppl() {
    
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch()
    const [descrip, setDescrip] = useState('')
    const [applic, setApplication] = useState<applVote>({Application:{id:0, creator:null, moderator:null, status:'',
    date_of_creation:null, date_of_formation:null, date_of_completion:null, description:undefined, QuantityOfVotes:null}, Voting:[]})
    const getAppl = async () =>{
        const response = await application(id)
        await setApplication(response)
    }
    useEffect(() => {
        getAppl();
        }, []);
    




  return ( 
    <>
    <Breadcrumb>
        <Breadcrumb.Item><Link to="#home">Главная</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/bmstu-frontend/applications">Голосования</Link></Breadcrumb.Item>
        <Breadcrumb.Item active>
        {(id=="current")?"Черновик":id}
        </Breadcrumb.Item>
    </Breadcrumb>
    <div className="fields">
        <div className='field id'>id: {applic.Application.id}</div>
        <div className='field status'>Статус: {applic.Application.status}</div>
        <div className='field creator'>Создатель: {applic.Application.creator?applic.Application.creator.username:'-'}</div>
        <div className='field date_of_creation'>Дата создания: {applic.Application.date_of_creation || "-"}</div>
        <div className='field date_of_formation'>Дата формирования: {applic.Application.date_of_formation || "-"}</div>
        <div className='field date_of_completion'>Дата завершения: {applic.Application.date_of_completion || "-"}</div>
        <div className="desc">
        {id=="current"?<Form className='field'>
            <Form.Control
            type="text"
            placeholder="Описание голосования"
            defaultValue={applic.Application.description}
            />
        </Form>:<div className='field description'>Описание голосования: {applic.Application.description || "-"}</div>}
        
        <Table responsive="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Статус</th>
            <th>Название</th>
            <th>Тип</th>
            <th>Процент голосов</th>
            {(id=="current")&&<th>Удалить из голосования</th>}
          </tr>
        </thead>
        <tbody>
        {applic.Voting.map((item)=> (
                      <><tr> 
                        <td><Link className='link' to={`/bmstu-frontend/vybory/${item.id}`}>{item.id}</Link></td>
                        <td>{item.status}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        {id=="current"?<td><Form  className='field'>
            <Form.Control
            type="text"
            placeholder="Процент голосов"
            defaultValue={item.percantage}
            />
        </Form></td>:
                        <td>{item.percantage}</td>
                        }
                      </tr></>
              ))}
          </tbody>
      </Table>


        </div>
        {(id=="current")&&<Button className='form'>Сформировать</Button>}
        </div>
    
    </>
  )
}

export default DraftAppl


