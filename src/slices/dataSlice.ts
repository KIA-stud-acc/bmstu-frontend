import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const dataSlice = createSlice({
    name: "data",
    initialState: {
        Data: 
            {
                "isLogged":false,
                "nameSearchQuery":'',
                "votingDateToSearchQuery":"9999-12-01",
                "votingDateFromSearchQuery":"0001-01-01",
                "votingStatusSearchQuery":null
            }
        
    },
    reducers: {
        setDateTo(state, {payload}) {  // изменяем состояние на полученные данные
            state.Data.votingDateToSearchQuery = payload
        },
        setDateFrom(state, {payload}) {  // изменяем состояние на полученные данные
            state.Data.votingDateFromSearchQuery = payload
        },
        setStatus(state, {payload}) {  // изменяем состояние на полученные данные
            state.Data.votingStatusSearchQuery = payload
        },
        setNameSQ(state, {payload}) {  // изменяем состояние на полученные данные
            state.Data.nameSearchQuery = payload
        },
        chLog(state) {  // суммируем цены выбранных товаров
            state.Data.isLogged = state.Data.isLogged != true
        },
        delDateTo(state) {  // изменяем состояние на полученные данные
            state.Data.votingDateToSearchQuery = '9999-12-01'
        },
        delDateFrom(state) {  // изменяем состояние на полученные данные
            state.Data.votingDateFromSearchQuery = '0001-01-01'
        },
        delStatus(state) {  // изменяем состояние на полученные данные
            state.Data.votingStatusSearchQuery = null
        },
        delNameSQ(state) {  // изменяем состояние на полученные данные
            state.Data.nameSearchQuery = ''
        },
    }
})

export const useData = () =>
    useSelector((state:any) => state.ourData.Data)

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