import { useEffect, useState } from 'react'
import './draftAppl.css'
import { useNavigate, useParams } from 'react-router-dom';
import {Breadcrumb, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { applVote, application } from './modules/applications';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import InputField from './components/InputField';
import { useDispatch } from 'react-redux';
import { chBasketAction, useIsLogged } from './slices/dataSlice';

function DraftAppl() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [descrip, setDescrip] = useState('')
    const isLogged = useIsLogged()
    const dispatch = useDispatch()
    const [percents, setPercents] = useState(new Map());

    const [applic, setApplication] = useState<applVote>({Application:{id:0, creator:null, moderator:null, status:'',
    date_of_creation:null, date_of_formation:null, date_of_completion:null, description:undefined, QuantityOfVotes:null}, Voting:[]})

    const getAppl = async () =>{
        const response = await application(id)
        if (response.Voting.length == 0){
            navigate("/bmstu-frontend/vybory");
            dispatch(chBasketAction(false));
        }
            
        
        response.Voting.map((item)=>setPercents(new Map(percents.set(item.id,{value:item.percentage,error:false}))))
        await setApplication(response)
        return response.Application.description || ""
    }
    useEffect(() => {
        const res = async()=>{ 
            setDescrip(await getAppl())
        }
        res()
        }, []);
    
    
    
    const delFromApplHandler = async (Serv:string) =>{
        await axios.delete(`../../api/applications/${Serv}/mm`)
        getAppl();
        
    }
    const formAppl = async () =>{
        if (isLogged){
            await axios.put(`../../api/applications/form`)
            dispatch(chBasketAction(false));
            navigate("/bmstu-frontend/vybory");
        }
        else{
            navigate("/bmstu-frontend/auth");
        }
        
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
    const updatePercents = async (idServ:string, value:string) =>{
        if (isInteger(value)){
            if (Number(value)>=0 && Number(value)<=100){
                await axios.put(`../../api/applications/${idServ}/mm`,{
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
    <div className='nonTable'>
        {Boolean(applic.Application.id) && <div className='field id'>id: {applic.Application.id}</div>}
        <div className='field status'>статус: {applic.Application.status?applic.Application.status:'черновик'}</div>
        <div className='field creator'>Создатель: {applic.Application.creator?applic.Application.creator:'Гость'}</div>
        <div className='field date_of_creation'>Дата создания: {applic.Application.date_of_creation? applic.Application.date_of_creation.slice(0,19).replace('T', " "): "-"}</div>
        <div className='field date_of_formation'>Дата формирования: {applic.Application.date_of_formation? applic.Application.date_of_formation.slice(0,19).replace('T', " "): "-"}</div>
        <div className='field date_of_completion'>Дата завершения: {applic.Application.date_of_completion? applic.Application.date_of_completion.slice(0,19).replace('T', " "): "-"}</div>
        <div className="descr">
        {id=="current"?<div className='field description'><InputField
                                error={false}
                                value={descrip}
                                searchvalue={descrip}
                                setValue={(value) => setDescrip(value)}
                                onEnter={(value) => updateDescription(value, applic.Application.id+'')}
                                placeHolder="Описание голосования"
                            /></div>:<div className='field description'>Описание голосования: {applic.Application.description || "-"}</div>}
        </div>
        </div>
        <div className='table1'>
        <Table className='w-100' responsive="sm">
        <thead>
          <tr>
            <th><div className='idField'>ID</div></th>
            <th style={{width:"20%"}}>Название</th>
            <th style={{width:"25%"}}>Тип</th>
            <th>Процент голосов</th>
            {(id=="current")&&<th  style={{width:"28%"}}>Удалить из голосования</th>}
          </tr>
        </thead>
        <tbody>
        {applic.Voting.map((item)=> (
            <><tr> 
            <td><Link className='link' to={`/bmstu-frontend/vybory/${item.id}`}><p className='idField'>{item.id}</p></Link></td>
            <td onClick={()=>navigate(`/bmstu-frontend/vybory/${item.id}`)}>{item.name}</td>
            <td onClick={()=>navigate(`/bmstu-frontend/vybory/${item.id}`)}>{item.type}</td>
            {id=="current"?<td><InputField
                                error={percents.get(item.id).error}
                                value={percents.get(item.id).value}
                                searchvalue={''}
                                setValue={(value) => setPercents(new Map(percents.set(item.id,{value:value,error:false})))}
                                onEnter={(value) => updatePercents(item.id+'', value)}
                                placeHolder=""
                            /></td>:
                        <td>{item.percentage}</td>
                        }
                         {(id=="current")&&<td><Button onClick={()=>delFromApplHandler(item.id+'')} className='delFromAppl'>Удалить из голосования</Button></td>}
                      </tr></>
              ))}
          </tbody>
      </Table>
      </div>

        
        {(id=="current")&&<Button className='form1' onClick={()=>formAppl()}>Сформировать</Button>}
        </div>
    
    </>
  )
}

export default DraftAppl


