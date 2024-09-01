import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import JobPosting from './components/Client/JobPosting/JobPosting.jsx'
import Messages from './components/Client/Messages/Messages.jsx'
import Intermediate from './components/auth/Intermediate.jsx'
import Login from './components/auth/Login/Login.jsx'
import Register from './components/auth/Register/Register.jsx'
import RegisterClient from './components/auth/Register/RegisterClient.jsx'
import './index.css'
const router = createBrowserRouter([
  {
    path: '/',
    element:<Layout />,
    children: [
      
      {
        path: 'JobPosting',
        element: <JobPosting />
      },
      {
        path: 'Messages',
        element: <Messages />
      }
      

    ]
  },
  {
    path: '/login', // Separate route for login
    element: <Login /> // This route does not include the Layout (Header/Footer)
  },
  {
    path: '/signup', // Separate route for register
    element: <Register /> // This route does not include the Layout (Header/Footer)
  },
  {
    path: 'Intermediate',
    element: <Intermediate />

  },
  {
    path: 'RegisterClient',
    element: <RegisterClient />
    }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />

  </React.StrictMode>,
)
