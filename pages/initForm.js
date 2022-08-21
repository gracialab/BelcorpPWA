import Image from 'next/image'
import step1 from '../assets/step1.png'
import step2 from '../assets/step2.png'
import step3 from '../assets/step3.png'
import step4 from '../assets/step4.png'
import circles from '../assets/circles.png'
import camera from '../assets/cameraDenied.png'
import logoHeader from '../assets/logoHeader.png'
import logoCorner from '../assets/logoCorner.png'
import styles from '../styles/initForm.module.css'
import HeaderConfig from '../components/headerConfig'
import { initFormProvider } from '../providers/initForm/initFormProvider'

export default function initForm() {
  const { submit, modal, closeModal } = initFormProvider()

  return (
    <div className={styles.container}>
      <HeaderConfig title={'Inicio encuesta'} />
      <div>
        <div className={styles.logoCorner} >
          <Image src={logoCorner} />
        </div>
        <form onSubmit={submit} className={styles.containerForm} >
          <div className={styles.logoHeader} >
            <Image src={logoHeader} height={75} width={90} />
          </div>
          <div className={styles.center} >
            <h1 className={styles.textHeader} >
              ¡Hola!
            </h1>
          </div>
          <div className={styles.row} >
            <div className={styles.boxStep} >
              <p className={styles.step} >
                1
              </p>
              <div className={styles.logoStep} >
                <Image src={step1} />
              </div>
              <p className={styles.stepText} >
                Busca una buena fuente de luz.
              </p>
            </div>
            <div className={styles.boxStep} >
              <p className={styles.step} >
                2
              </p>
              <div className={styles.logoStep} >
                <Image src={step2} />
              </div>
              <p className={styles.stepText} >
                Procura que alguien te ayude.
              </p>
            </div>
            <div className={styles.boxStep} >
              <p className={styles.step} >
                3
              </p>
              <div className={styles.logoStep} >
                <Image src={step3} />
              </div>
              <p className={styles.stepText} >
                Sigue los pasos para completar la encuesta.
              </p>
            </div>
            <div className={styles.boxStep} >
              <p className={styles.step} >
                4
              </p>
              <div className={styles.logoStep} >
                <Image src={step4} />
              </div>
              <p className={styles.stepText} >
                Siguiendo las instrucciónes de aplicación.
              </p>
            </div>
          </div>
          <div className={styles.columnMobile} >
            <div className={styles.rowMobile} >
              <div className={styles.boxStep} >
                <p className={styles.step} >
                  1
                </p>
                <div className={styles.logoStep} >
                  <Image src={step1} />
                </div>
                <p className={styles.stepText} >
                  Busca una buena fuente de luz.
                </p>
              </div>
              <div className={styles.boxStep} >
                <p className={styles.step} >
                  2
                </p>
                <div className={styles.logoStep} >
                  <Image src={step2} />
                </div>
                <p className={styles.stepText} >
                  Procura que alguien te ayude.
                </p>
              </div>
            </div>
            <div className={styles.rowMobile} >
              <div className={styles.boxStep} >
                <p className={styles.step} >
                  3
                </p>
                <div className={styles.logoStep} >
                  <Image src={step3} />
                </div>
                <p className={styles.stepText} >
                  Sigue los pasos para completar la encuesta.
                </p>
              </div>
              <div className={styles.boxStep} >
                <p className={styles.step} >
                  4
                </p>
                <div className={styles.logoStep} >
                  <Image src={step4} />
                </div>
                <p className={styles.stepText} >
                  Siguiendo las instrucciónes de aplicación.
                </p>
              </div>
            </div>
          </div>
          <button type="submit" className={styles.submit} >
            Iniciar Encuesta
          </button>
        </form>
        <div className={styles.space} />
        <a className={styles.legal} >
          Términos y condiciones
        </a>
      </div>
      {modal ?
        <div className={styles.overlay} >
          <div className={styles.modal} >
            <Image src={camera} />
            <h2 className={styles.title} >
              ¡Lo sentimos!
            </h2>
            <p className={styles.message} >
              Sin acceso a tu Cámara no podemos continuar.
            </p>
            <button className={styles.close} onClick={() => closeModal()} >
              Cerrar
            </button>
          </div>
        </div> : null
      }
      <div className={styles.circles} >
        <Image src={circles} />
      </div>
    </div>
  )
}
