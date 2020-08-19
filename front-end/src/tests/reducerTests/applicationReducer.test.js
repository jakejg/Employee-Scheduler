import applicationReducer from '../../Reducers/applicationReducer';
import { CHANGE_DRAWER, ADD_OR_REMOVE_TOKEN } from '../../actions/actionTypes';

const INITIAL_STATE = {
    drawer: false, 
    token: JSON.parse(localStorage.getItem('token')), 
    noJobs: false,
    noStaff: false
}

test('can change drawer state', () => {
    expect(applicationReducer(INITIAL_STATE, {type: CHANGE_DRAWER})).toEqual({...INITIAL_STATE, drawer: true})
})

test('can add token and save to local storage', () => {
    expect(applicationReducer(INITIAL_STATE, {type: ADD_OR_REMOVE_TOKEN, token: 'test_token'})).toEqual({...INITIAL_STATE, token: 'test_token'})
    expect(JSON.parse(localStorage.getItem('token'))).toEqual('test_token');
})
