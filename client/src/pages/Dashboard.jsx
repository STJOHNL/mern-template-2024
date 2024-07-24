import { useState } from 'react'
import { Link } from 'react-router-dom'
// Context
import { useUserContext } from '../context/UserContext'
// Components
import Loader from '../components/Loader'
import PageTitle from '../components/PageTitle'

const Dashboard = () => {
  const { user } = useUserContext()

  const [isLoading, setIsLoading] = useState(false)

  // Conditional loader
  if (isLoading) return <Loader />

  return (
    <div>
      <PageTitle title={'Dashboard'} />
      <h1>Welcome</h1>
      <p>
        Name: {user?.fName} {user?.lName}
      </p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>

      {user?.role === 'Admin' && <Link to='/admin'>Admin Page</Link>}
      <table>
        <caption>Statement Summary</caption>
        <thead>
          <tr>
            <th scope='col'>Account</th>
            <th scope='col'>Due Date</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Period</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label='Account'>Visa - 3412</td>
            <td data-label='Due Date'>04/01/2016</td>
            <td data-label='Amount'>$1,190</td>
            <td data-label='Period'>03/01/2016 - 03/31/2016</td>
          </tr>
          <tr>
            <td scope='row' data-label='Account'>
              Visa - 6076
            </td>
            <td data-label='Due Date'>03/01/2016</td>
            <td data-label='Amount'>$2,443</td>
            <td data-label='Period'>02/01/2016 - 02/29/2016</td>
          </tr>
          <tr>
            <td scope='row' data-label='Account'>
              Corporate AMEX
            </td>
            <td data-label='Due Date'>03/01/2016</td>
            <td data-label='Amount'>$1,181</td>
            <td data-label='Period'>02/01/2016 - 02/29/2016</td>
          </tr>
          <tr>
            <td scope='row' data-label='Acount'>
              Visa - 3412
            </td>
            <td data-label='Due Date'>02/01/2016</td>
            <td data-label='Amount'>$842</td>
            <td data-label='Period'>01/01/2016 - 01/31/2016</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default Dashboard
