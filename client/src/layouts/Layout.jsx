import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
// Components
import Header from '../components/navbar/Header'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Toaster position='top-right' toastOptions={{ duration: 2500 }} />
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
export default Layout
