import * as faceapi from 'face-api.js'
import { useRouter } from 'next/router'
import React, { useRef, useCallback, useState, useEffect } from 'react'

export const photosProvider = () => {
  const router = useRouter()
  const [imageOne, setImageOne] = useState()
  const [imageTwo, setImageTwo] = useState()
  const [imageThree, setImageThree] = useState()

  const [modelsLoaded, setModelsLoaded] = useState(false)

  const videoRef = useRef()
  const videoHeight = 400
  const videoWidth = 560
  const canvasRef = useRef()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current
        video.srcObject = stream
        video.play()
      })
      .catch(err => {
        console.error('Houve um erro:', err)
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
  }, [canvasRef, videoRef])

  function handleVideoOnPlay() {
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current)
        const displaySize = { width: videoWidth, height: videoHeight }

        faceapi.matchDimensions(canvasRef.current, displaySize)
        const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender()

        if (detections) {
          const resizedDetections = faceapi.resizeResults(detections, displaySize)
          sessionStorage.setItem('accuracy', resizedDetections.detection.score)
          canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight)
          canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections)

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
    videoWidth,
    videoHeight,
    handleVideoOnPlay
  }
}