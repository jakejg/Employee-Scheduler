import React from 'react';
import AddForm from './AddForm'
import {addJobOnAPI} from '../actions/jobs';
import {addStaffOnAPI} from '../actions/staff'

const Form = () => {
   
    return (
        // <AddForm type='Job'
        //         fields={['Title', 'Start Date','End Date', 'Staff Needed', 'Notes']}
        //         addToDb={addJobOnAPI} />
        <AddForm type='Staff'
        fields={['Username', 'First Name','Last Name', 'Current Wage', 'Years At Company']}
        addToDb={addStaffOnAPI} />
                
    )
}

export default Form