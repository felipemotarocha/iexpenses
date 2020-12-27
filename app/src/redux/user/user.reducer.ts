import {
	FETCH_USER_FAILURE,
	FETCH_USER_START,
	FETCH_USER_SUCCESS,
	UserActionsTypes,
} from "./user.actions.types";
import { UserState } from "./user.reducer.types";

export const initialState: UserState = {
	user: null,
	loading: false,
};

const userReducer = (
	state = initialState,
	action: UserActionsTypes
): UserState => {
	switch (action.type) {
		case FETCH_USER_START:
			return {
				...initialState,
				loading: true,
			};
		case FETCH_USER_SUCCESS:
			return {
				...initialState,
				user: action.payload,
			};
		case FETCH_USER_FAILURE:
			return {
				...initialState,
				loading: false,
			};
		default:
			return state;
	}
};

export default userReducer;
