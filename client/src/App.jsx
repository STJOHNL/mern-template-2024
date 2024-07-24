import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import AdminRoute from './routes/AdminRoute'

// Layouts
import Layout from './layouts/Layout'

// Pages
import Error from './pages/Error'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import Posts from './pages/Posts'
import EditPost from './pages/EditPost'
import Post from './pages/Post'
import CreateUser from './pages/CreateUser'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<Layout />} errorElement={<Error />}>
        <Route index element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />

        {/* Private Routes */}
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile/:id'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path='/posts'
          element={
            <PrivateRoute>
              <Posts />
            </PrivateRoute>
          }
        />

        <Route
          path='/posts/:id'
          element={
            <PrivateRoute>
              <Post />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path='/admin'
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route
          path='/post/create'
          element={
            <AdminRoute>
              <CreatePost />
            </AdminRoute>
          }
        />

        <Route
          path='/post/edit/:id'
          element={
            <AdminRoute>
              <EditPost />
            </AdminRoute>
          }
        />

        <Route
          path='/user/create'
          element={
            <AdminRoute>
              <CreateUser />
            </AdminRoute>
          }
        />

        {/* Catch all */}
        <Route path='/*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
