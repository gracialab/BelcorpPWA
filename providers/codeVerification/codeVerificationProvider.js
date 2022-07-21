import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

export const codeVerificationProvider = () => {
  const router = useRouter()
  const [code, setCode] = useState()
  const [seconds, setSeconds] = useState(45)

  useEffect(() => {
    const start = setTimeout(() => {
      setSeconds(seconds - 1)
    }, 1000)
    seconds === 0 ? clearTimeout(start) : null
  }, [seconds])
  

  const onChange = (event) => {
    setCode(event)
  }

  const submit = (event) => {
    event.preventDefault()
    if (code && code.length === 4) {
      router.push('initForm')
    } else {
      alert('Por favor ingresa el código')
    }
  }

  const sendCode = () => {
    setSeconds(45)
  }

  return {
    submit,
    router,
    seconds,
    onChange,
    sendCode,
  }
}