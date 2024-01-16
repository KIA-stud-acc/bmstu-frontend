import React from 'react'
import ReactDOM from 'react-dom/client'
import VoteList from './VoteList.tsx'
import VotingPage from './Voting.tsx'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar'
import RegistrationPage from './registrationPage.tsx'
import AuthPage from './authPage.tsx'
import store from "./store";
import { Provider } from "react-redux";



const router = createBrowserRouter(
  [
  {
    path: '/bmstu-frontend/',
    element: <Outlet/>,
    children: [
  {
    path: '/bmstu-frontend/vybory',
    element: <VoteList/>
  },
  {
    path: '/bmstu-frontend/vybory/:id',
    element: <VotingPage/>
  },
  {
    path: '/bmstu-frontend/auth',
    element: <AuthPage/>
  },
  {
    path: '/bmstu-frontend/auth/reg',
    element: <RegistrationPage/>
  },
]
}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <NavBar/>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)