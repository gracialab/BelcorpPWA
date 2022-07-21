import Head from 'next/head'
import Image from 'next/image'
import face from '../assets/face.png'
import edit from '../assets/edit.png'
import check from '../assets/check.png'
import styles from '../styles/resume.module.css'
import logoCorner from '../assets/logoCorner.png'
import circles from '../assets/backgroundCircles.png'
import { resumeProvider } from '../providers/resume/resumeProvider'

export default function resume() {
  const { submit, photo1, photo2, photo3, router } = resumeProvider()

  return (
    <div className={styles.container}>
      <Head>
        <title>Resumen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.logo}>
        <Image src={logoCorner} />
      </div>
      <div className={styles.headerDiv} >
        <p className={styles.text}>
          Gracias por terminar el test
        </p>
        <Image src={face} />
      </div>
      <div className={styles.photosDiv} >
        <div className={styles.row} >
          <div className={styles.row} >
            {photo1}
            <p className={styles.textPhoto} >
              Foto frontal
            </p>
          </div>
          <div className={styles.row} >
            <div className={styles.done} >
              <Image src={check} />
            </div>
            <div onClick={() => router.push('photos')} >
              <Image src={edit} />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.row} >
            {photo2}
            <p className={styles.textPhoto} >
              Foto lado izquierdo
            </p>
          </div>
          <div className={styles.row} >
            <div className={styles.done} >
              <Image src={check} />
            </div>
            <div onClick={() => router.push('photos')} >
              <Image src={edit} />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.row} >
            {photo3}
            <p className={styles.textPhoto} >
              Foto lado derecho
            </p>
          </div>
          <div className={styles.row} >
            <div className={styles.done} >
              <Image src={check} />
            </div>
            <div onClick={() => router.push('photos')} >
              <Image src={edit} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.photosDiv} >
        <div className={styles.row} >
          <p className={styles.textPhoto} >
            Encuesta
          </p>
          <div className={styles.done} >
            <Image src={check} />
          </div>
        </div>
      </div>
      <form onSubmit={submit} >
        <div className={styles.row} >
          <input type="checkbox" id="policy" name="policy" />
          <p className={styles.textPolicy} >
            Acepto términos y condiciones
          </p>
        </div>
        <div className={styles.center} >
          <button type='submit' className={styles.submit} >
            Finalizar
          </button>
        </div>
      </form>
      <div className={styles.circles} >
        <Image src={circles} />
      </div>
    </div>
  )
}
