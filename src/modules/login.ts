import axios from 'axios'


export interface res {
    status:string
}

export const login = async (username:string, password:string): Promise<res> =>{
    return axios.post('../../api/login', {
        username: username,
        password: password
      })
        .then((resp) => resp.data)
}