import Document, { Head, Main, NextScript } from 'next/document'
import { configureLoadStyles } from '@microsoft/load-themed-styles'

// Store registered styles in a variable used later for injection.
let _allStyles = ''

// Push styles into variables for injecting later.
configureLoadStyles((styles) => {
  _allStyles += styles
})

/*
NOTE: THIS RENDERS ON THE SERVER. DO NOT USE REACT.
In production the stylesheet is compiled to .next/static/style.css.
The file will be served from /_next/static/style.css
You could include it into the page using either next/head or a custom _document.js.

TODO: For further inspiration / SEO
https://github.com/deptno/next.js-typescript-starter-kit/blob/master/pages/_document.tsx
*/
export default class DocumentWrapper extends Document {
  render () {
    return (
      <html>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
          <link rel='icon' type='image/x-icon' href='static/favicon.ico' />
          <style>${ _allStyles}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
