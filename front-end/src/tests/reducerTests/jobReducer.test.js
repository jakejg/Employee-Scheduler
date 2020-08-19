import jobsReducer from '../../Reducers/jobsReducer';
import { LOAD_JOBS, EDIT_JOB, EDIT_JOB_STAFF, ADD_JOB, DELETE_JOB } from '../../actions/actionTypes';
import { jobs, fullJobDetails1, staffList } from '../testData';
import moment from 'moment';

test('can load jobs', () => {
    expect(jobsReducer({}, {type: LOAD_JOBS, jobs})).toEqual(jobs)
})

test('can edit a job', () => {
    expect(jobsReducer(jobs, {type: EDIT_JOB, id: 1, job: fullJobDetails1})).toEqual({...jobs, 1: fullJobDetails1})
})

test('can edit job staff', () => {
    expect(jobsReducer(jobs, {type: EDIT_JOB_STAFF, id: 1, staff: staffList, status: 'under'})).toEqual({...jobs, 1: {...jobs[1], staff: staffList}})
})

test('can add a job', () => {
    const newJob = {
        id: 3,
        start_time : moment('2020-10-15'),
        end_time : moment('2020-10-30'),
        group : 2,
        staff: [],
        status: 'under',
        title : '15 Day Mountain'
    }
    expect(jobsReducer(jobs, {type: ADD_JOB, id: 3, job:newJob})).toEqual({...jobs, 3: newJob})
})

test('can delete a job', () => {
    expect(jobsReducer(jobs, {type: DELETE_JOB, id: 2,})).toEqual({1 :jobs[1]})
})
