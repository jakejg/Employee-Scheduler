import React from 'react';
import NavBar from './NavBar';
import Routes from './Routes'
import JobList from './JobList';

function App() {

    return (
        <div className="App">
            <NavBar/>
            <JobList />
            <Routes />      
        </div>
        );
}

export default App;
