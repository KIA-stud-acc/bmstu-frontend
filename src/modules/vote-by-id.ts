import axios from "axios"
import {mockVoteList} from "../model"



export interface Voting {
    id: number
    name: string
    type: string
    status: string
    image_src: string
}


const filterVotingDataById = (votingArray: Voting[], idFilter: number): Voting | undefined => {
    return votingArray.find(voting => voting.id === idFilter);
};


export const voteById = async (id = ''): Promise<Voting> =>{
    return axios.get(`../../api/vybory/${id}/`)
        .then((response) => response.data)
        .catch(()=> (filterVotingDataById(mockVoteList['voting'], Number(id))))
}