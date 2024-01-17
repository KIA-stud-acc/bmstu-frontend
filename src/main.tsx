import React from 'react'
import ReactDOM from 'react-dom/client'
import VoteList from './VoteList.tsx'
import VotingPage from './Voting.tsx'
import ApplList from './applList.tsx'
import {BrowserRouter as HashRouter,Route,Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar'
import RegistrationPage from './registrationPage.tsx'
import AuthPage from './authPage.tsx'
import store from "./store";
import { Provider } from "react-redux";
import DraftAppl from './draftAppl.tsx'

/*
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
])*/


const App: React.FC = () => {
  return (
      <HashRouter>
      <NavBar/>
          <Routes>
              <Route path="/bmstu-frontend/" element={<VoteList/>}/>
              <Route path="/bmstu-frontend/applications" element={<ApplList/>} />
              <Route path="/bmstu-frontend/applications/:id" element={<DraftAppl/>} />
              <Route path="/bmstu-frontend/vybory" element={<VoteList/>}/>
              <Route path="/bmstu-frontend/vybory/:id" element={<VotingPage/>} />
              <Route path="/bmstu-frontend/auth" element={<AuthPage/>}/>
              <Route path="/bmstu-frontend/auth/reg" element={<RegistrationPage/>} />
          </Routes>
      </HashRouter>

  );
};


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
)
