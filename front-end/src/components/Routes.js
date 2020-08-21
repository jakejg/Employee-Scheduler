import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Calendar from './Calendar';
import Job from './jobComponents/Job';
import Dashboard from './Dashboard';
import Staff from './staffComponents/Staff';
import Home from './Home'
import NavBar from './NavBar';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './NotFound';

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
                <NavBar />
                <ProtectedRoute Component={Staff} />
            </Route> 
            <Route exact path='/dashboard'>
                <NavBar  />
                <ProtectedRoute Component={Dashboard} />
            </Route>
            <Route>
                <NavBar />
                <NotFound />
            </Route>

            
        </Switch>
        </>
        );
}

export default Routes;
