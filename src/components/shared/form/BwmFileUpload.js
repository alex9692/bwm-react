import React from "react";

class BwmFileUpload extends React.Component {
	onChangeInput = () => {
		const {
			input: { onChange }
		} = this.props;

		onChange(
			"https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg"
		);
	};
	render() {
		const {
			label,
			meta: { touched, error, warning }
		} = this.props;
		return (
			<div className="form-group">
				<label>{label}</label>
				<div className="input-group">
					<input
						type="file"
						accept=".jpg, .png, .jpeg"
						onChange={event => this.onChangeInput(event)}
					/>
				</div>
				{touched && (error && <div className="alert-danger">{error}</div>)}
			</div>
		);
	}
}

export default BwmFileUpload;
