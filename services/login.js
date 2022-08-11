import axios from 'axios'
import { environment } from '../environments/environment'

export const loginService = () => {

  const login = (data) => {
    const response = axios.post(`${environment.url_api}authApplicationDrops`, data)
    console.log(response)
  }

  return {
    login
  }
}