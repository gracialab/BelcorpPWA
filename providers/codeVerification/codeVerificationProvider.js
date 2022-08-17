import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { loginService } from '../../services/login'
import { codeVerificationService } from '../../services/codeVerification'

export const codeVerificationProvider = () => {
  const router = useRouter()
  const [code, setCode] = useState()
  const [seconds, setSeconds] = useState(45)
  const [userData, setUserData] = useState()

  const { login } = loginService()
  const { validateCode } = codeVerificationService()

  useEffect(() => {
    setUserData(JSON.parse(sessionStorage.getItem('userInfo')))
    const start = setTimeout(() => {
      setSeconds(seconds - 1)
    }, 1000)
    seconds === 0 ? clearTimeout(start) : null
  }, [seconds])


  const onChange = (event) => {
    setCode(event)
  }

  const submit = async (event) => {
    event.preventDefault()
    if (code && code.length === 4) {
      const data = {
        code: code,
        generateCode: false,
        _id: userData.idUser,
      }
      const response = await validateCode(data)
      if (response.token) {
        sessionStorage.setItem('token', response.token)
        router.push('initForm')
      } else {
        alert('El código ingresado no coincide')
      }
    } else {
      alert('Por favor ingresa el código')
    }
  }

  const sendCode = async () => {
    if (seconds < 1) {
      setSeconds(45)
      const email = sessionStorage.getItem('email')
      const cellPhone = sessionStorage.getItem('cellPhone')
      const data = {
        email: email,
        phone: cellPhone,
        generateCode: true,
        platform: "Skinmap"
      }
      const response = await login(data)
      if (response.idUser) {
        alert(`Tu código de verificación es ${response.random}`)
      }
    }
  }

  return {
    submit,
    router,
    seconds,
    onChange,
    sendCode,
  }
}