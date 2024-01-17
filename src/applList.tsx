import { useEffect, useState } from 'react'
import './applList.css'
import { useParams } from 'react-router-dom';
import {Breadcrumb, Button, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appl, applications } from './modules/applications';
import { delDateFromAction, delDateToAction, delStatusAction, setDateFromAction, setDateToAction, setStatusAction, useVotingDateFromSearchQuery, useVotingDateToSearchQuery, useVotingStatusSearchQuery } from './slices/dataSlice';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function ApplList() {
    const dispatch = useDispatch()
    let dateFrom = useVotingDateFromSearchQuery()
    let dateTo = useVotingDateToSearchQuery()
    const [inputType, setInputType] = useState("text");
    const [inputTypeF, setInputTypeF] = useState("text");
    const [application, setApplications] = useState<appl[]>([])
    const [searchStatusValue, setSearchStatusValue] = useState(useVotingStatusSearchQuery())
    const [searchDateFromValue, setSearchDateFromValue] = useState(useVotingDateFromSearchQuery())
    const [searchDateToValue, setSearchDateToValue] = useState(useVotingDateToSearchQuery())
    const handleSearch = async () =>{
        const response = await applications(searchStatusValue, searchDateFromValue, searchDateToValue)
        await setApplications(response)
    }
    useEffect(() => {
      handleSearch();
      }, [searchStatusValue, searchDateFromValue, searchDateToValue]);

      function statusHandler(value: string){
        setSearchStatusValue(value);
        dispatch(setStatusAction(value));
        }
    function dateFromHandler(value: string){
        if (value==''){
            dispatch(delDateFromAction());
            setSearchDateFromValue('0001-01-01');
        }
        else{
            dispatch(setDateFromAction(value));
            setSearchDateFromValue(value);
        }
        
        }
    function dateToHandler(value: string){
        if (value==''){
            dispatch(delDateToAction());
            setSearchDateToValue('9999-12-01');
        }
        else{
            dispatch(setDateToAction(value));
            setSearchDateToValue(value);
        }
        
        }
    function clearHandler(){
        setSearchStatusValue('');
        dispatch(delStatusAction());
        dispatch(delDateToAction());
        setSearchDateToValue('9999-12-01');
        dispatch(delDateFromAction());
        setSearchDateFromValue('0001-01-01');
    }
  return ( 
    <>
    <Breadcrumb>
        <Breadcrumb.Item><Link to="#home">Главная</Link></Breadcrumb.Item>
        <Breadcrumb.Item active>
        Голосования
        </Breadcrumb.Item>
    </Breadcrumb>
    <div className="filters">
    <DropdownButton id="dropdown-basic-button status" title={useVotingStatusSearchQuery()}>
      <Dropdown.Item onClick={()=>statusHandler("сформирован")}>Сформирован</Dropdown.Item>
      <Dropdown.Item onClick={()=>statusHandler("отклонён")}>Отклонён</Dropdown.Item>
      <Dropdown.Item onClick={()=>statusHandler("завершён")}>Завершён</Dropdown.Item>
    </DropdownButton>
    
                <div className="dateFrom">
                <Form>
                {(useVotingDateFromSearchQuery()!='0001-01-01')?
                    <Form.Control
                    type={inputTypeF}
                    placeholder="После"
                    onFocus={() => setInputTypeF("date")}
                    onBlur={() => setInputTypeF("text")}
                    onChange={(e) => dateFromHandler(e.target.value)}
                    defaultValue={dateFrom}
                    />:
                    <Form.Control
                    value=''
                    type={inputTypeF}
                    placeholder="После"
                    onFocus={() => setInputTypeF("date")}
                    onBlur={() => setInputTypeF("text")}
                    onChange={(e) => dateFromHandler(e.target.value)}
                    />}
                </Form>
                </div>
                <div className="dateTo">
                <Form>
                {(useVotingDateToSearchQuery()!='9999-12-01')?
                    <Form.Control
                    type={inputType}
                    placeholder="До"
                    onFocus={() => setInputType("date")}
                    onBlur={() => setInputType("text")}
                    onChange={(e) => dateToHandler(e.target.value)}
                    defaultValue={dateTo}
                    />:
                    <Form.Control
                    value=''
                    type={inputType}
                    placeholder="До"
                    onFocus={() => setInputType("date")}
                    onBlur={() => setInputType("text")}
                    onChange={(e) => dateToHandler(e.target.value)}
                    />}
                </Form>
                </div>
                <Button onClick={()=>clearHandler()} className='clear'>Сбросить фильтры</Button>
        </div>
    <Table responsive="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Статус</th>
            <th>Создатель</th>
            <th>Дата создания</th>
            <th>Дата формирования</th>
            <th>Дата завершения</th>
            <th>Описание</th>
            <th>Кол-во голосов</th>
          </tr>
        </thead>
        <tbody>
        {application.map((item)=> (
                      <><tr> 
                        <td>{item.id}</td>
                        <td>{item.status}</td>
                        <td>{item.creator.username}</td>
                        <td>{item.date_of_creation}</td>
                        <td>{item.date_of_formation}</td>
                        <td>{item.date_of_completion}</td>
                        <td>{item.description}</td>
                        <td>{item.QuantityOfVotes}</td>
                      </tr></>
              ))}
          </tbody>
      </Table>
    </>
  )
}

export default ApplList


