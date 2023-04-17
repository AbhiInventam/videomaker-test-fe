import { useRef } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'react-bootstrap'
import Head from 'next/head'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'src/store/store'
import CommonLayout from 'src/layouts/CommonLayout'
import { RouteGuard } from 'src/routes/routeGuard'
import { Toaster } from 'react-hot-toast'

import 'src/styles/globals.scss'
import 'src/styles/responsive.scss'
import 'src/styles/videoPanel.scss'
import 'react-phone-input-2/lib/style.css' // For React mobile input
import 'react-image-crop/dist/ReactCrop.css' // For React-Image-crop plugin

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Video-maker</title>
        {/* Insert Meta Tags here */}
        <meta name='description' content='Video maker app for edit and update videos' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
          rel='stylesheet'
        />
      </Head>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouteGuard>
            <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint='xxs'>
              {/* <ToastContainer position='top-right' /> */}
              {Component.getLayout ? (
                Component.getLayout(<Component {...pageProps} />)
              ) : (
                <CommonLayout>
                  <Component {...pageProps} />
                </CommonLayout>
              )}
              <Toaster
                position='top-right'
                containerStyle={{ marginTop: '70px' }}
                toastOptions={{
                  // Define default options
                  // className: '',
                  duration: 1500
                  // style: {
                  //   background: '#fff',
                  //   color: '#000000'
                  // }

                  // Default options for specific types
                  // success: {
                  //   duration: 3000,
                  //   theme: {
                  //     primary: 'green',
                  //     secondary: 'black'
                  //   }
                  // }
                }}
              />
            </ThemeProvider>
          </RouteGuard>
        </PersistGate>
      </Provider>
    </>
  )
}
export default MyApp
