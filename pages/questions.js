import Image from 'next/image'
import circles from '../assets/circles.png'
import dataQuestions from '../public/data.json'
import logoCorner from '../assets/logoCorner.png'
import styles from '../styles/questions.module.css'
import HeaderConfig from '../components/headerConfig'
import { questionsProvider } from '../providers/questions/questionsProvider'
import { FaceOptions } from '../components/FaceOptions'
import { TextArea } from '../components/TextArea'

const { one, two, three} = dataQuestions

export default function questions() {
  const { submit,questions,updateForm } = questionsProvider()

  return (
    <div className={styles.container}>
      <HeaderConfig title={'Preguntas'} />
      <div className={styles.logoCorner} >
        <Image src={logoCorner} />
      </div>
      <form onSubmit={submit} >
        <div className={styles.form} >
          <p className={styles.title} >
          Encuesta final
          </p>
          <FaceOptions
            title={one.title}
            options={one.options}
            onChange={updateForm}
          />

          <TextArea title={two.title} onChange={updateForm}/>
          <TextArea title={three.title} onChange={updateForm}/>
        </div>
        <div className={styles.rigth} >
          <button type='submit' className={styles.button} >
            Siguiente
          </button>
        </div>
      </form>
      <div className={styles.circles} >
        <Image src={circles} />
      </div>
    </div>
  )
}
