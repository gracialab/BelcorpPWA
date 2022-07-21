import { useRouter } from 'next/router'

export const loginProvider = () => {
  const router = useRouter()

  const submit = (event) => {
    event.preventDefault()
    if (event.target.email.value && event.target.cellPhone.value) {
      if (event.target.cellPhone.value.length === 10) {
        sessionStorage.setItem('email', event.target.email.value)
        sessionStorage.setItem('cellPhone', event.target.cellPhone.value)
        router.push('codeVerification')
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