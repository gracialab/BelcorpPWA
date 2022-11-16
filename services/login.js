import axios from 'axios'
import { environment } from '../environments/environment'

export const loginService = () => {

  const login = async (data) => {
    const response = await axios.post(`${environment.url_api}appAuth`, data)
    if (response.status === 200) {
      return response.data
    } else {
      return null
    }
  }

  return {
    login
  }
}