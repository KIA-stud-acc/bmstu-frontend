import axios from 'axios'


export interface RegData {
    username: string
    email: string
    phone: string
    password: string
}

export const registr = async (username:string, email='', phone='', password:string): Promise<RegData> =>{
    return axios.post('../../api/user/', {
        username: username,
        email: email,
        password: password,
        phone: phone
      })
        .then((resp) => resp.data)
}