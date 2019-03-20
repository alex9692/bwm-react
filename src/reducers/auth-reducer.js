import * as type from "../actions/types";

const INITIAL_STATE = {
	isAuth: false,
	token: "",
	errors: [],
	username: ""
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case type.LOGIN_SUCCESS:
			return {
				...state,
				isAuth: true,
				token: action.token,
				errors: [],
				username: action.username
			};
		case type.LOGIN_FAILURE:
			return {
				...state,
				isAuth: false,
				token: "",
				errors: action.errors,
				username: ""
			};
		case type.LOGOUT:
			return {
				...state,
				isAuth: false,
				token: "",
				errors: [],
				username: ""
			};
		default:
			return state;
	}
};

export default authReducer;
