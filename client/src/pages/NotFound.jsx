import { Link } from 'react-router-dom'
// Components
import PageTitle from '../components/PageTitle'

const NotFound = () => {
  return (
    <>
      <PageTitle title={'Page Not Found'} />
      <h1>Sorry, the page you were looking for was not found.</h1>
      <Link to='/'>Return to home</Link>
    </>
  )
}

export default NotFound
