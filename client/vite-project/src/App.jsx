import React from 'react';
import Header from './components/header/Header';
import Pages from './components/main pages/Pages';

import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from './GlobalState';
import './styles/App.css';

function App() {
    return (
        <DataProvider>
            <Router>
                <div>
                    <Header />
                    <Pages />
                </div>
            </Router>
        </DataProvider>
    );
}

export default App;
