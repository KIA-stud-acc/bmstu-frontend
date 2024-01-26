import { useState, useEffect, FC } from 'react'
import './VoteList.css'
import {Breadcrumb} from 'react-bootstrap'
import InputField from './components/InputField'
import VotingCard from './components/VotingCard'

import { Voting, searchInVoteList } from './modules/search-in-vote-list.ts'
import {setCurrentPageAction, setNameSQAction, useCurrentPage, useNameSearchQuery} from "./slices/dataSlice";
import {useDispatch} from "react-redux";
import ReactPaginate from 'react-paginate';

const VoteList: FC = () => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState(useNameSearchQuery())
  const [voting, setVote] = useState<Voting[]>([])
  const searchQuery = useNameSearchQuery()
  const [page,setPage] = useState(useCurrentPage())
  const [cPage, setCPage] = useState(useCurrentPage());
  const [countOfPages, setCountOfPages] = useState(0)
 


  const handleSearch = async () =>{
    const response = await searchInVoteList(searchValue, cPage+1)
    await setVote(response.voting)
    await setCountOfPages(response.pages)
    
}

const handlePageClick = ( selected:number ) => {
  setCPage(selected)
setPage(selected);
dispatch(setCurrentPageAction(selected))
}

useEffect(() => {
  handleSearch();
  }, [searchQuery, page]);
  
  const handleEnter = ( selected:string ) => {
    dispatch(setCurrentPageAction(0))
    setCPage(0)
    dispatch(setNameSQAction(selected))
    }


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
                onEnter={(searchvalue) => handleEnter(searchvalue)}
                placeHolder="Поиск"
            />
        <br/>
        <div className="card-deck">
              {voting.map((item)=> (
                      VotingCard(item.id, item.name, item.image_src)
              ))}
        </div>
        <ReactPaginate
        forcePage={cPage}
        pageCount={countOfPages}
        onPageChange={(event) => handlePageClick(event.selected)}
        containerClassName={"pagination"}
  pageClassName={"page-item"}
  activeClassName={"active1"}
  breakLabel="..."
  previousLabel={''}
  nextLabel={''}
      />
    </>
  )
}

export default VoteList



