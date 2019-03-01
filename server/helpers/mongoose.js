module.exports = {
	normalizeErrors: function(errors) {
		let normalizeError = [];

		for (let key in errors) {
			if (errors.hasOwnProperty(key)) {
				normalizeError.push({ title: key, detail: errors[key].message });
			}
        }
        return normalizeError;
	}
};
