import { User } from '../../types/user.types';

export const FETCH_USER_START = 'FETCH_USER_START';
interface FetchUserStartAction {
  type: typeof FETCH_USER_START;
  payload: string;
}

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
interface FetchUserSuccessAction {
  type: typeof FETCH_USER_SUCCESS;
  payload: User;
}

export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
interface FetchUserFailureAction {
  type: typeof FETCH_USER_FAILURE;
}

export type UserActionsTypes =
  | FetchUserStartAction
  | FetchUserSuccessAction
  | FetchUserFailureAction;
