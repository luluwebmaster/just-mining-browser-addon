
// Function for manage website
var WebsiteManager = {

	// Function for send google auth
	sendGoogleAuth: function (token, code, callback) {

		// Set callback
		callback = (callback !== undefined) ? callback : function() {};

		// Execute post request
		WebsiteRequest.post("/2fa", {
			_token: token,
			one_time_password: code
		}, function (response, test) {

			// Call callback functions
			callback((response !== false) ? true : false);
		});
	},

	// Function for get contracts list
	getContractsList: function (callback) {

		// Set callback
		callback = (callback !== undefined) ? callback : function() {};

		// Ping Website
		WebsiteRequest.ping(function (infos) {

			// If user is connected
			if(infos.connected == true) {

				// Execute request
				WebsiteRequest.get("/my/contracts", null, function (response) {

					// Set contracts list
					var contractsList = [];

					// Temp append
					var tempAppend = document.createElement("div");
					$(tempAppend).append(response);

					// Set one time status
					infos.oneTimePassword = ($(tempAppend).find("#one_time_password").length <= 0) ? false : true;

					// Set one time token
					infos.oneTimeToken = ($(tempAppend).find("#one_time_password").length > 0) ? $(tempAppend).find("#one_time_password").closest(".form-horizontal").find('[name="_token"]').val() : null;

					// If not one time password
					if($(tempAppend).find("#one_time_password").length <= 0) {

						// Get contract list
						var contractListDom = $(tempAppend).find("#customerContractsPage .element_contract").toArray();

						// Loop in all dom contract
						for(var id in contractListDom) {

							// Set current contract
							var currentContract = contractListDom[id];

							// Add to contract list
							contractsList.push({
								contractId: parseFloat($(currentContract).find(".currencySwitcher").attr("id").replace("currencySwitcher_contract", "")),
								bobId: parseFloat($(currentContract).attr("id").replace("element_bob_", "")),
								name: $(currentContract).find(".informations .title").text().trim(),
								start: $($(currentContract).find(".informations .line")[0]).find(".data").text().trim(),
								lastData: $($(currentContract).find(".informations .line")[1]).find(".data").text().trim(),
								upTime: $($(currentContract).find(".informations .line")[2]).find(".data").text().trim(),
								hashTotal: $($(currentContract).find(".informations .line")[3]).find(".data").text().trim(),
								cardsHash: [],
								cardsTemp: [],
								currentCurrency: $(currentContract).find(".currencySwitcher .currencyAmount.current strong").text().trim(),
								currenciesList: [],
								status: $(currentContract).find(".commands .status span").text().trim(),
								statusCode: $(currentContract).find(".commands .status span").attr("class"),
								mode: $(currentContract).find(".currencySwitcher .summary .mode").text().split(":")[1].trim().toLowerCase()
							});

							// Set total cards hash
							var totalCardsHash = $($(currentContract).find(".informations .line")[4]).find(".data span").toArray();

							// Loop in all cards hash
							for(var id1 in totalCardsHash) {

								// Push to cards hash
								contractsList[contractsList.length-1].cardsHash.push({
									value: parseFloat($(totalCardsHash[id1]).text()),
									status: ($(totalCardsHash[id1]).hasClass("critical")) ? "critical" : "correct"
								});
							}

							// Set total cards temp
							var totalCardsTemp = $($(currentContract).find(".informations .line")[5]).find(".data span").toArray();

							// Loop in all cards temp
							for(var id1 in totalCardsTemp) {

								// Push to cards temp
								contractsList[contractsList.length-1].cardsTemp.push(parseFloat($(totalCardsTemp[id1]).text()));
							}

							// Set total currencies
							var totalCurrencies = $(currentContract).find(".currencySwitcher .summary .currency").toArray();

							// Loop in all currencies
							for(var id1 in totalCurrencies) {

								// Push to cards temp
								contractsList[contractsList.length-1].currenciesList.push({
									symb: $(totalCurrencies[id1]).find(".currencyAmount strong").text().trim(),
									balance: parseFloat($(totalCurrencies[id1]).find(".currencyAmount").text().trim()),
									selected: (($(totalCurrencies[id1]).find(".currencyAmount").hasClass("current")) ? true : false)
								});
							}
						}

						// Save contracts list
						Storage.save("contracts-list", contractsList, function () {

							// Call callback
							callback(contractsList, infos);
						});
					} else {

						// Get saved contracts
						Storage.get("contracts-list", function (contractsList) {

							// Set contracts list
							contractsList = (contractsList == undefined) ? [] : contractsList;

							// Call callback
							callback(contractsList, infos);
						});
					}
				});
			} else {

				// Call callback
				callback([], infos);
			}
		});
	},

	// Function for switch currency
	switchCurrency: function (contractId = null, type = null, callback) {

		// Set callback
		callback = (callback !== undefined) ? callback : function() {};

		// Check values
		if(contractId !== null && type !== null) {

			// Ping Website
			WebsiteRequest.ping(function (infos) {

				// If user is connected
				if(infos.connected == true) {

					// Execute request
					WebsiteRequest.post("/contract/"+contractId+"/switchCurrency", {
						currency: type
					}, function (response) {

						// Call callback
						callback((response == "true") ? true : false);
					});
				}
			});
		} else {

			// Call callback
			callback(false);
		}
	},

	// Function for reboot bob
	rebootBob: function (bobId = null, callback) {

		// Set callback
		callback = (callback !== undefined) ? callback : function() {};

		// Check values
		if(bobId !== null) {

			// Ping Website
			WebsiteRequest.ping(function (infos) {

				// If user is connected
				if(infos.connected == true) {

					// Execute request
					WebsiteRequest.post("/account/contract/bob/reboot", {
						bob_id: bobId
					}, function (response) {

						// Parse repsonse
						response = JSON.parse(response);

						// Call callback
						callback((response.type == "success") ? true : false);
					});
				}
			});
		} else {

			// Call callback
			callback(false);
		}
	}
};
