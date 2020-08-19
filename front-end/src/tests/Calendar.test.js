import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Provider} from 'react-redux'
import Calendar from '../components/Calendar';
import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers/rootReducer";
import { MemoryRouter } from "react-router";
import { loadJobs } from '../actions/jobs';
import { addOrRemoveToken } from '../actions/authentication';
import thunk from 'redux-thunk'
import moment from 'moment';

const jobs = {
    1 : {
        start_time : moment().add(-10, 'day'),
        end_time : moment().add(10, 'day'),
        group : 1,
        staff: [],
        staff_needed: 1,
        notes: "Test trip",
        status: 'under',
        title : '20 Day River'
    },
    2 : {
        start_time : moment().add(-5, 'day'),
        end_time : moment().add(-10, 'day'),
        group : 2,
        staff: [],
        status: 'under',
        title : '15 Day Mountain'
    }
}

const store = createStore( rootReducer, applyMiddleware(thunk));
store.dispatch(loadJobs(jobs)); 
store.dispatch(addOrRemoveToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRlbW8iLCJpc19hZG1pbiI6dHJ1ZSwiY29tcF9pZCI6MSwiaWF0IjoxNTk3NzY5NTYyfQ.Wm2z3GCj-m6DDWElCIBCuRxqBbc3_0QhJzeorsbz6E0")) ;

it('renders without crashing', () => {
   
  render(
    <MemoryRouter>
      <Provider store={store}>
      <Calendar />
      </Provider>
    </MemoryRouter>
)
});

it('matches snapshot', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <Provider store={store}>
                <Calendar />
            </Provider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})


it('renders jobs on the calendar', () => {
    const { getAllByText } = render(
        <MemoryRouter>
            <Provider store={store}>
                <Calendar />
            </Provider>
        </MemoryRouter>
    )
    expect(getAllByText('20 Day River')[1]).toBeInTheDocument();
    expect(getAllByText('15 Day Mountain')[1]).toBeInTheDocument();
})

