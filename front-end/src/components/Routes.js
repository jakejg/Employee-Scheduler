import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Calender from './Calender';
import Job from './Job';
import Dashboard from './Dashboard';
import Staff from './Staff';
import Home from './Home'
import NavBar from './NavBar';
import { changeDrawer } from '../actions/drawer';

const Routes = () => {

    return (
        <>
        <Switch>
            <Route exact path='/'>
                <NavBar/>
                <Home />  
            </Route> 
           <Route exact path='/calendar'>
                <NavBar/>
                <Calender />  
            </Route> 
            <Route exact path='/job/:id'>
                <NavBar/>
                <Job />  
            </Route>
            <Route exact path='/staff/:id'>
                <NavBar/>
                <Staff />  
            </Route> 
            <Route exact path='/dashboard'>
                <NavBar onDashboard={true}/>
                <Dashboard />
            </Route> 

        </Switch>
        </>
        );
}

export default Routes;
