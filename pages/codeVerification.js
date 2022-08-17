import Image from 'next/image'
import backIcon from '../assets/back.png'
import helpIcon from '../assets/helpIcon.png'
import ReactCodeInput from 'react-code-input'
import blockIcon from '../assets/blockIcon.png'
import HeaderConfig from '../components/headerConfig'
import styles from '../styles/codeVerification.module.css'
import { codeVerificationProvider } from '../providers/codeVerification/codeVerificationProvider'

export default function codeVerification() {
  const { submit, router, onChange, seconds, sendCode } = codeVerificationProvider()
  const propsCodeComponent = {
    inputStyle: {
      margin: '4px',
      width: '60px',
      borderRadius: '5px',
      fontSize: '16px',
      height: '60px',
      backgroundColor: '#FFF4F4',
      color: 'black',
      border: '1px solid transparent',
      marginTop: 20,
      paddingLeft: 25,
      fontFamily: 'Gilroy'
    },
    inputStyleInvalid: {
      margin: '4px',
      width: '60px',
      borderRadius: '5px',
      fontSize: '16px',
      height: '60px',
      backgroundColor: '#FFF4F4',
      color: 'red',
      border: '1px solid red',
      marginTop: 20,
      paddingLeft: 25,
      fontFamily: 'Gilroy'
    }
  }

  return (
    <div className={styles.container}>
      <HeaderConfig title={'Código de verificación'} />
      <div className={styles.buttonsHead} >
        <div className={styles.back} onClick={() => router.push('/')}>
          <Image src={backIcon} />
        </div>
        <div className={styles.info}>
          <Image src={helpIcon} />
        </div>
      </div>
      <div className={styles.containerForm} >
        <div className={styles.blockIcon} >
          <Image src={blockIcon} />
        </div>
        <div className={styles.blockIcon} >
          <p className={styles.text} >
            Sabemos que eres tú, pero por favor ingresa tu PIN.
          </p>
        </div>
        <div className={styles.blockIcon} >
          <ReactCodeInput type='number' fields={6} {...propsCodeComponent} onChange={onChange} value='' name='code' />
        </div>
        <div className={styles.div} >
          <button type="submit" className={styles.submit} onClick={submit} >
            Validar
          </button>
        </div>
        <div className={styles.div} >
          <button type="submit" className={styles.send} onClick={seconds === 0 ? sendCode : null} >
            Volver a enviar el código {seconds > 0 ? `| ${seconds} seg` : ''}
          </button>
        </div>
        <div className={styles.space} />
      </div>
    </div>
  )
}
