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
    return fetch(`../api/vybory/${id}/`)
        .then((response) => response.json())
        .catch(()=> (filterVotingDataById(mockVoteList['voting'], Number(id))))
}
