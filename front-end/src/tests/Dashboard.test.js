import React from 'react';
import { render } from '@testing-library/react';
import {Provider} from 'react-redux'
import Dashboard from '../components/Dashboard';
import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers/rootReducer";
import { MemoryRouter } from "react-router";
import { addOrRemoveToken } from '../actions/authentication';
import thunk from 'redux-thunk'

const store = createStore( rootReducer, applyMiddleware(thunk));
store.dispatch(addOrRemoveToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRlbW8iLCJpc19hZG1pbiI6dHJ1ZSwiY29tcF9pZCI6MSwiaWF0IjoxNTk3NzY5NTYyfQ.Wm2z3GCj-m6DDWElCIBCuRxqBbc3_0QhJzeorsbz6E0")) 

it('renders without crashing', () => {

  render(
    <MemoryRouter>
      <Provider store={store}>
      <Dashboard />
      </Provider>
    </MemoryRouter>
)
});

it('matches snapshot', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <Provider store={store}>
                <Dashboard />
            </Provider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot();
})