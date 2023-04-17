import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { publicRoutes } from './publicRoutes'
import { getLocal } from 'src/utils/localstorage'
import { ACCESS_TOKEN } from 'src/utils/constants/constant'
import Loading from 'src/component/Loaders/Loading'

export { RouteGuard }

function RouteGuard({ children }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath)

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => {
      setLoading(true)
      setAuthorized(false)
    }
    router.events.on('routeChangeStart', hideContent)

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent)
      router.events.off('routeChangeComplete', authCheck)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = publicRoutes
    const token = getLocal(ACCESS_TOKEN)
    const path = url.split('?')[0]
    const mainPath = path.split('/')[1]
    if (!token && !publicPaths.includes(`/${mainPath}`)) {
      // toast.error('Please Login')
      setAuthorized(false)
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      })
    } else {
      setAuthorized(true)
    }
    setLoading(false)
  }

  return !loading ? authorized && children : <Loading height='500px' />
}
