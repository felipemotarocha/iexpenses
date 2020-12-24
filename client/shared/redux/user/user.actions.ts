import { User } from "types/user.types";
import {
	FETCH_USER_FAILURE,
	FETCH_USER_START,
	FETCH_USER_SUCCESS,
	UserActionsTypes,
} from "./user.actions.types";

export const fetchUserStart = (userId: string): UserActionsTypes => {
	return {
		type: FETCH_USER_START,
		payload: userId,
	};
};

export const fetchUserSuccess = (user: User): UserActionsTypes => {
	return {
		type: FETCH_USER_SUCCESS,
		payload: user,
	};
};

export const fetchUserFailure = (): UserActionsTypes => {
	return {
		type: FETCH_USER_FAILURE,
	};
};
