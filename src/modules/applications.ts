import axios from "axios"

export interface userData {
    id: number
    username: string
    email: string | null
    phone: string | null
    password: string
    is_staff: boolean
}

export interface appl {
    id: number
    creator: string |null
    moderator: string | null
    status: string
    date_of_creation: string | null
    date_of_formation: string | null
    date_of_completion: string | null
    description: string | undefined
    QuantityOfVotes: number | null
}

export interface Voting {
    id: number
    name: string
    type: string
    status: string
    image_src: string
    percentage: number
}


export interface applVote {
    Application: appl
    Voting: Voting[]
}


export const applications = async (status='', dateFrom: string, dateTo: string): Promise<appl[]> =>{
    if (status=='Статус'){
        status = '';
    }
    return axios.get(`../../api/applications/?status=${status}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        .then((response) => response.data)
}

export const application = async (id='current'): Promise<applVote> =>{
    return axios.get(`../../api/applications/${id}/`)
        .then((response) => response.data)
}
