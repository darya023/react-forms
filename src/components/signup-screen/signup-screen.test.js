import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import SignupScreen from './signup-screen';
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
describe(`SignupScreen should work correctly`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });
  it(`SignupScreen should render Error text`, () => {
    const fakeStoreWithFailureSendingDataStatus = {
      ...fakeStore,
      sendingDataStatus: SendingStatus.FAILURE
    };

    const store = mockStore(fakeStoreWithFailureSendingDataStatus);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <SignupScreen />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByText(ERROR_TEXT)).toBeInTheDocument();
  });
  it(`SignupScreen should not render Error text`, () => {
    const fakeStoreWithSuccessSendingDataStatus = {
      ...fakeStore,
      sendingDataStatus: SendingStatus.SUCCESS
    };
    const store = mockStore(fakeStoreWithSuccessSendingDataStatus);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <SignupScreen />
          </Router>
        </redux.Provider>
    );
    expect(screen.queryByText(ERROR_TEXT)).not.toBeInTheDocument();
  });
  it(`SignupScreen should redirect to main screen when user fill form's inputs and click on submit button`, () => {
    const store = mockStore(fakeStore);
    const fakeDispatch = jest.fn();
    jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <SignupScreen />
          </Router>
        </redux.Provider>
    );

    userEvent.type(screen.getByPlaceholderText(/example@mail.ru/i), `test@test.ru`);
    userEvent.type(screen.getAllByPlaceholderText(/Пароль/i)[0], `password`);
    userEvent.type(screen.getAllByPlaceholderText(/Пароль/i)[1], `password`);
    userEvent.click(screen.getByRole(`button`, {name: /Зарегистрироваться/i}));
    expect(fakeDispatch).toHaveBeenCalled();
  });
});
