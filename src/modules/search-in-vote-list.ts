import axios from "axios"
import {mockVoteList} from "../model"



export interface Voting {
    id: number
    name: string
    type: string
    status: string
    image_src: string
}

export interface VoteList {
    pages: number
    voting: Voting[]
}

const filterVotingData = (votingArray: Voting[], nameFilter: string): Voting[] => {
    return votingArray.filter(voting => voting.name.toLowerCase().includes(nameFilter.toLowerCase()));
};


export const searchInVoteList = async (text='', page=1): Promise<VoteList> =>{
    return axios.get(`../../api/vybory/?text=${text}&page=${page}`)
        .then((response) => response.data)
        .catch(()=> ({voting:filterVotingData(mockVoteList['voting'], text),pages:1}))
}