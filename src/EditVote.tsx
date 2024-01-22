import { ChangeEvent, useEffect, useState } from 'react'
import './EditVote.css'
import { useNavigate, useParams } from 'react-router-dom';
import {Breadcrumb, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';
import InputField from './components/InputField';
import { useDispatch } from 'react-redux';
import { chBasketAction, useIsLogged } from './slices/dataSlice';
import { Voting, voteById } from './modules/vote-by-id';

function EditVote() {
    const navigate = useNavigate();
    const [errorImg, setErrorImg] = useState(false)
    const [error, setError] = useState(false)
    const { id } = useParams<{ id: string }>();
    const [type, setType] = useState('')
    const isLogged = useIsLogged()
    const dispatch = useDispatch()
    const [name, setName] = useState('');


    const [voting, setVote] = useState<Voting>({id: 0, name: '', type: '', status: '', image_src: ''})

    const [file, setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
      }
    };

    const fetchVote = async () =>{
        const response = await voteById(id)
        setVote(response)
        return response
    }
    useEffect(()=>{
        if (id!="create"){
            const res = async()=>{ 
                const res = await fetchVote()
                setName(res.name)
                setType(res.type)
            }
            res()
        }
    },[dispatch]);
    
    
    
    
    const delServHandler = async (Serv:number) =>{
        await axios.delete(`../../../api/vybory/${Serv}/`) 
        navigate("/bmstu-frontend/moder/vybory");
    }
    const chServ = async (idServ:number) =>{
        if (name && type) {
            
            setError(false);
            if(file){
        
        
            if ((file.type).includes("image")){
                await axios.put(`../../../api/vybory/${idServ}/`, {
                    name:name,
                    type:type
            })
                setErrorImg(false);
                let formData = new FormData();
                formData.append('image', file)
                await axios.post(`../../../api/vybory/${idServ}/`, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                })
                fetchVote();
        }
        else{
            setErrorImg(true);
        }
    }else{
        await axios.put(`../../../api/vybory/${idServ}/`, {
            name:name,
            type:type
    })
    }
        
    } else{
        setError(true);
        if(file){
            if (!(file.type).includes("image")){
                setErrorImg(true);
            }
        else{
            setErrorImg(false);
        }}else{
            setErrorImg(false);
        }
    }
}
    const createServ = async () =>{
        if (name && type) {
            
            setError(false);
            if(file){
        
        
            if ((file.type).includes("image")){
                const idServ = await axios.post(`../../../api/vybory/`, {
                    name:name,
                    type:type
            }).then(response=>response.data.id)
                setErrorImg(false);
                let formData = new FormData();
                formData.append('image', file)
                await axios.post(`../../../api/vybory/${idServ}/`, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                })
                navigate("/bmstu-frontend/moder/vybory");
        }
        else{
            setErrorImg(true);
        }
    }else{
        await axios.post(`../../../api/vybory/`, {
            name:name,
            type:type
    })
    navigate("/bmstu-frontend/moder/vybory");
    }
        
    } else{
        setError(true);
        if(file){
            if (!(file.type).includes("image")){
                setErrorImg(true);
            }
        else{
            setErrorImg(false);
        }}else{
            setErrorImg(false);
        }
    }
    }
        
        
    


  return ( 
    <>
    <Breadcrumb>
        <Breadcrumb.Item><Link to="#home">Главная</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/bmstu-frontend/moder/vybory">Редактирование названий</Link></Breadcrumb.Item>
        <Breadcrumb.Item active>
        {(id=="create")?"Создание":id}
        </Breadcrumb.Item>
    </Breadcrumb>
    <div className="page">
    <div className='voteFields'>
        {Boolean(voting.id) && <div className='field id'>id: {voting.id}</div>}
        <div className='field name'>Название: <InputField
                                error={false}
                                value={name}
                                searchvalue={name}
                                setValue={(value) => setName(value)}
                                onEnter={(value) => setName(value)}
                                placeHolder="введите название"
                            /></div>
        <div className='field type'>Тип объекта: <InputField
                                error={false}
                                value={type}
                                searchvalue={type}
                                setValue={(value) => setType(value)}
                                onEnter={(value) => setType(value)}
                                placeHolder="введите тип объекта"
                            /></div>
        {Boolean(voting.id) && <div className='field'>Логотип: {voting.image_src?<img className="image" src={voting.image_src}></img>: "логотип не выбран"}</div>}
        <div className='chImage'><div className='field'>{Boolean(voting.id) ? 'Новый логотип:':"Логотип:"}<input className='form-control' type="file" onChange={handleFileChange} /></div></div>
        </div>
        {(id=="create")?<Button className='form1' onClick={()=>createServ()}>Создать</Button>:(voting.status != "удалён")&&<><Button className='form1' onClick={()=>chServ(voting.id)}>Сохранить изменения</Button><Button className='form1 del' onClick={()=>delServHandler(voting.id)}>Удалить</Button></>}
        {error && <div className="error-message1">*Имя и тип не могут быть пустыми</div>}
        {errorImg && <div className="error-message1">*Тип файла не подходит</div>}
        </div>
    
    </>
  )
}

export default EditVote


