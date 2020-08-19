import staffReducer from '../../Reducers/StaffReducer';
import { LOAD_STAFF, EDIT_STAFF, ADD_STAFF, DELETE_STAFF } from '../../actions/actionTypes';
import {staff, fullStaffDetails1} from '../testData';

test('can load staff', () => {
    expect(staffReducer({}, {type: LOAD_STAFF, staff})).toEqual(staff)
})

test('can edit a staff', () => {
    expect(staffReducer(staff, {type: EDIT_STAFF, id: 1, staff: fullStaffDetails1})).toEqual({...staff, 1: fullStaffDetails1})
})


test('can add a staff', () => {
    const newStaff = {
        id : 3,
        first_name: "Jessica",
        last_name: "Whitman",
        isWorking: false,
        past_jobs: [],
        scheduled_jobs: []
    }
    expect(staffReducer(staff, {type: ADD_STAFF, id: 3, staff:newStaff})).toEqual({...staff, 3: newStaff})
})

test('can delete a staff', () => {
    expect(staffReducer(staff, {type: DELETE_STAFF, id: 2,})).toEqual({1 :staff[1]})
})
