
// Function for show reponse message
function showMessage(message = "", type = "success", time = 1, callback) {

	// Set callback
	callback = (callback !== undefined) ? callback : function() {};

	// Set message
	$('.responseMessage').css({
		display: "inline-block",
		opacity: 0
	}).animate({
		opacity: 1
	}, 100, function () {

		// After timeout, hide it
		setTimeout(function () {

			// Start anime for hide
			$('.responseMessage').animate({
				opacity: 0
			}, 100, function () {

				// Hide
				$(this).css("display", "none");

				// Call callback function
				callback(true);
			});
		}, time * 1000);
	}).text(message).attr("type", type);
}
