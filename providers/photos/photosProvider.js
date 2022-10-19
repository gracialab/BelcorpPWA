import * as faceapi from 'face-api.js'
// import { FaceMesh, FACEMESH_FACE_OVAL,FACEMESH_RIGHT_EYE, FACEMESH_RIGHT_EYEBROW, FACEMESH_RIGHT_IRIS, FACEMESH_LEFT_EYE, FACEMESH_LEFT_EYEBROW, FACEMESH_LEFT_IRIS,FACEMESH_LIPS, FACEMESH_TESSELATION,FACEMESH_CONTOURS  } from "@mediapipe/face_mesh"

import { useRouter } from 'next/router'
import { Camera } from "@mediapipe/camera_utils"
import { drawConnectors } from '@mediapipe/drawing_utils'
import { useRef, useCallback, useState, useEffect } from 'react'

// import '@mediapipe/drawing_utils'
import '@mediapipe/control_utils'

// import {JEELIZFACEFILTER, NN_4EXPR} from "facefilter";

export const photosProvider = () => {
  const router = useRouter()
  const [imageOne, setImageOne] = useState()
  const [imageTwo, setImageTwo] = useState()
  const [imageThree, setImageThree] = useState()

  const [showBackground, setShowBackground] = useState(false);

  const videoRef = useRef()
  const canvasRef = useRef()
  const outputCanvas = useRef()

  useEffect(() => {
    const { FaceMesh } = require("@mediapipe/face_mesh")

    navigator.mediaDevices
      .getUserMedia({ video: { width: 300, frameRate: 30, facingMode: 'user' } })
      .then(stream => {
        let video = videoRef.current
        video.setAttribute('autoplay', '')
        video.setAttribute('muted', '')
        video.setAttribute('playsinline', '')
        video.srcObject = stream
        video.msHorizontalMirror = true;
      })
      .catch(err => {
        console.error('Hubo un error:', err)
      })

    // if (navigator.share) {
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      }
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    faceMesh.onResults(onResults);
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await faceMesh.send({ image: videoRef.current });
      },
      width: 360,
      height: 400
    });

    camera.start();
    // }
  }, [])

  function handleVideoOnPlay() {
    const width = window.screen.width
    setInterval(async () => {
      if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
      }
    }, 1000)
  }

  function onResults(results) {
    const { FACEMESH_TESSELATION } = require("@mediapipe/face_mesh")
    const canvasElement = outputCanvas.current
    const canvasCtx = canvasElement.getContext('2d')
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION,
          { color: '#a5f3fc50', lineWidth: 0.4 });
      }
    }
    canvasCtx.restore();
  }

  const offBackground = (time) => {
    setTimeout(() => {
      setShowBackground(false)
    }, time);
  }

  const capture = useCallback(
    () => {
      setShowBackground(true)
      setTimeout(() => {
        canvasRef.width = 1920
        canvasRef.height = 1080

        let ctx = canvasRef && canvasRef.current && canvasRef.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

        let image = canvasRef.current.toDataURL('image/jpeg')
        setImageOne(image)
        sessionStorage.setItem('photo1', image)
      }, 1500);
      offBackground(2000)
    },
    [canvasRef, videoRef]
  )

  const capture2 = useCallback(
    () => {
      setShowBackground(true)
      setTimeout(() => {
        canvasRef.width = 1920
        canvasRef.height = 1080

        let ctx = canvasRef && canvasRef.current && canvasRef.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

        let image = canvasRef.current.toDataURL('image/jpeg')
        setImageTwo(image)
        sessionStorage.setItem('photo2', image)
      }, 1500);
      offBackground(2000)
    },
    [canvasRef, videoRef]
  )

  const capture3 = useCallback(
    () => {
      setShowBackground(true)
      setTimeout(() => {
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

      }, 1500);
      offBackground(2000)
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
    showBackground,
    outputCanvas,
    imageThree,
    handleVideoOnPlay
  }
}