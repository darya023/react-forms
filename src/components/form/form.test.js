import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import Form from './form';

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
const SigninFormErrorText = {
  EMAIL: `Пожалуйста, введите корректный адрес электронной почты`,
  PASSWORD: `Пожалуйста, введите пароль`,
};
let history;
describe(`Form should work correctly`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });
  it(`When user write text in input it should be updated`, () => {
    const store = mockStore(fakeStore);
    render(
        <Provider store={store}>
          <Router history={history}>
            <Form />
          </Router>
        </Provider>
    );

    const input = screen.getByPlaceholderText(/example@mail.ru/i);

    userEvent.type(input, `test@test.ru`);
    expect(input).toHaveValue(`test@test.ru`);
  });
  it(`Form's elements should be disabled if data is sending`, () => {
    const fakeStoreWithFetchingSendingDataStatus = {
      ...fakeStore,
      sendingDataStatus: SendingStatus.FETCHING
    };
    const store = mockStore(fakeStoreWithFetchingSendingDataStatus);

    render(
        <Provider store={store}>
          <Router history={history}>
            <Form />
          </Router>
        </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/example@mail.ru/i);
    const passwordInput = screen.getByPlaceholderText(/Пароль/i);
    const button = screen.getByRole(`button`, {name: /Отправка.../i});

    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(button).toBeDisabled();
  });
  it(`Form should be invalid if user submit invalid email value`, () => {
    const store = mockStore(fakeStore);

    render(
        <Provider store={store}>
          <Router history={history}>
            <Form />
          </Router>
        </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/example@mail.ru/i);

    userEvent.type(emailInput, `test@test`);
    userEvent.click(screen.getByRole(`button`, {name: /Войти/i}));
    expect(emailInput).toHaveClass(`form__input_invalid`);
    expect(document.querySelector(`form`)).toHaveClass(`shake`);
    expect(screen.getByText(SigninFormErrorText.EMAIL)).toBeInTheDocument();
  });
  it(`Invalid Form's field should remove invalid class when user changes it`, () => {
    const store = mockStore(fakeStore);

    render(
        <Provider store={store}>
          <Router history={history}>
            <Form />
          </Router>
        </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/example@mail.ru/i);

    userEvent.type(emailInput, `test@test`);
    userEvent.click(screen.getByRole(`button`, {name: /Войти/i}));
    expect(emailInput).toHaveClass(`form__input_invalid`);
    expect(document.querySelector(`form`)).toHaveClass(`shake`);

    const errorFormMessage = screen.queryByText(SigninFormErrorText.EMAIL);

    expect(errorFormMessage).toBeInTheDocument();
    userEvent.type(emailInput, `test@test.test`);
    expect(emailInput).not.toHaveClass(`form__input_invalid`);
    expect(errorFormMessage).not.toBeInTheDocument();
  });
  it(`Form's class "shake" should remove after 600ms`, () => {
    jest.useFakeTimers();

    const store = mockStore(fakeStore);

    render(
        <Provider store={store}>
          <Router history={history}>
            <Form />
          </Router>
        </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/example@mail.ru/i);
    const form = document.querySelector(`form`);

    userEvent.type(emailInput, `test@test`);
    userEvent.click(screen.getByRole(`button`, {name: /Войти/i}));
    jest.advanceTimersByTime(600);
    expect(emailInput).toHaveClass(`form__input_invalid`);
    expect(form).not.toHaveClass(`shake`);
    expect(screen.getByText(SigninFormErrorText.EMAIL)).toBeInTheDocument();
  }, 600);
  it(`Form should be invalid if user submit an empty form`, () => {
    const store = mockStore(fakeStore);

    render(
        <Provider store={store}>
          <Router history={history}>
            <Form />
          </Router>
        </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/example@mail.ru/i);

    userEvent.click(screen.getByRole(`button`, {name: /Войти/i}));
    expect(emailInput).toHaveClass(`form__input_invalid`);
    expect(document.querySelector(`form`)).toHaveClass(`shake`);
    expect(screen.getByText(SigninFormErrorText.EMAIL)).toBeInTheDocument();
  });
  it(`Form should be invalid if user submit empty password field`, () => {
    const store = mockStore(fakeStore);

    render(
        <Provider store={store}>
          <Router history={history}>
            <Form />
          </Router>
        </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/example@mail.ru/i);
    const passwordInput = screen.getByPlaceholderText(/Пароль/i);

    userEvent.type(emailInput, `test@test.test`);
    userEvent.click(screen.getByRole(`button`, {name: /Войти/i}));
    expect(passwordInput).toHaveClass(`form__input_invalid`);
    expect(document.querySelector(`form`)).toHaveClass(`shake`);
    expect(screen.getByText(SigninFormErrorText.PASSWORD)).toBeInTheDocument();
  });
});
