import { SetStateAction, useEffect, useReducer, useState } from 'react'
import './draftAppl.css'
import { useNavigate, useParams } from 'react-router-dom';
import {Breadcrumb, Button, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { applVote, application } from './modules/applications';
import { chDraftExistAction, delDateFromAction, delDateToAction, delStatusAction, setDateFromAction, setDateToAction, setStatusAction, useDraftExist, useVotingDateFromSearchQuery, useVotingDateToSearchQuery, useVotingStatusSearchQuery } from './slices/dataSlice';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import Cookies from 'js-cookie';
import Voting from './Voting';
import InputField from './components/InputField';
import React from 'react';

function DraftAppl() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch()
    const [descrip, setDescrip] = useState('')


    const [percents, setPercents] = useState(new Map());

    const [applic, setApplication] = useState<applVote>({Application:{id:0, creator:null, moderator:null, status:'',
    date_of_creation:null, date_of_formation:null, date_of_completion:null, description:undefined, QuantityOfVotes:null}, Voting:[]})

    const getAppl = async () =>{
        const response = await application(id)
        if (response.Voting.length == 0){
            Cookies.remove("draft_exist")
            dispatch(chDraftExistAction(false))
            navigate("/bmstu-frontend/vybory");
        }

        setDescrip(response.Application.description || "")
        response.Voting.map((item)=>setPercents(new Map(percents.set(item.id,{value:item.percentage,error:false}))))
        await setApplication(response)
    }
    useEffect(() => {
        getAppl();
        }, []);
    
    
    
    const delFromApplHandler = async (Appl:string, Serv:string) =>{
        await axios.delete(`../../api/applications/${Appl}/${Serv}/`)
        getAppl();
        
    }
    const formAppl = async () =>{
        await axios.put(`../../api/applications/form`)
        Cookies.remove("draft_exist")
        dispatch(chDraftExistAction(false))
        navigate("/bmstu-frontend/vybory");
        
    }

    function isInteger(value:string) {
        if(parseInt(value,10).toString()===value) {
          return true
        }
        return false;
      }

    const updateDescription = async (value:string, id:string) =>{
        await axios.put(`../../api/applications/${id}/`,{
            description:value
        })
    }
    const updatePercents = async (idAppl:string, idServ:string, value:string) =>{
        if (isInteger(value)){
            if (Number(value)>=0 && Number(value)<100){
                await axios.put(`../../api/applications/${idAppl}/${idServ}/`,{
                    percent:Number(value)
                })
            }
            else{
                setPercents(new Map(percents.set(Number(idServ),{value:value,error:true})))
            }
        }
        else{
            setPercents(new Map(percents.set(Number(idServ),{value:value,error:true})))}
            
        console.log(percents)
        }
        
    


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
        <div className="descr">
        {id=="current"?<InputField
                                
                                value={descrip}
                                searchvalue={descrip}
                                setValue={(value) => setDescrip(value)}
                                onEnter={(value) => updateDescription(value, applic.Application.id+'')}
                                placeHolder="Описание голосования"
                            />:<div className='field description'>Описание голосования: {applic.Application.description || "-"}</div>}
        
        <Table className='table' responsive="sm">
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
            <td onClick={()=>navigate(`/bmstu-frontend/vybory/${item.id}`)}>{item.status}</td>
            <td onClick={()=>navigate(`/bmstu-frontend/vybory/${item.id}`)}>{item.name}</td>
            <td onClick={()=>navigate(`/bmstu-frontend/vybory/${item.id}`)}>{item.type}</td>
            {id=="current"?<td><InputField
                                error={percents.get(item.id).error}
                                value={percents.get(item.id).value}
                                searchvalue={''}
                                setValue={(value) => setPercents(new Map(percents.set(item.id,{value:value,error:false})))}
                                onEnter={(value) => updatePercents(applic.Application.id+'', item.id+'', value)}
                                placeHolder=""
                            /></td>:
                        <td>{item.percentage}</td>
                        }
                         {(id=="current")&&<td><Button onClick={()=>delFromApplHandler(applic.Application.id+'', item.id+'')} className='delFromAppl'>Удалить из голосования</Button></td>}
                      </tr></>
              ))}
          </tbody>
      </Table>


        </div>
        {(id=="current")&&<Button className='form' onClick={()=>formAppl()}>Сформировать</Button>}
        </div>
    
    </>
  )
}

export default DraftAppl


