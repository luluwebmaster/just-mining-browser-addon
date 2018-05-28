
// Object for manage website request
var WebsiteRequest = {

	// Function for ping website
	ping: function (callback = undefined) {

		// Set callback
		callback = (callback !== undefined) ? callback : function() {};

		// Ping website
		$.get(config.website.hostUrl, null, function (response) {

			// Get coinmarketcap infos
			Coinmarketcap.getList(function (coinmarketcapInfos) {

				// Set website infos
				var websiteInfos = {};

				// Temp append
				var tempAppend = document.createElement("div");
				$(tempAppend).append(response);

				// Get wallet element
				var walletElement = $(tempAppend).find('.wallets .list .wallet').toArray();

				// Get CSRF code
				websiteInfos.csrf = $(tempAppend).find('meta[name="csrf-token"]')[0].content;

				// Set connected status
				websiteInfos.connected = ($(tempAppend).find('#logout-form').length > 0) ? true : false;

				// Set wallet wallets
				websiteInfos.wallets = [];

				// Loop in wallet list
				for(var id in walletElement) {

					// Get coin infos
					var coinInfos = Coinmarketcap.getFromListWithSymb(coinmarketcapInfos.data, $(walletElement[id]).find(".currency").text());

					// Add to wallets
					websiteInfos.wallets.push({
						value: parseFloat($(walletElement[id]).find(".value").text()),
						symb: $(walletElement[id]).find(".currency").text(),
						estimatedValue: (Math.round((parseFloat($(walletElement[id]).find(".value").text()) * coinInfos.quotes.USD.price) * 100) / 100)
					});
				}

				// Remove temp doom
				$(tempAppend).remove();

				// Set CSRF token
				$.ajaxSetup({
					headers: {
						'X-CSRF-TOKEN': websiteInfos.csrf
					}
				});

				// Call caklback function
				callback(websiteInfos);
			});
		});
	},

	// Function for execute post
	post: function (path, data, callback) {

		// Set callback
		callback = (callback !== undefined) ? callback : function() {};

		// Execute request
		$.post(config.website.hostUrl+path, data, callback).fail(function() {

			// Call callback function
			callback(false);
		});
	},

	// Function for execute get
	get: function (path, data, callback) {

		// Set callback
		callback = (callback !== undefined) ? callback : function() {};

		// Execute request
		$.get(config.website.hostUrl+path, data, callback).fail(function() {

			// Call callback function
			callback(false);
		});
	}
};
