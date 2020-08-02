import {
    CHANGE_DRAWER,
    ADD_OR_REMOVE_TOKEN
} from '../actions/actionTypes';

let INITIAL_STATE = {
                        drawer: false, 
                        token: JSON.parse(localStorage.getItem('token'))
                    }

const applicationReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case CHANGE_DRAWER:
    
            return {...state, drawer: !state.drawer}

        case ADD_OR_REMOVE_TOKEN:
            // update local storage

            localStorage.setItem('token', JSON.stringify(action.token))
            console.log("local storage updated")
            return {...state, token: action.token}

        default: 
            return state;
    }
}

export default applicationReducer;