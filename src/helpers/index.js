import titleize from "titleize";

export const rentalType = isShared => (isShared ? "shared" : "whole");
export const toUpperCase = value => (value ? titleize(value) : "");
