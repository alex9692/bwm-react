import camelCase from "camel-case";

let instance = null;

class Cacher {
	cache = {};

	constructor() {
		if (!instance) {
			instance = this;
		}
		return instance;
	}

	isValueCached = key => {
		return this.getCacheValue(key);
	};

	cacheValue = (key, value) => {
		this.cache[camelCase(key)] = value;
	};

	getCacheValue = key => {
		return this.cache[camelCase(key)];
	};
}

export default Cacher;
