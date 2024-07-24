import { useRouteError, Link } from 'react-router-dom'
// Components
import PageTitle from '../components/PageTitle'

const Error = () => {
  const error = useRouteError()

  return (
    <>
      <PageTitle title={'Error'} />
      <h1>Error: {error.message}</h1>
      <pre>
        {error.status} - {error.statusText}
      </pre>
      <Link to='/'>Go Back Home</Link>
    </>
  )
}

export default Error
