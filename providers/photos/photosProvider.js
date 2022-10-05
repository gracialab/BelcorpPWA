import * as faceapi from 'face-api.js'
import { useRouter } from 'next/router'
import { useRef, useCallback, useState, useEffect } from 'react'

// import {JEELIZFACEFILTER, NN_4EXPR} from "facefilter";

export const photosProvider = () => {
  const router = useRouter()
  const [imageOne, setImageOne] = useState()
  const [imageTwo, setImageTwo] = useState()
  const [imageThree, setImageThree] = useState()

  const [modelsLoaded, setModelsLoaded] = useState(false)

  const videoRef = useRef()
  const canvasRef = useRef()
  const outputCanvas = useRef()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current
        video.setAttribute('autoplay', '')
        video.setAttribute('muted', '')
        video.setAttribute('playsinline', '')
        video.srcObject = stream
      })
      .catch(err => {
        console.error('Hubo un error:', err)
      })

    const loadModels = async () => {
      const MODEL_URL = '/models'

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true))
    }
    loadModels()
    
  }, [])

  function handleVideoOnPlay() {
    const width = window.screen.width
    setInterval(async () => {
      if (canvasRef && canvasRef.current && modelsLoaded) {
        canvasRef.current.innerHTML = faceapi.createCanvas(videoRef.current)
        const displaySize = { width: 650, height: 400 }

        faceapi.matchDimensions(canvasRef.current, displaySize)
        const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

        if (detections) {
          const resizedDetections = faceapi.resizeResults(detections, displaySize)
          sessionStorage.setItem('accuracy', resizedDetections.detection.score)
          canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, 650, 400)

          canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)
        }
      }
    }, 1000)
    
    
  }

  // const face = () => {
  //   JEELIZFACEFILTER.init({
  //     canvasId: outputCanvas.current,
  //     NNCPath:NN_4EXPR , // path to JSON neural network model (NN_DEFAULT.json by default)
  //     callbackReady: function(errCode, spec){
  //       if (errCode){
  //         console.log('AN ERROR HAPPENS. ERROR CODE =', errCode);
  //         return;
  //       }
  //       // [init scene with spec...]
  //       console.log('INFO: JEELIZFACEFILTER IS READY');
  //     }, //end callbackReady()
    
  //     // called at each render iteration (drawing loop)
  //     callbackTrack: function(detectState){
  //       // Render your scene here
  //       // [... do something with detectState]
  //     } //end callbackTrack()
  //   });
  // }
  const capture = useCallback(
    () => {
      const data = sessionStorage.getItem('accuracy')
      if (parseFloat(data) > 0.8) {
        canvasRef.width = 1920
        canvasRef.height = 1080

        let ctx = canvasRef && canvasRef.current && canvasRef.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

        let image = canvasRef.current.toDataURL('image/jpeg')
        setImageOne(image)
        sessionStorage.setItem('photo1', image)
      } else {
        alert('Por favor ubica mejor tu rostro, dentro de las lineas demarcadas y acercate más a la cámara')
      }
    },
    [canvasRef, videoRef]
  )

  const capture2 = useCallback(
    () => {
      const data = sessionStorage.getItem('accuracy')
      if (parseFloat(data) > 0.8) {
        canvasRef.width = 1920
        canvasRef.height = 1080

        let ctx = canvasRef && canvasRef.current && canvasRef.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

        let image = canvasRef.current.toDataURL('image/jpeg')
        setImageTwo(image)
        sessionStorage.setItem('photo2', image)
      } else {
        alert('Por favor ubica mejor tu rostro, dentro de las lineas demarcadas y acercate más a la cámara')
      }
    },
    [canvasRef, videoRef]
  )

  const capture3 = useCallback(
    () => {
      const data = sessionStorage.getItem('accuracy')
      if (parseFloat(data) > 0.8) {
        canvasRef.width = 1920
        canvasRef.height = 1080

        let ctx = canvasRef && canvasRef.current && canvasRef.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

        let image = canvasRef.current.toDataURL('image/jpeg')
        setImageThree(image)
        sessionStorage.setItem('photo3', image)
        videoRef.current.pause()
        videoRef.current.srcObject.getTracks()[0].stop()
        router.push('questions')
      } else {
        alert('Por favor ubica mejor tu rostro, dentro de las lineas demarcadas y acercate más a la cámara')
      }
    },
    [canvasRef, videoRef]
  )

  return {
    capture,
    capture2,
    capture3,
    imageOne,
    imageTwo,
    videoRef,
    canvasRef,
    outputCanvas,
    imageThree,
    modelsLoaded,
    handleVideoOnPlay
  }
}