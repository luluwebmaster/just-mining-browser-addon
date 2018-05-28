
// When content is ready
$(document).ready(function () {

	// Set APP lang text
	Lang.setDOM();

	// Get contract list
	WebsiteManager.getContractsList(function (contractsList, infos) {

		// Check if user is conencted
		if(infos.connected == true) {

			// Load wallet list
			for(var id in infos.wallets) {

				// Append element
				$("body > .content > .wallets > .content").append('<div class="wallet"><img src="'+config.website.hostUrl+'/images/icons/'+infos.wallets[id].symb+'.svg" class="icon" /><span class="value">'+infos.wallets[id].value+'</span> <span class="usd" title="'+Lang.get("content-wallets-wallet-title")+'">( '+infos.wallets[id].estimatedValue+'$ )</span> <span class="symb">'+infos.wallets[id].symb+'</span></div>');
			}
			// Load contracts list
			for(var id in contractsList) {

				// Set current contract
				var currentContract = contractsList[id];

				// Set total cards hash
				var totalCardsHash = "";

				// Set total temps
				var totalTemps = "";

				// Set total currencies
				var totalCurrencies = "";

				// Loop in all cards hash
				for(var id1 in currentContract.cardsHash) {

					// Add to total
					totalCardsHash = totalCardsHash+'<span class="item '+currentContract.cardsHash[id1].status+'">'+currentContract.cardsHash[id1].value+'</span>';
				}

				// Loop in all temps
				for(var id1 in currentContract.cardsTemp) {

					// Add to total
					totalTemps = totalTemps+'<span class="item">'+currentContract.cardsTemp[id1]+'</span>';
				}

				// Loop in all currencies
				for(var id1 in currentContract.currenciesList) {

					// Add to total
					totalCurrencies = totalCurrencies+'<img src="'+config.website.hostUrl+'/images/icons/'+currentContract.currenciesList[id1].symb+'.svg" class="icon '+((currentContract.currenciesList[id1].selected == true) ? "selected" : "")+'" currency-symb="'+currentContract.currenciesList[id1].symb+'" title="'+Lang.get("content-contracts-contract-update-currency")+' '+currentContract.currenciesList[id1].symb+'" />';
				}

				// Add auto to currencies list
				totalCurrencies = totalCurrencies+'<img src="publics/images/auto.png" class="icon auto '+((currentContract.mode == "automatique") ? "selected" : "")+'" currency-symb="AUTO" title="'+Lang.get("content-contracts-contract-update-auto")+'" />';

				// Append element
				$("body > .content > .contracts > .content").append(
					'<div class="contract" contract-id="'+currentContract.contractId+'" bob-id="'+currentContract.bobId+'">'+
						'<h3 class="title '+currentContract.statusCode+'">'+((infos.oneTimePassword == false) ? '[<i class="fas fa-wrench action"></i>] ' : "")+'['+((currentContract.statusCode == "correct") ? '<i class="far fa-check-circle status" title="'+currentContract.status+'"></i>' : ((currentContract.statusCode == "rebooting") ? '<i class="far fa-check-circle status" title="'+currentContract.status+'"></i>' : '<i class="far fa-times-circle status" title="'+currentContract.status+'"></i>'))+'] '+currentContract.name+'</h3>'+
						'<div class="content">'+
							'<div class="infos">'+
								'<div class="item">'+
									'<span class="name">'+Lang.get("content-contracts-contract-infos-1")+'</span>'+
									'<span class="value">'+currentContract.start+'</span>'+
								'</div>'+
								'<div class="item">'+
									'<span class="name">'+Lang.get("content-contracts-contract-infos-2")+'</span>'+
									'<span class="value">'+currentContract.hashTotal+'</span>'+
								'</div>'+
								'<div class="item content first">'+
									'<span class="name">'+Lang.get("content-contracts-contract-infos-3")+'</span>'+
									'<div class="value">'+totalCardsHash+'</div>'+
								'</div>'+
								'<div class="item content">'+
									'<span class="name">'+Lang.get("content-contracts-contract-infos-4")+'</span>'+
									'<div class="value">'+totalTemps+'</div>'+
								'</div>'+
							'</div>'+
							'<div class="action">'+
								'<h3 class="title">'+Lang.get("content-contracts-contract-title")+'</h3>'+
								'<div class="update">'+totalCurrencies+'</div>'+
								'<div class="reboot '+((currentContract.statusCode == "rebooting") ? "disabled" : "")+'" title="'+Lang.get("content-contracts-contract-reboot")+'">'+
									'<i class="fas fa-sync"></i>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'
				);
			}

			// Click on actions button for contract
			$("body > .content > .contracts > .content > .contract > .title > .action").click(function () {

				// If for open
				if($(this).closest(".contract").find(".action").css("top") == "auto" || $(this).closest(".contract").find(".action").css("top") == "-100%") {

					// Start animation
					$(this).closest(".contract").find(".action").animate({
						top: "0px",
						bottom: "0px"
					}, 100);
				} else {

					// Start animation
					$(this).closest(".contract").find(".action").animate({
						top: "-100%",
						bottom: "100%"
					}, 100);
				}
			});

			// Click on actions button for update currency
			$("body > .content > .contracts > .content > .contract > .content > .action > .update > .icon").click(function () {

				// Get contract id
				var contractId = $(this).closest(".contract").attr("contract-id");

				// Get cureency symb
				var currencySymb = $(this).attr("currency-symb");

				// Switch currency
				WebsiteManager.switchCurrency(contractId, currencySymb, function () {

					// Show message
					showMessage(Lang.get("content-contracts-contract-actions-1"), "success", 5);
				});

				// Remove current selected currency
				$("body > .content > .contracts > .content > .contract > .content > .action > .update > .icon").removeClass("selected");

				// Update selected currency
				$(this).addClass("selected");
			});

			// Click on actions button for restart bob
			$("body > .content > .contracts > .content > .contract > .content > .action > .reboot").click(function () {

				// Check if button is not disabled
				if(!$(this).hasClass("disabled")) {

					// Save this button
					var currentButton = this;

					// Get bob id
					var bobId = $(this).closest(".contract").attr("bob-id");

					// Reboot bob
					WebsiteManager.rebootBob(bobId, function () {

						// Disable button
						$(currentButton).addClass("disabled");

						// Show message
						showMessage(Lang.get("content-contracts-contract-actions-1"), "success", 5);
					});
				}
			});

			// Switch loading element
			$('.loading-popup').animate({
				left: "-100%"
			}, 500);

			// Switch popup element
			$('body > .content').animate({
				left: "0px"
			}, 500, function () {

				// If google auth needed
				if(infos.oneTimePassword == true) {

					// Show element
					$(".googleAuth").css({
						display: "inline-block"
					}).animate({
						opacity: 1
					}, 300);

					// Write on input
					$(".googleAuth .code").keyup(function () {

						// Get input val
						var inputVal = $(this).val().trim();

						// Check lenth of text
						if(inputVal.length == 6) {

							// Save this input
							var thisInput = this;

							// Disable input
							$(thisInput).attr("disabled", "disabled");

							// Send request
							// Vérifier que le code n'est plus demandé, si c'est le cas, reload le popup ( location.reload()), sinon, afficher une erreur
							WebsiteManager.sendGoogleAuth(infos.oneTimeToken, inputVal, function (success) {

								// If success
								if(success == true) {

									// Show success
									showMessage(Lang.get("google-auth-success"), "success", 3, function () {

										// Reload popup
										location.reload();
									});
								} else {

									// Show error
									showMessage(Lang.get("google-auth-error"), "error", 5);

									// Disable input
									$(thisInput).removeAttr("disabled");
								}
							});
						}
					});

					// Click on close button
					$(".googleAuth .close").click(function () {

						// Hide popup
						$(".googleAuth").animate({
							opacity: 0
						}, 100, function () {

							// Hide total
							$(this).css("display", "none");
						});
					});
				}
			});
		} else {

			// Set error
			$('.loading-popup .loading .link').text(Lang.get("content-error-1"));
		}
	});
});
