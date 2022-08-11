import axios from 'axios'
import { environment } from '../environments/environment'

export const loginService = () => {

  const login = async (data) => {
    const response = await axios.post(`${environment.url_api}authApplicationDrops`, data, {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "https://www.example.com",
        "Access-Control-Allow-Methods": "POST,GET"
      }
    })
    console.log(response)
  }

  return {
    login
  }
}