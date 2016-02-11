define([
	"../ajax"
], function( jQuery ) ***REMOVED***

jQuery._evalUrl = function( url ) ***REMOVED***
	return jQuery.ajax(***REMOVED***
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	***REMOVED***);
***REMOVED***;

return jQuery._evalUrl;

***REMOVED***);
