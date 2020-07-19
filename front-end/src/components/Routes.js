import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Calender from './Calender';
import Job from './Job';

const Routes = () => {
 

    return (
        <Switch>
           <Route exact path='/calendar'>
                <Calender />  
            </Route> 
            <Route exact path='/job/:id'>
                <Job />  
            </Route> 


        </Switch>
        );
}

export default Routes;
