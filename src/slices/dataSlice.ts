import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";





const dataSlice = createSlice({
    name: "data",
    initialState: {
        isLogged:false,
        basket:false,
        username:'',
        nameSearchQuery:'',
        votingDateToSearchQuery:"9999-12-01",
        votingDateFromSearchQuery:"0001-01-01",
        votingStatusSearchQuery:'Статус',
        
    },
    reducers: {
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
        chLog(state, {payload}) {  
            state.isLogged = payload
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

export const useIsLogged = () =>
    useSelector((state:any) => state.ourData.isLogged)

export const useBasket = () =>
    useSelector((state:any) => state.ourData.basket)


export const useNameSearchQuery = () =>
    useSelector((state:any) => state.ourData.nameSearchQuery)

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
} = dataSlice.actions


export default dataSlice.reducer