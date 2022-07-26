import Head from 'next/head'
import Image from 'next/image'
import Webcam from 'react-webcam'
import alert from '../assets/alert.png'
import check from '../assets/check.png'
import camera from '../assets/camera.png'
import styles from '../styles/photos.module.css'
import { photosProvider } from '../providers/photos/photosProvider'

const videoConstraints = {
  width: 390,
  height: 525,
  facingMode: 'user'
}

export default function photos() {
  const { capture, capture2, capture3, webcamRef, imageOne, imageTwo, imageThree } = photosProvider()

  return (
    <div className={styles.container}>
      <Head>
        <title>Fotos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.adviceHeader} >
        <div className={styles.advise} >
          <p className={styles.adviseMessage} >
            Coloca tu rostro {!imageOne ? 'de frente' : !imageTwo ? 'de lado izquierdo' : !imageThree ? 'de lado derecho' : ''} en el círculo y toma la foto.
          </p>
          <div className={styles.alert} >
            <Image src={camera} width={50} height={50} />
          </div>
        </div>
        <Webcam
          width={400}
          height={500}
          audio={false}
          ref={webcamRef}
          mirrored={true}
          className={styles.oval}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <div className={styles.rowSteps} >
          {imageOne ?
            <div className={styles.done} >
              <Image src={check} />
            </div> :
            <div className={styles.empty} />
          }
          <div className={styles.line} />
          {imageTwo ?
            <div className={styles.done} >
              <Image src={check} />
            </div> :
            <div className={styles.empty} />
          }
          <div className={styles.line} />
          {imageThree ?
            <div className={styles.done} >
              <Image src={check} />
            </div> :
            <div className={styles.empty} />
          }
        </div>
        <div className={styles.rowSteps} >
          <p className={styles.subtitle} >
            Frontal
          </p>
          <p className={styles.subtitle} >
            Lado izq
          </p>
          <p className={styles.subtitle} >
            Lado der
          </p>
        </div>
        <button className={styles.submit} onClick={!imageOne ? () => capture() : !imageTwo ? () => capture2() : !imageThree ? () => capture3() : null} >
          Tomar foto
        </button>
      </div>
      <div className={styles.space} />
    </div >
  )
}
