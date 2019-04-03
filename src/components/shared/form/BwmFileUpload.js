import React from "react";
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import { toast } from "react-toastify";

import * as actions from "../../../actions";

class BwmFileUpload extends React.Component {
	state = {
		selectedFile: null,
		imageBase64: "",
		initialImageBase64: "",
		pending: false,
		status: "INIT",
		crop: {},
		croppedImage: {}
	};

	componentWillMount() {
		this.setupFileReader();
	}

	resetToDefaultState = status => {
		this.setState({
			selectedFile: null,
			imageBase64: "",
			initialImageBase64: "",
			pending: false,
			status,
			crop: {},
			croppedImage: {}
		});
	};

	uploadImage = () => {
		const { croppedImage } = this.state;

		if (croppedImage) {
			this.setState({ pending: true, status: "INIT" });
			actions
				.uploadImage(croppedImage)
				.then(uploadedImage => {
					this.onSuccess(uploadedImage);
				})
				.catch(error => {
					this.onFailure(error);
				});
		}
	};

	onSuccess = uploadedImage => {
		debugger;
		this.resetToDefaultState("OK");
		const { onChange } = this.props.input || this.props;

		onChange(uploadedImage);
	};

	onFailure = error => {
		this.setState({ pending: false, status: "FAIL" });
	};

	renderSpinner = () => {
		const { pending } = this.state;

		if (pending) {
			return (
				<div className="img-spinning-circle">
					<div />
				</div>
			);
		}
	};

	renderImageStatus = () => {
		const { status } = this.state;

		if (status === "OK")
			return (
				<div className="alert alert-success">Image uploaded successfully!</div>
			);

		if (status === "FAIL")
			return <div className="alert alert-danger">Image upload failed!</div>;
	};

	setupFileReader = () => {
		this.reader = new FileReader();

		this.reader.addEventListener("load", event => {
			const { initialImageBase64 } = this.state;
			const imageBase64 = event.target.result;

			if (initialImageBase64) {
				this.setState({ imageBase64 });
			} else {
				this.setState({ imageBase64, initialImageBase64: imageBase64 });
			}
		});
	};

	onChangeInput = event => {
		const selectedFile = event.target.files[0];

		if (selectedFile) {
			this.setState({ selectedFile, initialImageBase64: "" });
			this.reader.readAsDataURL(selectedFile);
		}
	};

	onCropChange = crop => {
		this.setState({ crop });
	};

	onImageLoaded = image => {
		if (image.naturalWidth < 950 && image.naturalHeight < 720) {
			this.resetToDefaultState("INIT");
			toast.error("Minimum width of image is 950px and height is 720px");
			return;
		}
		this.setState({
			crop: makeAspectCrop(
				{
					x: 0,
					y: 0,
					aspect: 4 / 3,
					width: 50
				},
				image.width / image.height
			)
		});
	};

	onCropCompleted = async (crop, pixelCrop) => {
		const { selectedFile, initialImageBase64 } = this.state;

		if (selectedFile && (pixelCrop.height > 0 && pixelCrop.width > 0)) {
			const img = new Image();
			img.src = initialImageBase64;

			const croppedImage = await getCroppedImg(
				img,
				pixelCrop,
				selectedFile.name
			);

			this.setState({ croppedImage });
			this.reader.readAsDataURL(croppedImage);
		}
	};

	render() {
		// const {
		// 	label,
		// 	meta: { touched, error }
		// } = this.props;

		const { selectedFile, imageBase64, initialImageBase64, crop } = this.state;
		return (
			<div className="img-upload-container">
				<label className="img-upload btn btn-bwm">
					<span className="upload-text">Select an image</span>
					<input
						type="file"
						accept=".jpg, .png, .jpeg"
						onChange={event => this.onChangeInput(event)}
					/>
				</label>
				{selectedFile && (
					<button
						className="btn btn-success btn-upload"
						type="button"
						disabled={!selectedFile}
						onClick={this.uploadImage}
					>
						Upload Image
					</button>
				)}

				{initialImageBase64 && (
					<ReactCrop
						src={initialImageBase64}
						crop={crop}
						onChange={this.onCropChange}
						onImageLoaded={this.onImageLoaded}
						onComplete={this.onCropCompleted}
					/>
				)}

				{/* {touched && (error && <div className="alert-danger">{error}</div>)} */}
				{imageBase64 && (
					<div className="img-preview-container">
						<div
							className="img-preview"
							style={{ backgroundImage: `url(${imageBase64})` }}
						/>
						{this.renderSpinner()}
					</div>
				)}
				{this.renderImageStatus()}
			</div>
		);
	}
}

export default BwmFileUpload;

function getCroppedImg(image, pixelCrop, fileName) {
	const canvas = document.createElement("canvas");
	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;
	const ctx = canvas.getContext("2d");

	ctx.drawImage(
		image,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height
	);

	// As Base64 string
	// const base64Image = canvas.toDataURL('image/jpeg');

	// As a blob
	return new Promise((resolve, reject) => {
		canvas.toBlob(blob => {
			blob.name = fileName;
			resolve(blob);
		}, "image/jpeg");
	});
}
