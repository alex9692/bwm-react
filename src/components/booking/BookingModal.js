import React from "react";
import Modal from "react-responsive-modal";

import BwmResError from "../shared/form/BwmResError";

const BookingModal = props => {
	const { open, close, booking, confirm, errors, dailyRate } = props;
	return (
		<Modal
			open={open}
			onClose={close}
			little
			classNames={{ modal: "booking-modal" }}
		>
			<h4 className="modal-title title">Confirm Booking </h4>
			<p className="dates">
				{booking.startsAt} to {booking.endsAt}
			</p>
			<div className="modal-body">
				<em>{booking.days}</em> nights /<em>{dailyRate}</em> per
				Night
				<p>
					Guests: <em>{booking.guests}</em>
				</p>
				<p>
					Price: <em>{booking.totalPrice}$ </em>
				</p>
				<p>Do you confirm your booking for selected days?</p>
			</div>
			<BwmResError errors={errors} />
			<div className="modal-footer">
				<button type="button" onClick={confirm} className="btn btn-bwm">
					Confirm
				</button>
				<button type="button" onClick={close} className="btn btn-bwm">
					Cancel
				</button>
			</div>
		</Modal>
	);
};

export default BookingModal;
