import React, { useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { changeNoJobs } from '../actions/application';
import { changeNoStaff } from '../actions/application';
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
                    redirect,
                    closeDialog
                }) => {

    // set up form state and error state from fields passed in
    const INITIAL_FORM_STATE = {};
    const INITIAL_FORM_FIELDS_STATE = [];
    for (let field of fields){ 
        INITIAL_FORM_STATE[underscoreName(field)] = ""; 
        INITIAL_FORM_FIELDS_STATE.push({name: field, error: false})
    }

    
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [formFields, setFormFields] = useState(INITIAL_FORM_FIELDS_STATE);
    const [alert, setAlert] = useState();
    const dispatch = useDispatch()
    const history = useHistory();
    const noJobs = useSelector(state => state.application.noJobs);
    const noStaff = useSelector(state => state.application.noStaff);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({...formData, [name]: value}))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()){
            let msg = await dispatch(doOnSubmit(formData));

            if (msg){
                setAlert(alert => msg);
                //reset form data
                if (msg.message.includes('created Successfully')){
                Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = "")
                  );
                setFormData(formData => INITIAL_FORM_STATE);
                }
               
               
            }
            else{
                if (redirect) {
                    closeDialog();
                    history.push(redirect);
                }
            }
            if (noJobs && type === 'Job'){
                dispatch(changeNoJobs())
            }
            if (noStaff && type === 'Staff'){
                dispatch(changeNoStaff())
            }
            
        }
        
    }

    // check that every field is filled out
    const validate = () => {
        let foundErrors = false;
        let notRequiredFields = new Set(["notes"])
        const updated = formFields.map(field => {
            const name = underscoreName(field.name)
            if (formData[name] === "" && !notRequiredFields.has(name)) {
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
                                    if (field.name.endsWith('Wage') ||
                                        field.name.endsWith('Company') ||
                                        field.name.endsWith('Needed')){
                                            type = "number";
                                        }
                
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
                {type === 'Job' || type === 'Staff' ?
                <Button variant="contained" color={type === 'job' ? 'primary' : 'secondary'} type="submit"> Add {type}</Button> 
                :
                <Button variant="contained" type="submit">{type}</Button>
                }
                </Box>
            </Grid> 
            </Paper> 
            </Box>
           
        </form>
    )
}

export default AddForm;