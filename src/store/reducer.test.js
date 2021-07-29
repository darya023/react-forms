import {changeAuthorizationStatus, changeSendingDataStatus, setUser} from "./action-creator";
import {reducer} from "./reducer";

const SendingStatus = {
  INITIAL: `INITIAL`,
  FETCHING: `FETCHING`,
  SUCCESS: `SUCCESS`,
  FAILURE: `FAILURE`,
};
const initialState = {
  user: [],
  sendingDataStatus: SendingStatus.INITIAL,
  authorizationStatus: null,
};
const fakeUser = {
  email: `test@test.test`,
  password: `test`
};
describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it(`Reducer should set user`, () => {
    const expectedState = {
      ...initialState,
      user: fakeUser,
    };

    expect(reducer(initialState, setUser(fakeUser))).toEqual(expectedState);
  });
  it(`Reducer should change sendingDataStatus`, () => {
    const expectedState = {
      ...initialState,
      sendingDataStatus: SendingStatus.SUCCESS,
    };

    expect(reducer(initialState, changeSendingDataStatus(SendingStatus.SUCCESS))).toEqual(expectedState);

    const expectedStateAsInitialState = {
      ...initialState,
      sendingDataStatus: SendingStatus.INITIAL,
    };

    expect(reducer(initialState, changeSendingDataStatus(SendingStatus.INITIAL))).toEqual(expectedStateAsInitialState);
  });
  it(`Reducer should change authorizationStatus`, () => {
    const expectedState = {
      ...initialState,
      authorizationStatus: true,
    };

    expect(reducer(initialState, changeAuthorizationStatus(true))).toEqual(expectedState);
  });
});
