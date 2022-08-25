import { useRouter } from 'next/router'
import React, { useState } from 'react'

export const initFormProvider = () => {
  const router = useRouter()
  const [modal, setModal] = useState()

  const submit = async (event) => {
    event.preventDefault()
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        router.push('photos')
      })
      .catch(err => {
        console.error('Hubo un error:', err)
      })
  }

  const closeModal = () => {
    setModal(false)
  }

  return {
    modal,
    submit,
    router,
    closeModal
  }
}