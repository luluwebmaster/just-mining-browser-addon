
// Object for manage APP notification
var Notif = {

	// Method for send notification
	send: function (notifId, params = {
		priority: 2,
		type: "image",
		title: "Default title",
		message: "Default message",
		iconUrl: "publics/images/icon.png",
		imageUrl: "publics/images/icon.png",
		isClickable: true,
		buttons: []
	}, callback, onClick, onButtonClick) {

		// Generate notification id
		notifId = (notifId == undefined) ? uid() : notifId;

		// Delete button if firefox or opera
		if(config.type == "firefox" || config.type == "opera") {

			// Remove button param
			delete params.buttons;
		}

		// Create notification
		config.browser.notifications.create(""+notifId+"", params, function () {

			// Call callback function
			if(typeof callback === "function") {

				// Call
				callback(notifId);
			}

			// Onclick event
			if(typeof onClick === "function") {

				// Add on click event
				config.browser.notifications.onClicked.addListener(function (notifGet){

					// Check notification id
					if(notifId == notifGet) {

						// Call callback click function
						onClick(notifId);
					}
				});
			}

			// On button click event
			if(typeof onButtonClick === "function") {

				// Enable button click event if not firefox and opera
				if(config.type !== "firefox" && config.type !== "opera") {

					// Add on click event
					config.browser.notifications.onButtonClicked.addListener(function (notifGet, index){

						// Check notification id
						if(notifId == notifGet) {

							// Call callback click function
							onButtonClick(notifId, index);
						}
					});
				}
			}
		});
	},

	// Method for clear notification
	clear: function (id, callback) {

		// Clear notification
		config.browser.notifications.clear(id, function () {

			// Call callback function
			if(typeof callback === "function") {

				// Call
				callback(notifId);
			}
		});
	},

	// Method for set badge
	setBadge: function (text, color) {

		// Set color
		color = color || "red";

		//Set badge
		config.browser.browserAction.setBadgeText({text:""+text+""});

		// Set color
		config.browser.browserAction.setBadgeBackgroundColor({color:color});
	},

	// Method for clear badge
	clearBadge: function () {

		//Remove badge
		config.browser.browserAction.setBadgeText({text:""});
	}
};
