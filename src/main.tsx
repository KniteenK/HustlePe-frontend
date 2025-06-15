import React from 'react';

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ClientLayout from './layouts/ClientLayout';
import Intermediate from './components/auth/Intermediate';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import RegisterClient from './components/auth/Register/RegisterClient';
import JobPosting from './components/Client/JobPosting/JobPosting';
import DocumentsAndSocialLinks from './components/Hustler/Header/ProfileSetting/DocumentsAndSocialLinks';
import ExpCerti from './components/Hustler/Header/ProfileSetting/ExpCerti';
import Gigs from './components/Hustler/Header/ProfileSetting/Gigs';
import ProfileInfo from './components/Hustler/Header/ProfileSetting/PersonalInfo';
// import ProfileSettings from './components/Hustler/Header/ProfileSetting/ProfileSetting.jsx'
import PostGig from './components/Client/JobPosting/PostGig/PostGig';

import KnowOrganisations from './components/Guest/knowClient/KnowOrganisations';
import KnowHustler from './components/Guest/knowHustler/KnowHustler';
import FindWork from './components/Hustler/Header/findWork/FindWork';
import Organizations from './components/Hustler/Header/organizations/Organizations';
import Statistics from './components/Hustler/Header/ProfileSetting/Statistics';
import Resources from './components/Hustler/Header/resources/resources.js';
import GuestLayout from './layouts/GuestLayout.js';
import HustlerLayout from './layouts/HustlerLayout.js';
import './index.css'
import Messages from './components/Hustler/Header/Messages/Messages.js';
import ProfileSettingLayout from './layouts/ProfileSettingLayout.js';
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
        path: 'Messages',
        element: <Messages />
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
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />

  </React.StrictMode>,
)
