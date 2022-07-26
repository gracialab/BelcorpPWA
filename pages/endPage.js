import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import circles from '../assets/circles.png'
import buttonBack from '../assets/buttonBack.png'
import logoCorner from '../assets/logoCorner.png'
import styles from '../styles/endPage.module.css'
import purpleCheck from '../assets/purpleCheck.png'

export default function endPage() {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Head>
        <title>Finalización</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.column} >
        <div className={styles.logo} >
          <Image src={purpleCheck} />
        </div>
        <p className={styles.text} >
          Encuesta finalizada
        </p>
        <button className={styles.button} onClick={() => router.push('/initForm')} >
          <div className={styles.row} >
            <Image src={buttonBack} width={40} />
            <p className={styles.textButton} >
              Volver al inicio
            </p>
          </div>
        </button>
        <div className={styles.logo} >
          <Image src={logoCorner} />
        </div>
      </div>
      <div className={styles.circles} >
        <Image src={circles} />
      </div>
    </div>
  )
}
