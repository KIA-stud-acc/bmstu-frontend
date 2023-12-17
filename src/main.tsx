import React from 'react'
import ReactDOM from 'react-dom/client'
import VoteList from './VoteList.tsx'
import VotingPage from './Voting.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar'

const router = createBrowserRouter([
  {
    path: '/vybory/:id',
    element: <VotingPage/>
  },
  {
    path: '/vybory',
    element: <VoteList/>
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavBar/>
    <RouterProvider router={router} />
  </React.StrictMode>,
)