import type { NextPage } from 'next'
import HomeComponent from '../src/components/home'
import LoginPage from './login'

const Home: NextPage = () => {

  return (
   <>
   {
        localStorage.getItem('user') == null ? <LoginPage  />   :   <HomeComponent />
   }
   </>


  )
}

export default Home
