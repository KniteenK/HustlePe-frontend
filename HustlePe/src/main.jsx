import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ClientLayout from './ClientLayout.jsx'
import Intermediate from './components/auth/Intermediate.jsx'
import Login from './components/auth/Login/Login.jsx'
import Register from './components/auth/Register/Register.jsx'
import RegisterClient from './components/auth/Register/RegisterClient.jsx'
import JobPosting from './components/Client/JobPosting/JobPosting.jsx'
import Messages from './components/Client/Messages/Messages.jsx'
import DocumentsAndSocialLinks from './components/Hustler/Header/ProfileSetting/DocumentsAndSocialLinks.jsx'
import ExpCerti from './components/Hustler/Header/ProfileSetting/ExpCerti.jsx'
import Gigs from './components/Hustler/Header/ProfileSetting/Gigs.jsx'
import ProfileInfo from './components/Hustler/Header/ProfileSetting/PersonalInfo.jsx'
// import ProfileSettings from './components/Hustler/Header/ProfileSetting/ProfileSetting.jsx'
import PostGig from './components/Client/JobPosting/PostGig/PostGig.jsx'
import Statistics from './components/Hustler/Header/ProfileSetting/Statistics.jsx'
import GuestLayout from './GuestLayout.jsx'
import HustlerLayout from './HustlerLayout.jsx'
import './index.css'
import ProfileSettingLayout from './ProfileSettingLayout.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element:<GuestLayout />,
    children: [
      

    ]
  },
  {
    path: '/client',
    element:<ClientLayout />,
    children: [
      
      {
        path: 'JobPosting',
        element: <JobPosting />
      },
      {
        path: 'Messages',
        element: <Messages />
      },
      {
        path: 'PostGig',
        element: <PostGig />
      }
      
      

    ]
  },
  {
    path: '/hustler',
    element: <HustlerLayout />,
    children: [
      {
        path: 'ProfileSettings',
        element: <ProfileSettingLayout />,
        children: [
          {
            path: 'profile',
            element: <ProfileInfo />,
          },
          
          {
            path: 'gigs',
            element: <Gigs />,
          },
          {
            path: 'documents-and-social-links',
            element: <DocumentsAndSocialLinks />,
          },
          {
            path: 'statistics',
            element: <Statistics />,
          },
          {
            path: 'Exprience and Certifications',
            element: <ExpCerti />,  
          }
        ],
      },
    ],
  },
  {
    path: '/login', // Separate route for login
    element: <Login /> // This route does not include the GuestLayout (Header/Footer)
  },
  {
    path: '/signup', // Separate route for register
    element: <Register /> // This route does not include the GuestLayout (Header/Footer)
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
