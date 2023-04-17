import Footer from 'src/component/Footer/Footer'
import Header from 'src/component/Header/Header'

const CommonLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default CommonLayout
