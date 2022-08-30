import { useRouter } from 'next/router'
import { useState } from 'react'
import { questionsService } from '../../services/questions'

export const questionsProvider = () => {
  const router = useRouter()
  const { sendForm } = questionsService()
  const [questions, setQuestions] = useState({})

  const submit = async (event) => {
    event.preventDefault()
    if (Object.keys(questions).length === 3) {
      const token = sessionStorage.getItem('token')
      sessionStorage.setItem('questions', questions)
      const response = await sendForm({ formCollection: questions }, token)
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
    setQuestions({...questions,[name]: value})
  }



  return {
    submit,
    router,
    questions,
    setQuestions,
    updateForm,
    closeModal
  }
}