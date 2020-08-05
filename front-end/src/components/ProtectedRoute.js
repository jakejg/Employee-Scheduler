import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {decode} from 'jsonwebtoken';

/* Redirect to home page if token is not present in redux store
    or user is not an admin */

const ProtectedRoute = ({Component}) => {
    const token = useSelector(state => state.application.token);
    let isAdmin;
    if (token){
        isAdmin = decode(token).is_admin
    }

    return isAdmin ? <Component /> : <Redirect to={{
        pathname: "/",
        state: {error: true}
      }} />
        
}

export default ProtectedRoute;
