import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Calender from './Calender';
import Job from './Job';
import Dashboard from './Dashboard';
import Staff from './Staff';
import Home from './Home'

const Routes = () => {
 

    return (
        <Switch>
            <Route exact path='/'>
                <Home />  
            </Route> 
           <Route exact path='/calendar'>
                <Calender />  
            </Route> 
            <Route exact path='/job/:id'>
                <Job />  
            </Route>
            <Route exact path='/staff/:id'>
                <Staff />  
            </Route> 
            <Route exact path='/dashboard'>
                <Dashboard />
            </Route> 

        </Switch>
        );
}

export default Routes;
