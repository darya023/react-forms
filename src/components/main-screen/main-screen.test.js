import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import MainScreen from './main-screen';

const ERROR_TEXT = `Что-то пошло не так. Попробуйте позже.`;
const mockStore = configureStore({});
const SendingStatus = {
  INITIAL: `INITIAL`,
  FETCHING: `FETCHING`,
  SUCCESS: `SUCCESS`,
  FAILURE: `FAILURE`,
};
const fakeStore = {
  user: [],
  sendingDataStatus: SendingStatus.INITIAL,
  authorizationStatus: null,
};
let history;
describe(`MainScreen should work correctly`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });
  it(`MainScreen should render Error text`, () => {
    const fakeStoreWithFailureSendingDataStatus = {
      ...fakeStore,
      sendingDataStatus: SendingStatus.FAILURE
    };
    const store = mockStore(fakeStoreWithFailureSendingDataStatus);

    render(
        <Provider store={store}>
          <Router history={history}>
            <MainScreen />
          </Router>
        </Provider>
    );
    expect(screen.getByText(ERROR_TEXT)).toBeInTheDocument();
  });
  it(`MainScreen should render user email`, () => {
    const fakeStoreWithFailureSendingDataStatus = {
      ...fakeStore,
      user: {
        email: `test@test.test`,
        password: `test`
      },
      authorizationStatus: true
    };
    const store = mockStore(fakeStoreWithFailureSendingDataStatus);

    render(
        <Provider store={store}>
          <Router history={history}>
            <MainScreen />
          </Router>
        </Provider>
    );
    expect(screen.getByText(/Пользователь: test@test.test/i)).toBeInTheDocument();
  });
  it(`MainScreen should not render user email`, () => {
    const fakeStoreWithFailureSendingDataStatus = {
      ...fakeStore,
      user: {
        email: `test@test.test`,
        password: `test`
      },
    };
    const store = mockStore(fakeStoreWithFailureSendingDataStatus);

    render(
        <Provider store={store}>
          <Router history={history}>
            <MainScreen />
          </Router>
        </Provider>
    );
    expect(screen.queryByText(/Пользователь: test@test.test/i)).not.toBeInTheDocument();
  });
});
