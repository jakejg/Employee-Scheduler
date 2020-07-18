import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Calender from './Calender';

const Routes = () => {
 

    return (
        <Switch>
           <Route exact path='/calendar'>
                <Calender />  
            </Route>       

        </Switch>
        );
}

export default Routes;
