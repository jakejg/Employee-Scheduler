import React from 'react';
import { render } from '@testing-library/react';
import {Provider} from 'react-redux'
import StaffList from '../components/StaffList';
import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers/rootReducer";
import { MemoryRouter } from "react-router";
import { loadStaff } from '../actions/staff';
import thunk from 'redux-thunk'

const staff = {
    1 : {
        first_name: "Stacey",
        last_name: "Lopez"
    },
    2 : {
        first_name: "Jon",
        last_name: "Martin"
    }
}

const store = createStore( rootReducer, applyMiddleware(thunk));
store.dispatch(loadStaff(staff)); 

it('renders without crashing', () => {

  render(
    <MemoryRouter>
      <Provider store={store}>
      <StaffList />
      </Provider>
    </MemoryRouter>
)
});

it('matches snapshot', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <Provider store={store}>
                <StaffList />
            </Provider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})


it('renders a list of staff', () => {
    const { getByText } = render(
        <MemoryRouter>
            <Provider store={store}>
                <StaffList />
            </Provider>
        </MemoryRouter>
    )
    expect(getByText('Stacey Lopez')).toBeInTheDocument();
    expect(getByText('Jon Martin')).toBeInTheDocument();
});