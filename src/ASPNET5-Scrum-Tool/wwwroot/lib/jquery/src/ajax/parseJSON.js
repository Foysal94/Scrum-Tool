define([
	"../core"
], function( jQuery ) ***REMOVED***

// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) ***REMOVED***
	return JSON.parse( data + "" );
***REMOVED***;

return jQuery.parseJSON;

***REMOVED***);
