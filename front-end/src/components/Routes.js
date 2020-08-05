import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Calendar from './Calendar';
import Job from './Job';
import Dashboard from './Dashboard';
import Staff from './Staff';
import Home from './Home'
import NavBar from './NavBar';
import ProtectedRoute from './ProtectedRoute';

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
                <ProtectedRoute Component={Calendar} />
            </Route> 
            <Route exact path='/job/:id'>
                <NavBar/>
                <ProtectedRoute Component={Job} />
            </Route>
            <Route exact path='/staff/:id'>
                <NavBar/>
                <ProtectedRoute Component={Staff} />
            </Route> 
            <Route exact path='/dashboard'>
                <NavBar onDashboard={true} />
                <ProtectedRoute Component={Dashboard} />
            </Route>
            
        </Switch>
        </>
        );
}

export default Routes;
