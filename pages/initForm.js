import Head from 'next/head'
import Image from 'next/image'
import camera from '../assets/cameraDenied.png'
import logoCorner from '../assets/logoCorner.png'
import logoHeader from '../assets/logoHeader.png'
import styles from '../styles/initForm.module.css'
import circles from '../assets/backgroundCircles.png'
import { initFormProvider } from '../providers/initForm/initFormProvider'

export default function initForm() {
  const { submit, modal, closeModal } = initFormProvider()

  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio encuesta</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.logo}>
        <Image src={logoCorner} />
      </div>
      <div>
        <form onSubmit={submit} className={styles.containerForm} >
          <div className={styles.logoHeader} >
            <Image src={logoHeader} />
          </div>
          <div className={styles.center} >
            <h1 className={styles.textHeader} >
              ¡Hola!
            </h1>
          </div>
          <p>
            Nombre del producto que estás probando*
          </p>
          <input type="text" name="name" id="name" className={styles.input} />
          <button type="submit" className={styles.submit} >
            Iniciar Encuesta
          </button>
        </form>
        <div className={styles.footer} >
          <p className={styles.instructions} >
            Instrucciones
          </p>
          <p className={styles.instructions} >
            1. Busca un lugar con luz.
          </p>
          <p className={styles.instructions2} >
            2. Procura ser asistida por alguien.
          </p>
          <p className={styles.instructions2} >
            3. Sigue los pasos para completar la encuesta.
          </p>
          <p className={styles.instructions2} >
            4. Recuerda siempre aplicar el producto siguiendo las instrucciónes de su empaque.
          </p>
        </div>
        <div className={styles.div} >
          <p className={styles.link}>
            Términos y condiciones
          </p>
        </div>
        <div className={styles.circles} >
          <Image src={circles} />
        </div>
        <div className={styles.space} />
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
    </div>
  )
}
