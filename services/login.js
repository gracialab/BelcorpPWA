import axios from 'axios'
import { environment } from '../environments/environment'

export const loginService = () => {

  const login = async (data) => {
    const response = await axios.post(`${environment.url_api}authApplicationBelcorp`, data, {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type"
      }
    })
    return response
  }

  return {
    login
  }
}