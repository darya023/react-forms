import {changeAuthorizationStatus, changeSendingDataStatus, redirectToRoute, setUser} from "./action-creator";
import {ActionType} from "./actions";

describe(`Action creators work correctly`, () => {
  it(`Action creator for set user returns correct action`, () => {
    const fakeUser = {
      email: `test@test.test`,
      password: `test`
    };
    const expectedAction = {
      type: ActionType.SET_USER,
      payload: fakeUser
    };

    expect(setUser(fakeUser)).toEqual(expectedAction);
  });
  it(`Action creator for change sending data status returns correct action`, () => {
    const status = true;
    const expectedAction = {
      type: ActionType.CHANGE_SENDING_DATA_STATUS,
      payload: status
    };

    expect(changeSendingDataStatus(status)).toEqual(expectedAction);
  });
  it(`Action creator for changing authorisation status returns correct action`, () => {
    const status = true;
    const expectedAction = {
      type: ActionType.CHANGE_AUTHORIZATION_STATUS,
      payload: status
    };

    expect(changeAuthorizationStatus(status)).toEqual(expectedAction);
  });
  it(`Action creator for redirecting to route returns correct action`, () => {
    const url = `/test`;
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: url
    };

    expect(redirectToRoute(url)).toEqual(expectedAction);
  });
});
