import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

/* Redirect to home page if a token is not present in redux store */

const ProtectedRoute = ({Component}) => {
    const token = useSelector(state => state.application.token);

    return token ? <Component /> : <Redirect to={{
        pathname: "/",
        state: {error: true}
      }} />
        
}

export default ProtectedRoute;
