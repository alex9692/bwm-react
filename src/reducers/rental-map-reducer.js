import * as type from "../actions/types";

const INITIAL_STATE = {
	isReloading: false
};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case type.RELOAD_MAP:
			return {
				...state,
				isReloading: true
			};
		case type.RELOAD_MAP_FINISH:
			return {
				...state,
				isReloading: false
			};
		default:
			return state;
	}
};

export default reducer;
