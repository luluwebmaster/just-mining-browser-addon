
// Object for manage local storage
var Storage = {

	// Method for save data
	save: function (key, value, callback) {

		// Set object value
		var dataSave = {};
		dataSave[key] = value;

		// Save data
		localStorage.setItem(key, JSON.stringify(dataSave));

		// Callback function
		if(typeof callback === "function") {

			// Call
			callback(value);
		}

		// Return value
		return value;
	},

	// Method for get data
	get: function (key, callback) {

		// Get data
		var data = localStorage.getItem(key);

		// If data found
		if(data !== null) {

			// Parse JSON
			data = JSON.parse(data);
		} else {

			// Set undefined
			data = undefined;
		}

		// Callback function
		if(typeof callback === "function") {

			// Call
			callback((data !== undefined) ? data[key] : undefined);
		}

		// Return data
		return((data !== undefined) ? data[key] : undefined);
	},

	// Function for remove data
	remove: function (key, callback) {

		// Remove item
		localStorage.removeItem(key);

		// Callback function
		if(typeof callback === "function") {

			// Call
			callback(true);
		}

		// Return satus
		return true;
	}
};
