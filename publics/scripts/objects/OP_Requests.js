
// Object for manage request
var Request = {

	// Method for parse response
	parseResponse: function (response) {

		// If response is object
		if(typeof response == "object") {

			// Parse response
			response = JSON.parse(safeResponse.cleanDomString(JSON.stringify(response)));
		} else if(typeof response == "string") {

			// Parse response
			response = safeResponse.cleanDomString(response);
		} else {

			// Set response
			response = "";
		}

		// Return parsed response
		return response;
	},

	// Method for execute get request
	get: function (url, data, finished) {

		// Send get request
		$.get(url, data, function (response) {

			// If finished function defined
			if(typeof finished == "function") {

				// Call function
				finished(Request.parseResponse(response));
			}
		});
	},

	// Method for execute post request
	post: function (url, data, finished) {

		// Send post request
		$.post(url, data, function (response) {

			// If finished function defined
			if(typeof finished == "function") {

				// Call function
				finished(Request.parseResponse(response));
			}
		});
	}
};
