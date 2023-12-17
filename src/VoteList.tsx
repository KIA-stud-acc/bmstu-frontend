import { FC, useState, useEffect } from 'react'
import './VoteList.css'
import {Breadcrumb} from 'react-bootstrap'
import InputField from './components/InputField'
import VotingCard from './components/VotingCard'
import { Voting, searchInVoteList } from './modules/search-in-vote-list.ts'



function VoteList() {
  const [searchValue, setSearchValue] = useState('')
  const [voting, setVote] = useState<Voting[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  
  const handleSearch = async () =>{
    const response = await searchInVoteList(searchValue)
    await setVote(response.voting)
}
useEffect(()=>{
  handleSearch();
},[])


useEffect(() => {
  handleSearch();
  }, [searchQuery]);



  return (
    <>
    <Breadcrumb>
      <Breadcrumb.Item href="#home">Главная</Breadcrumb.Item>
      <Breadcrumb.Item active>Каталог</Breadcrumb.Item>
    </Breadcrumb>
      <InputField
                value={searchValue}
                searchvalue={searchQuery}
                setValue={(value) => setSearchValue(value)}
                onEnter={(searchvalue) => setSearchQuery(searchvalue)}
            />
        <br/>
        <div className="card-deck">
              {voting.map((item, index)=> (
                      <VotingCard {...item} />
              ))}
        </div>
    </>
  )
}

export default VoteList



