import Head from 'next/head'

const HeaderConfig = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name='theme-color' content='#32235C' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='application-name' content='Belcorp Lab' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-title' content='Belcorp Lab' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='msapplication-config' content='/icons/browserconfig.xml' />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <meta property='og:type' content='website' />
      <meta property='og:image' content='favicon.ico' />
      <meta property='og:title' content='Belcorp Lab' />
      <meta property='og:site_name' content='Belcorp Lab' />
      <meta property='og:url' content='https://yourdomain.com' />

      <link rel='manifest' href='manifest.json' />
      <link rel='shortcut icon' href='favicon.ico' />
      <link rel='apple-touch-icon' href='favicon.ico' />
      <link rel='icon' sizes='32x32' href='favicon.ico' />
      <link rel='icon' sizes='16x16' href='favicon.ico' />
      <link rel='apple-touch-icon' sizes='152x152' href='favicon.ico' />
      <link rel='apple-touch-icon' sizes='180x180' href='favicon.ico' />
      <link rel='apple-touch-icon' sizes='167x167' href='favicon.ico' />
    </Head>
  )
}

export default HeaderConfig
