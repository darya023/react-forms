import {SendingStatus} from '../const';
import {ActionType} from './actions';

const initialState = {
  user: [],
  sendingDataStatus: SendingStatus.INITIAL,
  authorizationStatus: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.CHANGE_SENDING_DATA_STATUS:
      return {
        ...state,
        sendingDataStatus: action.payload,
      };
    case ActionType.CHANGE_AUTHORIZATION_STATUS:
      return {
        ...state,
        authorizationStatus: action.payload,
      };

    default: return state;
  }
};
