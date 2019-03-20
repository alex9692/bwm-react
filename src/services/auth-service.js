import * as moment from "moment";
import * as jwt from "jsonwebtoken";

class AuthService {
	tokenkey = "auth_token";

	getToken() {
		return localStorage.getItem(this.tokenkey);
	}

	invalidate() {
		localStorage.removeItem(this.tokenkey);
	}

	saveToken(token) {
		localStorage.setItem(this.tokenkey, token);
	}

	decodeToken(token) {
		return jwt.decode(token);
	}

	getExpirationTime(token) {
		const exp = this.decodeToken(token).exp;
		return moment.unix(exp);
	}

	getUsername() {
		return this.decodeToken(this.getToken()).username;
	}

	isValid(token) {
		return moment().isBefore(this.getExpirationTime(token));
	}

	isAuthenticated() {
		const token = this.getToken();

		return token && this.isValid(token) ? true : false;
	}
}

export default new AuthService();
