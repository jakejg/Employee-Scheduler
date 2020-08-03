import React, { useState, useContext } from 'react';
import {useDispatch} from 'react-redux';
import {
    Grid,
    TextField,
    Box,
    Paper,
    Button
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {useHistory} from 'react-router-dom';
import underscoreName from '../helpers/underscoreName';


const AddForm = ({  type,
                    fields,
                    doOnSubmit,
                    redirect
                }) => {

    // set up form state and error state from fields passed in
    const INITIAL_FORM_STATE = {};
    const INITIAL_FORM_FIELDS_STATE = [];
    for (let field of fields){ 
        INITIAL_FORM_STATE[underscoreName(field)] = ""; 
        INITIAL_FORM_FIELDS_STATE.push({name:field, error: false})
    }

    
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [formFields, setFormFields] = useState(INITIAL_FORM_FIELDS_STATE);
    const [alert, setAlert] = useState();
    const dispatch = useDispatch()
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({...formData, [name]: value}))
    }


    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()){
            let msg = await dispatch(doOnSubmit(formData));
            if (msg){
                setAlert(alert => msg)
            }
            else{
                if (redirect) history.push(redirect);
            }
        }
        
    }

    const validate = () => {
        let foundErrors = false;
        const updated = formFields.map(field => {
            
            if (!formData[underscoreName(field.name)]) {
                field.error = "This field is required";
                foundErrors = true;
            }
            // remove errors
            else {
                field.error = false;
            }
            return field
        });
        if (foundErrors) {
            setFormFields(updated);
        }
        return foundErrors;
    }

    // mx={{sm:'auto'}} width={{sm:'40%'}} mt={3}
    return (
        <form onSubmit={handleSubmit} >
            <Box  >
            <Paper>
            <Grid container >
                <Box  mx='auto' m={1}>
                {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
                {formFields.map(field => {
                                    let type = "text";
                                    if (field.name.endsWith('Date')) type = "date";
                                    if (field.name === "Password") type = "password";
                                    if (field.name.endsWith('Wage')) type = "number";
                                    if (field.name.endsWith('Company')) type = "number";
                                    return (<Grid item key={field.name}> 
                                        <TextField 
                                                    error={field.error ? true: false}
                                                    id={field.name}
                                                    type={type}
                                                    label={field.name}
                                                    // change name format for sending to backend
                                                    name={underscoreName(field.name)}
                                                    value={formData.underscoreName}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                    margin="normal"
                                                    helperText={field.error}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                      }}
                                                    />
                                    </Grid>)}
                )}
                <Button variant="contained" color="primary" type="submit">Add {type}</Button>
                </Box>
            </Grid> 
            </Paper> 
            </Box>
           
        </form>
    )
}

export default AddForm;