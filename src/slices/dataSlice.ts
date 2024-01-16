import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const dataSlice = createSlice({
    name: "data",
    initialState: {
        isLogged:false,
        nameSearchQuery:'',
        votingDateToSearchQuery:"9999-12-01",
        votingDateFromSearchQuery:"0001-01-01",
        votingStatusSearchQuery:null,
        
    },
    reducers: {
        setDateTo(state, {payload}) {  // изменяем состояние на полученные данные
            state.votingDateToSearchQuery = payload
        },
        setDateFrom(state, {payload}) {  // изменяем состояние на полученные данные
            state.votingDateFromSearchQuery = payload
        },
        setStatus(state, {payload}) {  // изменяем состояние на полученные данные
            state.votingStatusSearchQuery = payload
        },
        setNameSQ(state, {payload}) {  // изменяем состояние на полученные данные
            state.nameSearchQuery = payload
        },
        chLog(state) {  // суммируем цены выбранных товаров
            state.isLogged = state.isLogged != true
        },
        delDateTo(state) {  // изменяем состояние на полученные данные
            state.votingDateToSearchQuery = '9999-12-01'
        },
        delDateFrom(state) {  // изменяем состояние на полученные данные
            state.votingDateFromSearchQuery = '0001-01-01'
        },
        delStatus(state) {  // изменяем состояние на полученные данные
            state.votingStatusSearchQuery = null
        },
        delNameSQ(state) {  // изменяем состояние на полученные данные
            state.nameSearchQuery = ''
        },
    }
})

export const useIsLogged = () =>
    useSelector((state:any) => state.ourData.isLogged)

export const useNameSearchQuery = () =>
    useSelector((state:any) => state.ourData.nameSearchQuery)

export const useVotingDateToSearchQuery = () =>
    useSelector((state:any) => state.ourData.votingDateToSearchQuery)

export const useVotingDateFromSearchQuery = () =>
    useSelector((state:any) => state.ourData.votingDateFromSearchQuery)

export const useVotingStatusSearchQuery = () =>
    useSelector((state:any) => state.ourData.votingStatusSearchQuery)

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
} = dataSlice.actions


export default dataSlice.reducer