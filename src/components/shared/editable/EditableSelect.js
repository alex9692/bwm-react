import React from "react";
import EditableComponent from "./EditableComponent";

class EditableSelect extends EditableComponent {
	renderOptions = options => {
		return options.map((option, index) => {
			return (
				<option key={index} value={option}>
					{`${option}`}
				</option>
			);
		});
	};

	renderComponentView = () => {
		const { value, isActive } = this.state;
		const { className, options } = this.props;
		if (isActive) {
			return (
				<React.Fragment>
					<select
						onChange={this.handleChange}
						value={value}
						className={className}
					>
						{this.renderOptions(options)}
					</select>
					<button
						onClick={this.update}
						className="btn btn-success btn-editable"
						type="button"
					>
						Save
					</button>
					<button
						onClick={() => {
							this.setState({ isActive: false });
						}}
						className="btn btn-warning btn-editable"
						type="button"
					>
						Close
					</button>
				</React.Fragment>
			);
		}
		return (
			<React.Fragment>
				<span className={className}>{`${value}`}</span>
				<button
					onClick={() => {
						this.setState({ isActive: true });
					}}
					className="btn btn-warning btn-editable"
					type="button"
				>
					Edit
				</button>
			</React.Fragment>
		);
	};

	render() {
		return (
			<div className="editableComponent" style={this.props.containerStyle}>
				{this.renderComponentView()}
			</div>
		);
	}
}

export default EditableSelect;
