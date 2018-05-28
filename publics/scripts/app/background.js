
// Function for update badge
function updateBadge () {

	// Ping Website
	WebsiteRequest.ping(function (infos) {

		// Set total estimation
		var totalEtimation = 0;

		// Loop in all wallets
		for(var id in infos.wallets) {

			// Increment etimation
			totalEtimation += infos.wallets[id].estimatedValue;
		}

		// Update badge
		Notif.setBadge(Math.ceil(totalEtimation)+"$", "#123248");
	});
}

// Update badge
updateBadge();

// Loop for update values
setInterval(function () {

	// Update badge
	updateBadge();
}, 10 * 60 * 1000);
