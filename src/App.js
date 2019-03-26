import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./components/shared/Header";
import RentalListing from "./components/rental/rental-listing/RentalListing";
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import RentalCreate from "./components/rental/rental-create/RentalCreate";
import RentalSearchListing from "./components/rental/rental-listing/RentalSearchListing";
import RentalManage from "./components/rental/rental-manage/RentalManage";
import BookingManage from "./components/booking/booking-manage/BookingManage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

import {
	ProtectedRoute,
	LoggedInRoute
} from "./components/shared/auth/ProtectedRoute";

import { init } from "./reducers";

import * as actions from "./actions";

import "./App.css";

const store = init();

class App extends Component {
	componentWillMount() {
		store.dispatch(actions.checkAuthState());
	}

	logout() {
		store.dispatch(actions.logout());
	}

	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className="App">
						<Header logout={this.logout} />
						<div className="container">
							<Switch>
								<Route
									exact
									path="/"
									component={() => {
										return <Redirect to="/rentals" />;
									}}
								/>
								<Route exact path="/rentals" component={RentalListing} />
								<ProtectedRoute
									exact
									path="/rentals/new"
									component={RentalCreate}
								/>
								<ProtectedRoute
									exact
									path="/rentals/manage"
									component={RentalManage}
								/>
								<ProtectedRoute
									exact
									path="/bookings/manage"
									component={BookingManage}
								/>
								<Route exact path="/login" component={Login} />
								<LoggedInRoute exact path="/register" component={Register} />
								<Route
									exact
									path="/rentals/:id"
									component={RentalDetail}
								/>
								<Route
									exact
									path="/rentals/:city/homes"
									component={RentalSearchListing}
								/>
							</Switch>
						</div>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
