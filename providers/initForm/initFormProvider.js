import { useRouter } from 'next/router'
import React, { useState } from 'react'

export const initFormProvider = () => {
  const router = useRouter()
  const [modal, setModal] = useState()

  const submit = async (event) => {
    event.preventDefault()
    if (event.target.name.value) {
      navigator.getUserMedia({ video: true }, function (localMediaStream) {
        sessionStorage.setItem('product', event.target.name.value)
        router.push('photos')
      },
        function (err) {
          setModal(true)
        }
      )
    } else {
      alert('Ingresa el nombre del producto')
    }
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