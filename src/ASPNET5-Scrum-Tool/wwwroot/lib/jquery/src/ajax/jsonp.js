define([
	"../core",
	"./var/nonce",
	"./var/rquery",
	"../ajax"
], function( jQuery, nonce, rquery ) ***REMOVED***

var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup(***REMOVED***
	jsonp: "callback",
	jsonpCallback: function() ***REMOVED***
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	***REMOVED***
***REMOVED***);

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) ***REMOVED***

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) ***REMOVED***

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) ***REMOVED***
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		***REMOVED*** else if ( s.jsonp !== false ) ***REMOVED***
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		***REMOVED***

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() ***REMOVED***
			if ( !responseContainer ) ***REMOVED***
				jQuery.error( callbackName + " was not called" );
			***REMOVED***
			return responseContainer[ 0 ];
		***REMOVED***;

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() ***REMOVED***
			responseContainer = arguments;
		***REMOVED***;

		// Clean-up function (fires after converters)
		jqXHR.always(function() ***REMOVED***
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) ***REMOVED***
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			***REMOVED***

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) ***REMOVED***
				overwritten( responseContainer[ 0 ] );
			***REMOVED***

			responseContainer = overwritten = undefined;
		***REMOVED***);

		// Delegate to script
		return "script";
	***REMOVED***
***REMOVED***);

***REMOVED***);
