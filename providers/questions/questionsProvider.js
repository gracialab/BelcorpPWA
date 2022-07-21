import { useRouter } from 'next/router'

export const questionsProvider = () => {
  const router = useRouter()

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
      sessionStorage.setItem('questions', questions)
      router.push('resume')
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