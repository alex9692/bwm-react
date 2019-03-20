import React from "react";
import { Redirect } from "react-router-dom";

import RegisterForm from "./RegisterForm";
import { register } from "../../actions";

class Register extends React.Component {
	state = {
		errors: [],
		redirect: false
	};

	registerUser = userData => {
		register(userData)
			.then(result => {
				this.setState({ redirect: true });
			})
			.catch(errors => {
				this.setState({ errors });
			});
	};

	render() {
		const errors = this.state.errors;
		if (this.state.redirect) {
			return (
				<Redirect
					to={{ pathname: "/login", state: { successRegister: true } }}
				/>
			);
		}

		return (
			<section id="register">
				<div className="bwm-form">
					<div className="row">
						<div className="col-md-5">
							<h1>Register</h1>
							<RegisterForm submitCb={this.registerUser} errors={errors} />
						</div>
						<div className="col-md-6 ml-auto">
							<div className="image-container">
								<h2 className="catchphrase">
									As our member you have access to most awesome places in the
									world.
								</h2>
								<img
									src={process.env.PUBLIC_URL + "/img/register-image.jpg"}
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

// export default connect()(Register);
export default Register;
