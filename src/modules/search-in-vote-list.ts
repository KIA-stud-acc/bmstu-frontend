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
    draftID: number
    voting: Voting[]
}

const filterVotingData = (votingArray: Voting[], nameFilter: string): Voting[] => {
    return votingArray.filter(voting => voting.name.toLowerCase().includes(nameFilter.toLowerCase()));
};


export const searchInVoteList = async (text=''): Promise<VoteList> =>{
    return axios.get(`../api/vybory/?text=${text}`)
        .then((response) => response.data)
        .catch(()=> ({voting:filterVotingData(mockVoteList['voting'], text),draftID:0}))
}