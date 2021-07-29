import {ActionType} from "./actions";

export const setUser = (data) => ({
  type: ActionType.SET_USER,
  payload: data
});

export const changeSendingDataStatus = (status) => ({
  type: ActionType.CHANGE_SENDING_DATA_STATUS,
  payload: status
});

export const changeAuthorizationStatus = (status) => ({
  type: ActionType.CHANGE_AUTHORIZATION_STATUS,
  payload: status
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url
});
