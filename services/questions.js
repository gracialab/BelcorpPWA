import axios from 'axios'
import { environment } from '../environments/environment'

export const questionsService = () => {

  const sendForm = async (data, token) => {
    const response = await axios.post(`${environment.url_api}formApplicationBelcorpV1`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 200) {
      return response.data
    } else {
      return null
    }
  }

  return {
    sendForm
  }
}