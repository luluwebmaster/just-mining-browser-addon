
// Disable async ajax
$.ajaxSetup({
	async: false
});

// Set APP config
var config = {
	type: "chrome", // Possible : chrome / firefox / opera / edge
	manifest: $.getJSON("/manifest.json").responseJSON,
	lang: $.getJSON("/publics/scripts/config/lang/fr_FR.json").responseJSON,
	website: {
		hostUrl: "https://www.just-mining.com"
	},
	coinmarketcap: {
		hostUrl: "https://api.coinmarketcap.com"
	}
};

// Set browser config
config.browser = (config.type == "firefox") ? browser : chrome;

// Enable async ajax
$.ajaxSetup({
	async: true
});

// If title found
if(config.manifest !== undefined && config.manifest.name !== undefined) {

	// Set APP title
	$("title").text(config.manifest.name);
}
