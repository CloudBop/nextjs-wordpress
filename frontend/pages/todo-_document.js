// taken from - https://github.com/vercel/next.js/blob/master/examples/with-strict-csp/pages/_document.js

export default function Dummy() {
  return <div> dummy </div>
}

// import crypto from 'crypto'
// import Document, { Html, Head, Main, NextScript } from 'next/document'
// const cspHashOf = (text) => {
//   const hash = crypto.createHash('sha256')
//   hash.update(text)
//   return `'sha256-${hash.digest('base64')}'`
// }
// export default class MyDocument extends Document {
//   render() {
//     let csp = `default-src 'self'; script-src 'self' ${cspHashOf(
//       NextScript.getInlineScriptSource(this.props)
//     )}`
//     if (process.env.NODE_ENV !== 'production') {
//       csp = `style-src 'self' 'unsafe-inline'; font-src 'self' data:; default-src 'self'; script-src 'unsafe-eval' 'self' ${cspHashOf(
//         NextScript.getInlineScriptSource(this.props)
//       )}`
//     }

//     return (
//       <Html>
//         <Head>
//           <meta httpEquiv="Content-Security-Policy" content={csp} />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }