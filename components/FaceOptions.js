import Image from 'next/image'
import { useState } from 'react';
import face1 from "../assets/face-1.svg";
import face2 from "../assets/face-2.svg";
import face3 from "../assets/face-3.svg";
import face4 from "../assets/face-4.svg";
import face5 from "../assets/face-5.svg";
import styles from '../styles/face.module.css'

const images = [face1, face2, face3, face4, face5]
export const FaceOptions = ({ options, title, onChange }) => {

  const [currentElement, setCurrentElement] = useState(null)

  const handleClick = (i, value) => {
    setCurrentElement(i)
    if (onChange) {
      onChange({ name: title, value })
    }
  }

  return (
    <>
      <p className={styles.title}>{title}</p>
      <div className={styles.container}>
        {
          images.map((img, i) => (
            <div key={i} className={`${styles.item}  ${currentElement === i && styles.active}`}
              role="button"
              onClick={() => handleClick(i, options[i])}
            >
              <div className={styles.img} >
                <Image src={img} />
              </div>
              {options && <p>{options[i]}</p>}
            </div>
          ))
        }
      </div>
    </>
  )
}
