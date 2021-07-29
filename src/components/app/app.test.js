import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import configureMockStore from 'redux-mock-store';
import * as redux from 'react-redux';
import App from './app';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
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
let store;
describe(`Test routing`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    store = mockStore(fakeStore);
  });
  it(`Render 'MainScreen' when user navigate to '/' url`, () => {
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByRole(`link`, {name: /На главную/i})).toBeInTheDocument();
    expect(screen.getByRole(`link`, {name: /Войти/i})).toBeInTheDocument();
    expect(screen.getByRole(`link`, {name: /Зарегистрироваться/i})).toBeInTheDocument();
  });
  it(`Render 'LoginScreen' when user navigate to '/login' url`, () => {
    history.push(`/login`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByRole(`link`, {name: /На главную/i})).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/example@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Пароль/i)).toBeInTheDocument();
  });
  it(`Render 'SignupScreen' when user navigate to '/signup' url`, () => {
    history.push(`/signup`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByRole(`link`, {name: /На главную/i})).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/example@mail.ru/i)).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText(/Пароль/i)[0]).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText(/Пароль/i)[1]).toBeInTheDocument();
  });
  it(`Render 'NotFoundScreen' when user navigate to '/test' url`, () => {
    history.push(`/test`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByRole(`link`, {name: /На главную/i})).toBeInTheDocument();
    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
  });
});
