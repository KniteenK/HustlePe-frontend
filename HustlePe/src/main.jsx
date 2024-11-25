import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ClientLayout from './ClientLayout.jsx';
import Intermediate from './components/auth/Intermediate.jsx';
import Login from './components/auth/Login/Login.jsx';
import Register from './components/auth/Register/Register.jsx';
import RegisterClient from './components/auth/Register/RegisterClient.jsx';
import JobPosting from './components/Client/JobPosting/JobPosting.jsx';
import Messages from './components/Client/Messages/Messages.jsx';
import DocumentsAndSocialLinks from './components/Hustler/Header/ProfileSetting/DocumentsAndSocialLinks.jsx';
import ExpCerti from './components/Hustler/Header/ProfileSetting/ExpCerti.jsx';
import Gigs from './components/Hustler/Header/ProfileSetting/Gigs.jsx';
import ProfileInfo from './components/Hustler/Header/ProfileSetting/PersonalInfo.jsx';
// import ProfileSettings from './components/Hustler/Header/ProfileSetting/ProfileSetting.jsx'
import PostGig from './components/Client/JobPosting/PostGig/PostGig.jsx';

import KnowOrganisations from './components/Guest/knowClient/KnowOrganisations.jsx';
import KnowHustler from './components/Guest/knowHustler/KnowHustler.jsx';
import FindWork from './components/Hustler/Header/findWork/FindWork.jsx';
import Organizations from './components/Hustler/Header/organizations/Organizations.jsx';
import Statistics from './components/Hustler/Header/ProfileSetting/Statistics.jsx';
import Resources from './components/Hustler/Header/resources/Resources.jsx';
import GuestLayout from './GuestLayout.jsx';
import HustlerLayout from './HustlerLayout.jsx';
import './index.css';
import ProfileSettingLayout from './ProfileSettingLayout.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element:<GuestLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="knowHustler" replace />
      },
      {
        path: 'knowHustler',
        element: <KnowHustler />
      },
      {
        path: 'knowOrganisations',
        element: <KnowOrganisations />
      }
    ]
  },
  {
    path: '/client',
    element:<ClientLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="JobPosting" replace />
      },
      
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
        index: true,
        element: <Navigate to="FindWork" replace />
      },
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
      {
        path: 'FindWork',
        element: <FindWork />
      },
      {
        path: 'Resources',
        element: <Resources />
      },
      {
        path: 'Organizations',
        element: <Organizations />
      }
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
