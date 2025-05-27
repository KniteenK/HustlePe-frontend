import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ClientLayout from './ClientLayout.js';
import Intermediate from './components/auth/Intermediate.js';
import Login from './components/auth/Login/Login.js';
import Register from './components/auth/Register/Register.js';
import RegisterClient from './components/auth/Register/RegisterClient.js';
import JobPosting from './components/Client/JobPosting/JobPosting.js';
import Messages from './components/Client/Messages/Messages.js';
import DocumentsAndSocialLinks from './components/Hustler/Header/ProfileSetting/DocumentsAndSocialLinks.js';
import ExpCerti from './components/Hustler/Header/ProfileSetting/ExpCerti.js';
import Gigs from './components/Hustler/Header/ProfileSetting/Gigs.js';
import ProfileInfo from './components/Hustler/Header/ProfileSetting/PersonalInfo.js';
// import ProfileSettings from './components/Hustler/Header/ProfileSetting/ProfileSetting.jsx'
import PostGig from './components/Client/JobPosting/PostGig/PostGig.js';

import KnowOrganisations from './components/Guest/knowClient/KnowOrganisations.js';
import KnowHustler from './components/Guest/knowHustler/KnowHustler.js';
import FindWork from './components/Hustler/Header/findWork/FindWork.js';
import Organizations from './components/Hustler/Header/organizations/Organizations.js';
import Statistics from './components/Hustler/Header/ProfileSetting/Statistics.js';
import Resources from './components/Hustler/Header/resources/Resources.js';
import GuestLayout from './GuestLayout.js';
import HustlerLayout from './HustlerLayout.js';
import './index.css';
import ProfileSettingLayout from './ProfileSettingLayout.js';
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
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />

  </React.StrictMode>,
)
