import React from "react";
import { Link /*withRouter*/ } from "react-router-dom";
import { connect } from "react-redux";

import RentalSearchInput from "../rental/RentalSearchInput";

class Header extends React.Component {
	renderLogState = isAuth => {
		if (!isAuth) {
			return (
				<React.Fragment>
					<Link className="nav-item nav-link" to="/login">
						Login <span className="sr-only">(current)</span>
					</Link>
					<Link className="nav-item nav-link" to="/register">
						Register
					</Link>
				</React.Fragment>
			);
		}
		return (
			<Link className="nav-item nav-link" to="/" onClick={this.props.logout}>
				Logout
			</Link>
		);
	};

	renderOwnerSection(isAuth, username) {
		if (isAuth) {
			return (
				<React.Fragment>
					<a className="nav-item nav-link">{username}</a>

					<div className="nav-item dropdown">
						<div
							className="nav-link nav-item dropdown-toggle"
							href="#"
							id="navbarDropdownMenuLink"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
							style={{ cursor: "pointer" }}
						>
							Owner Section
						</div>
						<div
							className="dropdown-menu"
							aria-labelledby="navbarDropdownMenuLink"
						>
							<Link className="dropdown-item" to="/rentals/new">
								Create Rental
							</Link>
							<Link className="dropdown-item" to="/rentals/manage">
								Manage Rentals
							</Link>
							<Link className="dropdown-item" to="/bookings/manage">
								Manage Bookings
							</Link>
						</div>
					</div>
				</React.Fragment>
			);
		}
	}

	render() {
		const { isAuth, username } = this.props.auth;
		return (
			<div>
				<nav className="navbar navbar-dark navbar-expand-lg">
					<div className="container">
						<Link className="navbar-brand" to="/rentals">
							BookWithMe
							<img
								src={process.env.PUBLIC_URL + "/img/react-logo.svg"}
								alt=""
							/>
						</Link>
						<RentalSearchInput />
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarNavAltMarkup"
							aria-controls="navbarNavAltMarkup"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon" />
						</button>
						<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
							<div className="navbar-nav ml-auto">
								{this.renderOwnerSection(isAuth, username)}
								{this.renderLogState(isAuth)}
							</div>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

// export default withRouter(connect(mapStateToProps)(Header));
export default connect(mapStateToProps)(Header);
