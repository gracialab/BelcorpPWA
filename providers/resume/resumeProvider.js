import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/resume.module.css'

export const resumeProvider = () => {
  const router = useRouter()
  const [photo1, setPhoto1] = useState()
  const [photo2, setPhoto2] = useState()
  const [photo3, setPhoto3] = useState()

  useEffect(() => {
    const photo1Base = sessionStorage.getItem('photo1')
    const photo2Base = sessionStorage.getItem('photo2')
    const photo3Base = sessionStorage.getItem('photo3')
    setPhoto1(<Image unoptimized src={photo1Base} width={40} height={40} className={styles.photo} />)
    setPhoto2(<Image unoptimized src={photo2Base} width={40} height={40} className={styles.photo} />)
    setPhoto3(<Image unoptimized src={photo3Base} width={40} height={40} className={styles.photo} />)
  }, [])

  const submit = (event) => {
    event.preventDefault()
    if (event.target.policy.checked) {
      router.push('endPage')
    } else {
      alert('Por favor acepta los términos y condiciones')
    }
  }

  return {
    submit,
    photo1,
    photo2,
    photo3,
    router,
  }
}