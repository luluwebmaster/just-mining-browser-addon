
// Function for manage coinmarketcap
var Coinmarketcap = {

	// Function for get list
	getList: function (callback) {

		// Set callback
		callback = (callback !== undefined) ? callback : function() {};

		// Ping API
		Request.get(config.coinmarketcap.hostUrl+"/v2/ticker", null, function (response) {

			// Call callack function
			callback(response);
		});
	},

	// Function for get coin infos with symb from list
	getFromListWithSymb: function (list = null, symb = null) {

		// Check values
		if(list !== null && symb !== null) {

			// Set found coin
			var foundCoin = false;

			// Loop in all elements
			for(var id in list) {

				// Check element
				if(list[id].symbol == symb) {

					// Set found coin
					foundCoin = list[id];

					// Stop loop
					break;
				}
			}

			// Return found coin
			return(foundCoin);
		} else {

			// Return error
			return(false);
		}
	}
};
