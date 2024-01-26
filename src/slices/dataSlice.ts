import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";





const dataSlice = createSlice({
    name: "data",
    initialState: {
        currentPage:0,
        isLogged:false,
        isModer:false,
        basket:false,
        username:'',
        usernameSearchQuery:'',
        nameSearchQuery:'',
        nameSearchQueryModer:'',
        votingDateToSearchQuery:"9999-12-01",
        votingDateFromSearchQuery:"0001-01-01",
        votingStatusSearchQuery:'Статус',
        
    },
    reducers: {
        setCurrentPage(state, {payload}) {  
            state.currentPage = payload
        },
        setUsernameSearchQuery(state, {payload}) {  
            state.usernameSearchQuery = payload
        },
        setUsername(state, {payload}) {  
            state.username = payload
        },
        setDateTo(state, {payload}) {  
            state.votingDateToSearchQuery = payload
        },
        setDateFrom(state, {payload}) {  
            state.votingDateFromSearchQuery = payload
        },
        setStatus(state, {payload}) {  
            state.votingStatusSearchQuery = payload
        },
        setNameSQ(state, {payload}) {  
            state.nameSearchQuery = payload
        },
        setNameSQModer(state, {payload}) {  
            state.nameSearchQueryModer = payload
        },
        chLog(state, {payload}) {  
            state.isLogged = payload
        },
        chModer(state, {payload}) {  
            state.isModer = payload
        },
        chBasket(state, {payload}) {  
            state.basket = payload
        },
        delDateTo(state) {  
            state.votingDateToSearchQuery = '9999-12-01'
        },
        delDateFrom(state) { 
            state.votingDateFromSearchQuery = '0001-01-01'
        },
        delStatus(state) {  
            state.votingStatusSearchQuery = 'Статус'
        },
        delNameSQ(state) {  
            state.nameSearchQuery = ''
        },
    }
})

export const useCurrentPage = () =>
    useSelector((state:any) => state.ourData.currentPage)

export const useIsLogged = () =>
    useSelector((state:any) => state.ourData.isLogged)

export const useBasket = () =>
    useSelector((state:any) => state.ourData.basket)

export const useIsModer = () =>
    useSelector((state:any) => state.ourData.isModer)

export const useNameSearchQuery = () =>
    useSelector((state:any) => state.ourData.nameSearchQuery)

export const useNameSearchQueryModer = () =>
    useSelector((state:any) => state.ourData.nameSearchQueryModer)

export const useUsernameSearchQuery = () =>
    useSelector((state:any) => state.ourData.usernameSearchQuery)


export const useVotingDateToSearchQuery = () =>
    useSelector((state:any) => state.ourData.votingDateToSearchQuery)

export const useVotingDateFromSearchQuery = () =>
    useSelector((state:any) => state.ourData.votingDateFromSearchQuery)

export const useVotingStatusSearchQuery = () =>
    useSelector((state:any) => state.ourData.votingStatusSearchQuery)

export const useUsername = () =>
    useSelector((state:any) => state.ourData.username)




export const {
    setDateTo: setDateToAction,
    setDateFrom: setDateFromAction,
    setStatus: setStatusAction,
    setNameSQ: setNameSQAction,
    chLog: chLogAction,
    delDateTo: delDateToAction,
    delDateFrom: delDateFromAction,
    delStatus: delStatusAction,
    delNameSQ: delNameSQAction,
    setUsername: setUsernameAction,
    chBasket: chBasketAction,
    chModer: chModerAction,
    setUsernameSearchQuery: setUsernameSQAction,
    setNameSQModer: setNameSQModerAction,
    setCurrentPage: setCurrentPageAction,
} = dataSlice.actions


export default dataSlice.reducer