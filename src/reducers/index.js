import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import rentalReducer from "./rental-reducer";
import thunk from "redux-thunk";

export const init = () => {
	const reducer = combineReducers({
		rentals: rentalReducer
    });
    
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(
        reducer,
        composeEnhancers(applyMiddleware(thunk))
    );
    
	return store;
};
