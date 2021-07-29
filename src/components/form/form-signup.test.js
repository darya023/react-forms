import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import FormSignup from './form-signup';

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
  CONFIRMED_PASSWORD: `Пароли не совпадают`,
};
let history;
describe(`FormSignup should work correctly`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });
  it(`FormSignup's elements should be disabled if data is sending`, () => {
    const fakeStoreWithFetchingSendingDataStatus = {
      ...fakeStore,
      sendingDataStatus: SendingStatus.FETCHING
    };
    const store = mockStore(fakeStoreWithFetchingSendingDataStatus);

    render(
        <Provider store={store}>
          <Router history={history}>
            <FormSignup />
          </Router>
        </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/example@mail.ru/i);
    const passwordInput = screen.getAllByPlaceholderText(/Пароль/i)[0];
    const confirmedPasswordInput = screen.getAllByPlaceholderText(/Пароль/i)[1];
    const button = screen.getByRole(`button`, {name: /Отправка.../i});

    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(confirmedPasswordInput).toBeDisabled();
    expect(button).toBeDisabled();
  });
  it(`Invalid FormSignup's field should remove invalid class when user changes it`, () => {
    const store = mockStore(fakeStore);

    render(
        <Provider store={store}>
          <Router history={history}>
            <FormSignup />
          </Router>
        </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/example@mail.ru/i);

    userEvent.type(emailInput, `test@test`);
    userEvent.click(screen.getByRole(`button`, {name: /Зарегистрироваться/i}));
    expect(emailInput).toHaveClass(`form__input_invalid`);
    expect(document.querySelector(`form`)).toHaveClass(`shake`);

    const errorFormMessage = screen.getByText(SigninFormErrorText.EMAIL);

    expect(errorFormMessage).toBeInTheDocument();
    userEvent.type(emailInput, `test@test.test`);
    expect(emailInput).not.toHaveClass(`form__input_invalid`);
    expect(errorFormMessage).not.toBeInTheDocument();
  });
  it(`FormSignup's class "shake" should remove after 600ms`, () => {
    const store = mockStore(fakeStore);

    render(
        <Provider store={store}>
          <Router history={history}>
            <FormSignup />
          </Router>
        </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/example@mail.ru/i);
    const form = document.querySelector(`form`);

    userEvent.type(emailInput, `test@test`);
    userEvent.click(screen.getByRole(`button`, {name: /Зарегистрироваться/i}));
    expect(emailInput).toHaveClass(`form__input_invalid`);
    expect(form).toHaveClass(`shake`);
    expect(screen.getByText(SigninFormErrorText.EMAIL)).toBeInTheDocument();
    setTimeout(() => {
      expect(form).not.toHaveClass(`shake`);
    }, 600);
  });
  it(`FormSignup should be invalid if user submit invalid email value`, () => {
    const store = mockStore(fakeStore);

    render(
        <Provider store={store}>
          <Router history={history}>
            <FormSignup />
          </Router>
        </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/example@mail.ru/i);

    userEvent.type(emailInput, `test@test`);
    userEvent.click(screen.getByRole(`button`, {name: /Зарегистрироваться/i}));
    expect(emailInput).toHaveClass(`form__input_invalid`);
    expect(document.querySelector(`form`)).toHaveClass(`shake`);
    expect(screen.getByText(SigninFormErrorText.EMAIL)).toBeInTheDocument();
  });
  it(`FormSignup should be invalid if user submit an empty form`, () => {
    const store = mockStore(fakeStore);

    render(
        <Provider store={store}>
          <Router history={history}>
            <FormSignup />
          </Router>
        </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/example@mail.ru/i);

    userEvent.click(screen.getByRole(`button`, {name: /Зарегистрироваться/i}));
    expect(emailInput).toHaveClass(`form__input_invalid`);
    expect(document.querySelector(`form`)).toHaveClass(`shake`);
    expect(screen.getByText(SigninFormErrorText.EMAIL)).toBeInTheDocument();
  });
  it(`FormSignup should be invalid if user submit empty password field`, () => {
    const store = mockStore(fakeStore);

    render(
        <Provider store={store}>
          <Router history={history}>
            <FormSignup />
          </Router>
        </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/example@mail.ru/i);
    const passwordInput = screen.getAllByPlaceholderText(/Пароль/i)[0];

    userEvent.type(emailInput, `test@test.test`);
    userEvent.click(screen.getByRole(`button`, {name: /Зарегистрироваться/i}));
    expect(passwordInput).toHaveClass(`form__input_invalid`);
    expect(document.querySelector(`form`)).toHaveClass(`shake`);
    expect(screen.getByText(SigninFormErrorText.PASSWORD)).toBeInTheDocument();
  });
  it(`FormSignup should be invalid if user submit empty confirm password field`, () => {
    const store = mockStore(fakeStore);

    render(
        <Provider store={store}>
          <Router history={history}>
            <FormSignup />
          </Router>
        </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/example@mail.ru/i);
    const passwordInput = screen.getAllByPlaceholderText(/Пароль/i)[0];
    const confirmedPasswordInput = screen.getAllByPlaceholderText(/Пароль/i)[1];

    userEvent.type(emailInput, `test@test.test`);
    userEvent.type(passwordInput, `test`);
    userEvent.click(screen.getByRole(`button`, {name: /Зарегистрироваться/i}));
    expect(passwordInput).toHaveClass(`form__input_invalid`);
    expect(confirmedPasswordInput).toHaveClass(`form__input_invalid`);
    expect(document.querySelector(`form`)).toHaveClass(`shake`);
    expect(screen.getByText(SigninFormErrorText.CONFIRMED_PASSWORD)).toBeInTheDocument();
  });
  it(`FormSignup should be invalid if password field and confirm password field are different`, () => {
    const store = mockStore(fakeStore);

    render(
        <Provider store={store}>
          <Router history={history}>
            <FormSignup />
          </Router>
        </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/example@mail.ru/i);
    const passwordInput = screen.getAllByPlaceholderText(/Пароль/i)[0];
    const confirmedPasswordInput = screen.getAllByPlaceholderText(/Пароль/i)[1];

    userEvent.type(emailInput, `test@test.test`);
    userEvent.type(passwordInput, `test`);
    userEvent.type(confirmedPasswordInput, `testtest`);
    userEvent.click(screen.getByRole(`button`, {name: /Зарегистрироваться/i}));
    expect(passwordInput).toHaveClass(`form__input_invalid`);
    expect(confirmedPasswordInput).toHaveClass(`form__input_invalid`);
    expect(document.querySelector(`form`)).toHaveClass(`shake`);
    expect(screen.getByText(SigninFormErrorText.CONFIRMED_PASSWORD)).toBeInTheDocument();
  });
});
