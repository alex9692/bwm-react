import titleize from "titleize";
import * as moment from "moment";

export const rentalType = isShared => (isShared ? "shared" : "whole");
export const toUpperCase = value => (value ? titleize(value) : "");
export const prettifyDate = date => moment(date).format("MMM Do YY");

export const getRangeOflDates = (startsAt, endsAt, dateFormat) => {
	const tempDates = [];
	const mEndsAt = moment(endsAt);
	let mStartsAt = moment(startsAt);

	while (mStartsAt < mEndsAt) {
		tempDates.push(mStartsAt.format(dateFormat));
		mStartsAt = mStartsAt.add(1, "day");
	}
	tempDates.push(mEndsAt.format(dateFormat));
	return tempDates;
};
