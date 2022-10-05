import Image from 'next/image'
import alert from '../assets/alert.png'
import check from '../assets/check.png'
import camera from '../assets/camera.png'
import circles from '../assets/circles.png'
import styles from '../styles/photos.module.css'
import logoCorner from '../assets/logoCorner.png'
import HeaderConfig from '../components/headerConfig'
import { photosProvider } from '../providers/photos/photosProvider'

export const CameraDesktop = () => {
  const { capture, capture2, capture3, imageOne, imageTwo, imageThree, canvasRef, handleVideoOnPlay, modelsLoaded, videoRef, outputCanvas } = photosProvider()
  return (
    <div>
      <div className={styles.container}>
        <HeaderConfig title={'Fotos'} />
        <div className={styles.logoCorner} >
          <Image src={logoCorner} />
        </div>
        <div className={styles.adviceHeader} >
          <div className={styles.advise} >
            <div className={styles.alertWeb} >
              <Image src={alert} width={30} height={30} />
            </div>
            <p className={styles.adviseMessage} >
              Coloca tu rostro {!imageOne ? 'de frente' : !imageTwo ? 'de lado izquierdo' : !imageThree ? 'de lado derecho' : ''} en el círculo y toma la foto.
            </p>
            <div className={styles.alert} >
              <Image src={camera} width={50} height={50} />
            </div>
          </div>
          <div className={styles.backCamera} >
            <div className={styles.circleWrapper}>
              <div className={styles.circleContainer}>
                <div className={styles.circlePhoto}>
                  <div className={styles.circlePhotoContent}>
                    <video ref={videoRef} className={styles.video} onPlay={() => handleVideoOnPlay()} />
                    {/* <div>
                      <canvas ref={outputCanvas} className={styles.videoOutput}></canvas>
                    </div> */}
                    {modelsLoaded ?
                      <div className={styles.canva} >
                        <canvas ref={canvasRef} />
                      </div> : <></>
                    }
                  </div>
                </div>
              </div>
            </div>
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
        </div>
        <div className={styles.circles} >
          <Image src={circles} />
        </div>
        <div className={styles.space} />
      </div >
    </div>
  )
}
