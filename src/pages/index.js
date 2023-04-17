import Banner from 'src/views/pages/home/banner/Banner'
import AboutUs from 'src/views/pages/home/about/AboutUs'
import Pricing from 'src/component/pricing/Pricing'
import Features from 'src/views/pages/home/features/Features'
import ContainSec from 'src/views/pages/home/containsec/ContainSec'
import { useSelector } from 'react-redux'

export default function Home() {
  const userData = useSelector(({ auth }) => auth.loggedInUser)

  return (
    <div>
      {/* Render Home page component here */}

      {/* Banner Section */}
      <Banner userData={userData} />

      {/* Feature Section */}
      <Features userData={userData} />

      {/* About US Section */}
      <AboutUs userData={userData} />

      {/* Contain Section */}
      <ContainSec userData={userData} />

      {/* Pricing Section */}
      <Pricing userData={userData} />
    </div>
  )
}
