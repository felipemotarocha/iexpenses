import { call, all, takeLatest, put } from 'redux-saga/effects';
import Config from 'react-native-config';
import axios from 'axios';

import { fetchUserFailure, fetchUserSuccess } from './user.actions';
import { FETCH_USER_START } from './user.actions.types';
import { User } from '../../types/user.types';

export function* fetchUser({ payload: userId }: { payload: string }) {
  try {
    const { data }: { data: User } = yield axios.get(
      `${Config.API_URL}/user/${userId}?withExpensesAndIncomes=true`,
    );
    yield put(fetchUserSuccess(data));
  } catch (_err) {
    yield put(fetchUserFailure());
  }
}

function* onFetchUserStart() {
  yield takeLatest(FETCH_USER_START as any, fetchUser);
}

export function* userSagas() {
  yield all([call(onFetchUserStart)]);
}
