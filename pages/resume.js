import Image from 'next/image'
import face from '../assets/face.png'
import edit from '../assets/edit.png'
import check from '../assets/check.png'
import circles from '../assets/circles.png'
import greenFace from '../assets/greenFace.png'
import styles from '../styles/resume.module.css'
import logoCorner from '../assets/logoCorner.png'
import HeaderConfig from '../components/headerConfig'
import { resumeProvider } from '../providers/resume/resumeProvider'

export default function resume() {
  const { submit, photo1, photo2, photo3, router } = resumeProvider()

  return (
    <div className={styles.container}>
      <HeaderConfig title={'Resumen'} />
      <div className={styles.logoCorner} >
        <Image src={logoCorner} />
      </div>
      <div className={styles.column} >
        <div className={styles.image} >
          <Image src={face} height={50} width={50} />
        </div>
        <div className={styles.headerDiv} >
          <p className={styles.text}>
            Gracias por terminar el test
          </p>
          <div className={styles.greenFace} >
            <Image src={greenFace} />
          </div>
        </div>
        <div className={styles.photosDiv} >
          <div className={styles.row} >
            <div className={styles.rowHalf} >
              {photo1}
              <p className={styles.textPhoto} >
                Foto frontal
              </p>
            </div>
            <div className={styles.rowHalf} >
              <div className={styles.done} >
                <Image src={check} />
              </div>
              <div onClick={() => router.push('photos')} className={styles.cursor} >
                <Image src={edit} />
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowHalf} >
              {photo2}
              <p className={styles.textPhoto} >
                Foto lado izquierdo
              </p>
            </div>
            <div className={styles.rowHalf} >
              <div className={styles.done} >
                <Image src={check} />
              </div>
              <div onClick={() => router.push('photos')} className={styles.cursor} >
                <Image src={edit} />
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowHalf} >
              {photo3}
              <p className={styles.textPhoto} >
                Foto lado derecho
              </p>
            </div>
            <div className={styles.rowHalf} >
              <div className={styles.done} >
                <Image src={check} />
              </div>
              <div onClick={() => router.push('photos')} className={styles.cursor} >
                <Image src={edit} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.photosDiv} >
          <div className={styles.rowQuestions} >
            <p className={styles.textPhoto} >
              Encuesta
            </p>
            <div className={styles.doneQuestion} >
              <Image src={check} />
            </div>
          </div>
        </div>
        <form onSubmit={submit} >
          <div className={styles.rowPolicy} >
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
      </div>
      <div className={styles.circles} >
        <Image src={circles} />
      </div>
    </div>
  )
}
