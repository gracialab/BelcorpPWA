import { useRouter } from 'next/router'
import { questionsService } from '../../services/questions'

export const questionsProvider = () => {
  const router = useRouter()
  const { sendForm } = questionsService()

  const submit = async (event) => {
    event.preventDefault()
    if (event.target.one.value && event.target.two.value && event.target.three.value && event.target.four.value && event.target.five.value) {
      const questions = {
        one: event.target.one.value,
        two: event.target.two.value,
        three: event.target.three.value,
        four: event.target.four.value,
        five: event.target.five.value,
      }
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

  return {
    submit,
    router,
    closeModal
  }
}