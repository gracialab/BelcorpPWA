import { useRouter } from 'next/router'
import { loginService } from '../../services/login'

export const loginProvider = () => {
  const router = useRouter()
  const { login } = loginService()

  const submit = async (event) => {
    event.preventDefault()
    if (event.target.email.value && event.target.cellPhone.value) {
      if (event.target.cellPhone.value.length === 10) {
        const data = {
          email: event.target.email.value,
          phone: event.target.cellPhone.value,
          generateCode: true,
          platform: "Skinmap"
        }
        const response = await login(data)
        if (response.idUser) {
          alert(`Tu código de verificación es ${response.random}`)
          sessionStorage.setItem('email', event.target.email.value)
          sessionStorage.setItem('cellPhone', event.target.cellPhone.value)
          sessionStorage.setItem('userInfo', JSON.stringify(response))
          router.push('codeVerification')
        }
      } else {
        alert('El celular debe contener 10 dígitos')
      }
    } else {
      alert('Por favor completa todos los campos')
    }
  }

  return {
    submit
  }
}