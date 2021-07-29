import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import LoginScreen from './login-screen';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';

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
describe(`LoginScreen should work correctly`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });
  it(`LoginScreen should render Error text`, () => {
    const fakeStoreWithFailureSendingDataStatus = {
      ...fakeStore,
      sendingDataStatus: SendingStatus.FAILURE
    };
    const store = mockStore(fakeStoreWithFailureSendingDataStatus);

    render(
        <Provider store={store}>
          <Router history={history}>
            <LoginScreen />
          </Router>
        </Provider>
    );
    expect(screen.getByText(ERROR_TEXT)).toBeInTheDocument();
  });
  it(`LoginScreen should not render Error text`, () => {
    const fakeStoreWithSuccessSendingDataStatus = {
      ...fakeStore,
      sendingDataStatus: SendingStatus.SUCCESS
    };
    const store = mockStore(fakeStoreWithSuccessSendingDataStatus);

    render(
        <Provider store={store}>
          <Router history={history}>
            <LoginScreen />
          </Router>
        </Provider>
    );
    expect(screen.queryByText(ERROR_TEXT)).not.toBeInTheDocument();
  });
  it(`LoginScreen should redirect to main screen when user fill form's inputs and click on submit button`, () => {
    const store = mockStore(fakeStore);
    const fakeDispatch = jest.fn();
    jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

    render(
        <Provider store={store}>
          <Router history={history}>
            <LoginScreen />
          </Router>
        </Provider>
    );

    userEvent.type(screen.getByPlaceholderText(/example@mail.ru/i), `test@test.ru`);
    userEvent.type(screen.getByPlaceholderText(/Пароль/i), `password`);
    userEvent.click(screen.getByRole(`button`, {name: /Войти/i}));
    expect(fakeDispatch).toHaveBeenCalled();
  });
});
