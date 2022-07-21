import { useRouter } from 'next/router'
import React, { useRef, useCallback, useState } from 'react'

export const photosProvider = () => {
  const router = useRouter()
  const webcamRef = useRef(null)
  const [imageOne, setImageOne] = useState()
  const [imageTwo, setImageTwo] = useState()
  const [imageThree, setImageThree] = useState()

  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot()
      setImageOne(imageSrc)
      sessionStorage.setItem('photo1', imageSrc)
    },
    [webcamRef]
  )

  const capture2 = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot()
      setImageTwo(imageSrc)
      sessionStorage.setItem('photo2', imageSrc)
    },
    [webcamRef]
  )

  const capture3 = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot()
      setImageThree(imageSrc)
      sessionStorage.setItem('photo3', imageSrc)
      router.push('questions')
    },
    [webcamRef]
  )

  return {
    capture,
    capture2,
    capture3,
    imageOne,
    imageTwo,
    webcamRef,
    imageThree,
  }
}