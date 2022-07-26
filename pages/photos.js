import { useMedia } from 'react-use'
import { useEffect, useState } from 'react'
import { CameraPhone } from '../components/CameraPhone'
import { CameraDesktop } from '../components/CameraDesktop'

export default function photos() {
  const [showing, setShowing] = useState(false)
  const isWide = useMedia('(min-width: 768px)', false)

  useEffect(() => {
    setShowing(true)
  }, [])

  if (!showing) {
    return null
  }

  if (typeof window === 'undefined') {
    return <></>
  } else {
    return isWide ? <CameraDesktop /> : <CameraPhone />
  }
}
