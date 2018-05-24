
// Object for manage website request
var WebsiteRequest = {

	// Function for ping website
	ping: function (callback = undefined) {

		// Set callback
		callback = (callback !== undefined) ? callback : function() {};

		// Ping website
		$.get(config.website.hostUrl, null, function (response) {

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

				// Add to wallets
				websiteInfos.wallets.push({
					value: parseFloat($(walletElement[id]).find(".value").text()),
					symb: $(walletElement[id]).find(".currency").text()
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
