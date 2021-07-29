import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import LoginScreen from './login-screen';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

const mockStore = configureStore({});
const SendingStatus = {
  INITIAL: `INITIAL`,
  FETCHING: `FETCHING`,
  SUCCESS: `SUCCESS`,
  FAILURE: `FAILURE`,
};
const fakeStore = {
  user: [],
  sendingDataStatus: SendingStatus.FAILURE,
  authorizationStatus: null,
};
it(`LoginScreen should render correctly`, () => {
  const store = mockStore(fakeStore);
  const history = createMemoryHistory();

  const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <LoginScreen />
        </Router>
      </Provider>
  );
  expect(container).toMatchSnapshot();
});
