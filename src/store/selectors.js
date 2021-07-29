import {createSelector} from 'reselect';
import {SendingStatus} from '../const';

export const getUser = (state) => state.user;
export const getSendingDataStatus = (state) => state.sendingDataStatus;
export const getAuthorizationStatus = (state) => state.authorizationStatus;

export const needDisableElement = createSelector(
    [getSendingDataStatus],
    (status) => status === SendingStatus.FETCHING
);

export const needShowUser = createSelector(
    [getAuthorizationStatus],
    (status) => status
);

export const needShowErrorText = createSelector(
    [getSendingDataStatus],
    (status) => status === SendingStatus.FAILURE
);
