define([
	"../core",
	"../core/parseHTML",
	"../ajax",
	"../traversing",
	"../manipulation",
	"../selector",
	// Optional event/alias dependency
	"../event/alias"
], function( jQuery ) ***REMOVED***

// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) ***REMOVED***
	if ( typeof url !== "string" && _load ) ***REMOVED***
		return _load.apply( this, arguments );
	***REMOVED***

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) ***REMOVED***
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	***REMOVED***

	// If it's a function
	if ( jQuery.isFunction( params ) ) ***REMOVED***

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	***REMOVED*** else if ( params && typeof params === "object" ) ***REMOVED***
		type = "POST";
	***REMOVED***

	// If we have elements to modify, make the request
	if ( self.length > 0 ) ***REMOVED***
		jQuery.ajax(***REMOVED***
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		***REMOVED***).done(function( responseText ) ***REMOVED***

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		***REMOVED***).complete( callback && function( jqXHR, status ) ***REMOVED***
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		***REMOVED***);
	***REMOVED***

	return this;
***REMOVED***;

***REMOVED***);
