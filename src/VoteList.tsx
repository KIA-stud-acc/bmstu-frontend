import { useState, useEffect, FC } from 'react'
import './VoteList.css'
import {Breadcrumb} from 'react-bootstrap'
import InputField from './components/InputField'
import VotingCard from './components/VotingCard'

import { Voting, searchInVoteList } from './modules/search-in-vote-list.ts'
import {setNameSQAction, useNameSearchQuery} from "./slices/dataSlice";
import {useDispatch} from "react-redux";




const VoteList: FC = () => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState(useNameSearchQuery())
  const [voting, setVote] = useState<Voting[]>([])
  const searchQuery = useNameSearchQuery()
 


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
      <Breadcrumb.Item href="/bmstu-frontend/">Главная</Breadcrumb.Item>
      <Breadcrumb.Item active>Каталог</Breadcrumb.Item>
    </Breadcrumb>
      <InputField
                error ={false}
                value={searchValue}
                searchvalue={searchQuery}
                setValue={(value) => setSearchValue(value)}
                onEnter={(searchvalue) => dispatch(setNameSQAction(searchvalue))}
                placeHolder="Поиск"
            />
        <br/>
        <div className="card-deck">
              {voting.map((item)=> (
                      VotingCard(item.id, item.name, item.image_src)
              ))}
        </div>
    </>
  )
}

export default VoteList



