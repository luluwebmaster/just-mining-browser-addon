
// Object for manage APP texts
var Lang = {

	// Method for get lang
	get: function (langId) {

		// Selected text
		var selectedText = config.lang;

		// Split ID
		var idInfos = langId.split("-");

		// Loop in all selector
		for(var id in idInfos) {

			// If isset text
			if(selectedText[idInfos[id]] !== undefined) {

				// Set selected text
				selectedText = selectedText[idInfos[id]];
			}
		}

		// Return selected text
		return selectedText;
	},

	// Method for loop in all text
	loop: function (returnID, optionalLang, loop) {

		// Set lang
		var lang = (optionalLang !== undefined) ? optionalLang : config.lang;

		// Set current ID
		var currentID = "";

		// Set return ID
		returnID = (returnID !== undefined) ? returnID : "";

		// Loop in all lang
		for(var id in lang) {

			// Set current ID
			currentID = id;

			// Check type of property
			if(lang[id] instanceof Object) {

				// Loop in text
				Lang.loop((returnID+((returnID !== "") ? "-" : "")+id), lang[id], loop);
			} else {

				// If loop is function
				if(loop !== undefined && typeof loop == "function") {

					// Call function
					loop((returnID+((returnID !== "") ? "-" : "")+id), lang[id]);
				}
			}
		}
	},

	// Method for set text in DOOM
	setDOM: function (tags, loop) {

		// Loop in all text
		Lang.loop(undefined, undefined, function (id, text) {

			// If tags defined
			if(tags !== undefined && typeof tags == "object") {

				// Loop in all tags
				for(var id1 in tags) {

					// Replace tags
					text = text.replace("{"+id1+"}", tags[id1]);
				}
			}

			// Set all text
			$('[title="{'+id+'}"]').attr("title", text);
			$('[placeholder="{'+id+'}"]').attr("placeholder", text);
			$('[value="{'+id+'}"]').attr("value", text);
			$('[text-id="'+id+'"]').html(text);
			$('lg[id="'+id+'"]').html(text);

			// If loop is function
			if(loop !== undefined && typeof loop == "function") {

				// Call function
				loop(id, text);
			}
		});
	}
};
