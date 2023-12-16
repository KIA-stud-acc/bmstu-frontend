

import React from 'react'

import VoteList from './VoteList.tsx'
import VotingPage from './Voting.tsx';
import BasicExample from './components/navbar'
import {BrowserRouter as HashRouter,Route,Routes} from 'react-router-dom'
//import Header from "./Header.tsx";
const App: React.FC = () => {
    return (
        <HashRouter>
            <BasicExample></BasicExample>
            <Routes>
                <Route path="/vybory/" element={<VoteList/>}/>
                <Route path="/vybory/:id" element={<VotingPage/>}/>
            </Routes>
        </HashRouter>

    );
};

export default App;