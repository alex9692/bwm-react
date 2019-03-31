import React from "react";

class EditableComponent extends React.Component {
	state = {
		isActive: false,
		value: "",
		originalValue: ""
	};

	componentDidMount() {
		this.setOriginalValues();
	}

	componentDidUpdate() {
		const { errors, entityField, resetErrors } = this.props;
		if (errors && errors.length > 0 && errors[0].title === entityField) {
			this.setOriginalValues();
			resetErrors();
		}
	}

	setOriginalValues = () => {
		const { entity, entityField } = this.props;
		const value = entity[entityField];

		this.setState({ value, originalValue: value, isActive: false });
	};

	handleChange = event => {
		this.setState({ value: event.target.value });
	};

	update = () => {
		const { value, originalValue } = this.state;
		const { entityField, updateEntity } = this.props;
		if (value !== originalValue) {
			updateEntity({ [entityField]: value });
		}
		this.setState({ isActive: false, originalValue: value });
	};
}

export default EditableComponent;
