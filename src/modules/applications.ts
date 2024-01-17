import axios from "axios"

export interface userData {
    id: number
    username: string
    email: string | null
    phone: string | null
}

export interface appl {
    id: number
    creator: userData
    moderator: userData | null
    status: string
    date_of_creation: string
    date_of_formation: string | null
    date_of_completion: string | null
    description: string | null
    QuantityOfVotes: number | null
}



export const applications = async (status='', dateFrom: string, dateTo: string): Promise<appl[]> =>{
    if (status=='Статус'){
        status = '';
    }
    return axios.get(`../api/applications/?status=${status}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then((response) => response.data)
}