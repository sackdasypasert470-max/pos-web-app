import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }){
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>POS Web App</title>
      </Head>
      <div className="header">
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <div className="brand">POS Web App</div>
        </div>
        <div className="menu">ເມນູ</div>
      </div>
      <Component {...pageProps} />
    </>
  )
}
