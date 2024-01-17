import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

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