import React from 'react';
import { render } from '@testing-library/react';
import {Provider} from 'react-redux'
import JobList from '../components/JobList';
import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers/rootReducer";
import { MemoryRouter } from "react-router";
import { loadJobs } from '../actions/jobs';
import thunk from 'redux-thunk'
import moment from 'moment';

const jobs = {
    1 : {
        start_time : moment('2020-10-04'),
        end_time : moment('2020-10-24'),
        group : 1,
        staff: [],
        status: 'under',
        title : '20 Day River'
    },
    2 : {
        start_time : moment('2020-10-15'),
        end_time : moment('2020-10-30'),
        group : 2,
        staff: [],
        status: 'under',
        title : '15 Day Mountain'
    }
}

const store = createStore( rootReducer, applyMiddleware(thunk));
store.dispatch(loadJobs(jobs)); 

it('renders without crashing', () => {

  render(
    <MemoryRouter>
      <Provider store={store}>
      <JobList />
      </Provider>
    </MemoryRouter>
)
});

it('matches snapshot', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <Provider store={store}>
                <JobList />
            </Provider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})


it('renders a list of jobs', () => {
    const { getByText } = render(
        <MemoryRouter>
            <Provider store={store}>
                <JobList />
            </Provider>
        </MemoryRouter>
    )
    expect(getByText('20 Day River')).toBeInTheDocument();
    expect(getByText('15 Day Mountain')).toBeInTheDocument();
})