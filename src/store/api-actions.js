import {batch} from "react-redux";
import {AppRoute, SendingStatus} from "../const";
import {changeAuthorizationStatus, changeSendingDataStatus, redirectToRoute, setUser} from "./action-creator";

export const login = ({email, password}) => (dispatch, _getState, api) => {
  dispatch(changeSendingDataStatus(SendingStatus.FETCHING));
  return api.post(AppRoute.LOGIN, {email, password})
    .then(({data}) => {
      batch(() => {
        dispatch(setUser(data));
        dispatch(changeSendingDataStatus(SendingStatus.SUCCESS));
        dispatch(changeAuthorizationStatus(true));
        dispatch(redirectToRoute(AppRoute.MAIN));
      });
    })
    .catch(({response})=> {
      if (response && response.data && response.data.error) {
        // eslint-disable-next-line
        console.error(response.data.error);
      }
      batch(() => {
        dispatch(changeSendingDataStatus(SendingStatus.FAILURE));
        dispatch(changeAuthorizationStatus(false));
      });
    });
};
export const signup = ({email, password}) => (dispatch, _getState, api) => {
  dispatch(changeSendingDataStatus(SendingStatus.FETCHING));
  return api.post(AppRoute.SIGNUP, {email, password})
    .then(({data}) => {
      batch(() => {
        dispatch(setUser(data));
        dispatch(changeSendingDataStatus(SendingStatus.SUCCESS));
        dispatch(changeAuthorizationStatus(true));
        dispatch(redirectToRoute(AppRoute.MAIN));
      });
    })
    .catch(({response})=> {
      if (response && response.data && response.data.error) {
        // eslint-disable-next-line
        console.error(response.data.error);
      }
      batch(() => {
        dispatch(changeSendingDataStatus(SendingStatus.FAILURE));
        dispatch(changeAuthorizationStatus(false));
      });
    });
};
export const checkAuthorization = () => (dispatch, _getState, api) => (
  api.get(AppRoute.LOGIN)
    .then(({data}) => {
      batch(() => {
        dispatch(setUser(data));
        dispatch(changeAuthorizationStatus(true));
      });
    })
    .catch(({response})=> {
      if (response && response.data && response.data.error) {
        // eslint-disable-next-line
        console.error(response.data.error);
      }
      dispatch(changeAuthorizationStatus(false));
    })
);
