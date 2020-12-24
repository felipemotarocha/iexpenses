import { call, all, takeLatest, put } from "redux-saga/effects";
import axios from "axios";

import { API_URL } from "config/api/api.url";
import { fetchUserFailure, fetchUserSuccess } from "./user.actions";
import { User } from "types/user.types";
import { FETCH_USER_START } from "./user.actions.types";

export function* fetchUser({ payload: userId }: { payload: string }) {
	try {
		const { data }: { data: User } = yield axios.get(`${API_URL}/${userId}`);
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
