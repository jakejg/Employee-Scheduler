import React from 'react';
import AddForm from './AddForm'
import {addJobOnAPI} from '../actions/jobs'

const Form = () => {
   
    return (
        <AddForm type='Job'
                fields={['Title', 'Start Date','End Date', 'Number of Staff Needed', 'Notes']}
                addToDb={addJobOnAPI} />
                
    )
}

export default Form