import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../services/api';
import {ActionType} from './actions';
import {checkAuthorization, login, signup} from './api-actions';

const api = createAPI(() => {});
const fakeUser = {
  email: `test@test.test`,
  password: `test`
};
const fakeError = {
  error: `fakeError`
};
const SendingStatus = {
  INITIAL: `INITIAL`,
  FETCHING: `FETCHING`,
  SUCCESS: `SUCCESS`,
  FAILURE: `FAILURE`,
};
describe(`Async operations work correctly`, () => {
  const dispatch = jest.fn();
  let spyConsole;

  beforeAll(() => {
    const fakeConsole = jest.fn();
    spyConsole = jest.spyOn(console, `error`).mockImplementation(() => fakeConsole);
  });
  afterAll(() => {
    spyConsole.mockRestore();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    spyConsole.mockClear();
  });
  it(`Should make a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const loginHandler = login(fakeUser);

    apiMock
      .onPost(`/login`)
      .reply(200, fakeUser);

    loginHandler(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_SENDING_DATA_STATUS,
          payload: SendingStatus.FETCHING,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USER,
          payload: fakeUser,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHANGE_SENDING_DATA_STATUS,
          payload: SendingStatus.SUCCESS,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.CHANGE_AUTHORIZATION_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(5, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: `/`,
        });
      });
  });
  it(`Should catch error to API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const loginHandler = login(fakeUser);

    apiMock
      .onPost(`/login`)
      .reply(500, fakeError);

    loginHandler(dispatch, () => {}, api)
    .then(() => {
      expect(spyConsole).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: SendingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: SendingStatus.FAILURE,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.CHANGE_AUTHORIZATION_STATUS,
        payload: false,
      });
    });
  });
  it(`Should catch error to API call to /login without console.error`, () => {
    const apiMock = new MockAdapter(api);
    const loginHandler = login(fakeUser);

    apiMock
      .onPost(`/login`)
      .reply(500, {});

    loginHandler(dispatch, () => {}, api)
    .then(() => {
      expect(spyConsole).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: SendingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: SendingStatus.FAILURE,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.CHANGE_AUTHORIZATION_STATUS,
        payload: false,
      });
    });
  });
  it(`Should make a correct API call to /login for check authorization`, () => {
    const apiMock = new MockAdapter(api);
    const checkAuthorizationHandler = checkAuthorization();

    apiMock
      .onGet(`/login`)
      .reply(200, fakeUser);

    checkAuthorizationHandler(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USER,
          payload: fakeUser,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_AUTHORIZATION_STATUS,
          payload: true,
        });
      });
  });
  it(`Should catch error to API call to /login for check authorization`, () => {
    const apiMock = new MockAdapter(api);
    const checkAuthorizationHandler = checkAuthorization();

    apiMock
      .onGet(`/login`)
      .reply(500, fakeError);

    checkAuthorizationHandler(dispatch, () => {}, api)
      .then(() => {
        expect(spyConsole).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_AUTHORIZATION_STATUS,
          payload: false,
        });
      });
  });
  it(`Should catch error to API call to /login for check authorization without console.error`, () => {
    const apiMock = new MockAdapter(api);
    const checkAuthorizationHandler = checkAuthorization();

    apiMock
      .onGet(`/login`)
      .reply(500, {});

    checkAuthorizationHandler(dispatch, () => {}, api)
      .then(() => {
        expect(spyConsole).not.toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_AUTHORIZATION_STATUS,
          payload: false,
        });
      });
  });
  it(`Should make a correct API call to /signup`, () => {
    const apiMock = new MockAdapter(api);
    const loginHandler = signup(fakeUser);

    apiMock
      .onPost(`/signup`)
      .reply(200, fakeUser);

    loginHandler(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_SENDING_DATA_STATUS,
          payload: SendingStatus.FETCHING,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USER,
          payload: fakeUser,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHANGE_SENDING_DATA_STATUS,
          payload: SendingStatus.SUCCESS,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.CHANGE_AUTHORIZATION_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(5, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: `/`,
        });
      });
  });
  it(`Should catch error to API call to /signup`, () => {
    const apiMock = new MockAdapter(api);
    const loginHandler = signup(fakeUser);

    apiMock
      .onPost(`/signup`)
      .reply(500, fakeError);

    loginHandler(dispatch, () => {}, api)
    .then(() => {
      expect(spyConsole).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: SendingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: SendingStatus.FAILURE,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.CHANGE_AUTHORIZATION_STATUS,
        payload: false,
      });
    });
  });
  it(`Should catch error to API call to /signup without console.error`, () => {
    const apiMock = new MockAdapter(api);
    const loginHandler = signup(fakeUser);

    apiMock
      .onPost(`/signup`)
      .reply(500, {});

    loginHandler(dispatch, () => {}, api)
    .then(() => {
      expect(spyConsole).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: SendingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: SendingStatus.FAILURE,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.CHANGE_AUTHORIZATION_STATUS,
        payload: false,
      });
    });
  });
});
