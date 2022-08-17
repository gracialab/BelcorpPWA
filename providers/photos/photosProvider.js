import * as faceapi from 'face-api.js'
import { useRouter } from 'next/router'
import { useRef, useCallback, useState, useEffect } from 'react'

export const photosProvider = () => {
  const router = useRouter()
  const [imageOne, setImageOne] = useState()
  const [imageTwo, setImageTwo] = useState()
  const [imageThree, setImageThree] = useState()

  const [modelsLoaded, setModelsLoaded] = useState(false)

  const videoRef = useRef()
  const canvasRef = useRef()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current
        video.setAttribute('autoplay', '')
        video.setAttribute('muted', '')
        video.setAttribute('playsinline', '')
        video.srcObject = stream
        video.play()
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
        const displaySize = { width: width > 500 ? 525 : 300, height: width > 500 ? 400 : 220 }

        faceapi.matchDimensions(canvasRef.current, displaySize)
        const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

        if (detections) {
          const resizedDetections = faceapi.resizeResults(detections, displaySize)
          sessionStorage.setItem('accuracy', resizedDetections.detection.score)
          canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, width > 500 ? 400 : 200, width > 500 ? 400 : 360)

          canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)
        }
      }
    }, 1000)
  }

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
    imageThree,
    modelsLoaded,
    handleVideoOnPlay
  }
}