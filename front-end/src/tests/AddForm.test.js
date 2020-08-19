import React from 'react';
import { render, fireEvent, act, within } from '@testing-library/react';
import {Provider} from 'react-redux'
import AddForm from '../components/AddForm';
import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers/rootReducer";
import { MemoryRouter } from "react-router";
import { addStaffOnAPI } from '../actions/staff';
import { addOrRemoveToken } from '../actions/authentication';
import thunk from 'redux-thunk'
import moment from 'moment';

const store = createStore( rootReducer, applyMiddleware(thunk));
store.dispatch(addOrRemoveToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRlbW8iLCJpc19hZG1pbiI6dHJ1ZSwiY29tcF9pZCI6MSwiaWF0IjoxNTk3NzY5NTYyfQ.Wm2z3GCj-m6DDWElCIBCuRxqBbc3_0QhJzeorsbz6E0")); 

const jobFields = ['Title', 'Start Date','End Date', 'Staff Needed', 'Notes'];
const staffFields = ['Email', 'First Name','Last Name', 'Current Wage', 'Years At Company'];

it('renders without crashing', () => {
   
  render(
    <MemoryRouter>
      <Provider store={store}>
      <AddForm
            type='Staff'
            fields={staffFields}
            doOnSubmit={addStaffOnAPI} />
      </Provider>
    </MemoryRouter>
)
});

it('matches snapshot', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <Provider store={store}>
                <AddForm
                    type='Staff'
                    fields={staffFields}
                    doOnSubmit={addStaffOnAPI} />
            </Provider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})





it('it should add a staff to the DOM', async () => {
    const { getByLabelText, getByText} = render(<Provider store={store}>
        <AddForm
            type='Staff'
            fields={staffFields}
            doOnSubmit={addStaffOnAPI} />
    </Provider>);
    const emailInput = getByLabelText("Email");
    console.log(emailInput);
    const firstNameInput = getByLabelText("First Name");
    const lastNameInput = getByLabelText("Last Name");
    const wageInput = getByLabelText("Current Wage");
    const yearsInput = getByLabelText("Years At Company");
    const btn = getByText("Add Staff");
    await act(async () => {
    fireEvent.change(emailInput, {target: {value: "test@t.com"}});
    console.log(emailInput)
    fireEvent.change(firstNameInput, {target: {value: "Nick"}});
    fireEvent.change(lastNameInput, {target: {value: "Jones"}});
    fireEvent.change(wageInput, {target: {value: 140}});
    fireEvent.change(yearsInput, {target: {value: 3}});
    fireEvent.submit(btn);  
      });


  
    expect(getByText("Staff Added Successfully")).toBeInTheDocument();
  
  })