import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/login.module.css'
import logoBelcorp from '../assets/logoBelcorp.png'
import logoBranches from '../assets/logoBranches.png'
import { loginProvider } from '../providers/login/loginProvider'

export default function login() {
  const { submit } = loginProvider()

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name='application-name' content='Belcorp PWA' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Belcorp' />
        <meta name='description' content='Best PWA App in the world' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/icons/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#2B5797' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#000000' />

        <link rel='apple-touch-icon' href='/icons/touch-icon-iphone.png' />
        <link rel='apple-touch-icon' sizes='152x152' href='/icons/touch-icon-ipad.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/icons/touch-icon-iphone-retina.png' />
        <link rel='apple-touch-icon' sizes='167x167' href='/icons/touch-icon-ipad-retina.png' />

        <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:url' content='https://yourdomain.com' />
        <meta name='twitter:title' content='PWA App' />
        <meta name='twitter:description' content='Best PWA App in the world' />
        <meta name='twitter:image' content='https://yourdomain.com/icons/android-chrome-192x192.png' />
        <meta name='twitter:creator' content='@DavidWShadow' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='PWA App' />
        <meta property='og:description' content='Best PWA App in the world' />
        <meta property='og:site_name' content='PWA App' />
        <meta property='og:url' content='https://yourdomain.com' />
        <meta property='og:image' content='https://yourdomain.com/icons/apple-touch-icon.png' />
      </Head>
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
        </form>
      </div>
    </div>
  )
}
