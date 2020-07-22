import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {
    Grid,
    TextField,
    Box,
    Paper,
    Button
} from '@material-ui/core';


const AddForm = ({  type,
                    fields,
                    addToDb
                }) => {

    // set up form state from fields passed in
    const INITIAL_STATE = {};
    for (let field of fields){ 
        INITIAL_STATE[field.toLowerCase().replace(' ', '_')] = ""; 
    }
    
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({...formData, [name]: value}))
    }

    

    
    const handleSubmit = async (e, method) => {
        e.preventDefault();
       dispatch(addToDb(formData));
    }


   

    // const error = errors.map(error => <Alert key={error} color="danger" className="mt-3" >{error.replace('instance.', '')}</Alert>);

    return (
        <form>
            <Box mx={{sm:'auto'}} width={{sm:'40%'}} mt={3} >
            <Paper>
            <Grid container >
                <Box mx='auto' m={2}>
                {fields.map(field => {
                                    // change name format for sending to backend
                                    const underscoreName = field.toLowerCase().replace(' ', '_');
                                    return (<Grid item> 
                                        <TextField key={field}
                                                    id={field}
                                                    type={field.endsWith('Date') ? "date": "text"} 
                                                    label={field}
                                                    name={underscoreName}
                                                    value={formData.underscoreName}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    margin="normal"
                                                    />
                                    </Grid>)}
                )}
                <Button variant="contained" color="primary" onClick={handleSubmit}>Add {type}</Button>
                </Box>
            </Grid> 
            </Paper> 
            </Box>
           
        </form>
    )
}

export default AddForm;