import { useState } from 'react'
import { useRouter } from 'next/router'
import { questionsService } from '../../services/questions'

export const questionsProvider = () => {
  const router = useRouter()
  const { sendForm } = questionsService()
  const [questions, setQuestions] = useState({})

  const submit = async (event) => {
    event.preventDefault()
    const photo1Base = sessionStorage.getItem('photo1')
    const photo2Base = sessionStorage.getItem('photo2')
    const photo3Base = sessionStorage.getItem('photo3')
    if (Object.keys(questions).length === 3) {
      const token = sessionStorage.getItem('token')
      sessionStorage.setItem('questions', questions)
      const response = await sendForm(
        {
          formCollection: questions,
          images: {
            front: photo1Base,
            right: photo2Base,
            left: photo3Base
          }
        },
        token
      )
      if (response.user_ultimate._id) {
        router.push('resume')
      } else {
        alert('Ocurrió un error, por favor intenta nuevamente')
      }
    } else {
      alert('Por favor contesta todas las preguntas')
    }
  }

  const closeModal = () => {
    setModal(false)
  }

  const updateForm = (payload) => {
    const { name, value } = payload;
    setQuestions({ ...questions, [name]: value })
  }

  return {
    submit,
    router,
    updateForm,
    closeModal,
    setQuestions,
  }
}