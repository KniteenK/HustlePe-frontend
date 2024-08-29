import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import FindTalent from './components/FindTalent/findTalent.jsx'
import FindWork from './components/FindWork/findWork.jsx'
import Home from './components/Home.jsx'
import Login from './components/auth/Login/Login.jsx'
import Register from './components/auth/Register/Register.jsx'
import './index.css'
const router = createBrowserRouter([
  {
    path: '/',
    element:<Layout />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      
      {
        path: 'findwork',
        element: <FindWork />
      },
      {
        path: 'findtalent',
        element: <FindTalent />
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
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />

  </React.StrictMode>,
)
