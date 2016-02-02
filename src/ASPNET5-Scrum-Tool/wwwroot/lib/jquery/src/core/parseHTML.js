define([
	"../core",
	"./var/rsingleTag",
	"../manipulation" // buildFragment
], function( jQuery, rsingleTag ) ***REMOVED***

// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) ***REMOVED***
	if ( !data || typeof data !== "string" ) ***REMOVED***
		return null;
	***REMOVED***
	if ( typeof context === "boolean" ) ***REMOVED***
		keepScripts = context;
		context = false;
	***REMOVED***
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) ***REMOVED***
		return [ context.createElement( parsed[1] ) ];
	***REMOVED***

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) ***REMOVED***
		jQuery( scripts ).remove();
	***REMOVED***

	return jQuery.merge( [], parsed.childNodes );
***REMOVED***;

return jQuery.parseHTML;

***REMOVED***);
