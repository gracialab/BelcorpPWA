import Image from 'next/image'
import styles from '../styles/login.module.css'
import logoBelcorp from '../assets/logoBelcorp.png'
import logoBranches from '../assets/logoBranches.png'
import HeaderConfig from '../components/headerConfig'
import { loginProvider } from '../providers/login/loginProvider'

export default function login() {
  const { submit } = loginProvider()

  return (
    <div className={styles.container}>
      <HeaderConfig title={'Login'} />
      <p className={styles.version} >
        v.1.0.23
      </p>
      <div className={styles.containerForm} >
        <div className={styles.logoBelcorp} >
          <Image src={logoBelcorp} width={150} height={100} />
        </div>
        <div className={styles.logoBranches} >
          <Image src={logoBranches} />
        </div>
        <form onSubmit={submit} className={styles.formLogin}>
          <div>
            <div>
              <label className={styles.labels} >
                Email
              </label>
            </div>
            <input type="email" name="email" id="email" className={styles.input} />
          </div>

          <div>
            <div>
              <label className={styles.labels}>
                Telefono
              </label>
            </div>
            <input type="number" name="cellPhone" id="cellPhone" className={styles.input} />
          </div>
          <div className={styles.div} >
            <button type="submit" className={styles.submit} >
              Iniciar
            </button>
          </div>
          <div className={styles.space} />
          <div className={styles.div} >
            <a className={styles.legal} >
              Términos y condiciones
            </a>
          </div>
          <div className={styles.space} />
        </form>
      </div>
    </div>
  )
}
