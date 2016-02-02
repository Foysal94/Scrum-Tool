define([
	"../core",
	"../var/support",
	"../ajax"
], function( jQuery, support ) ***REMOVED***

jQuery.ajaxSettings.xhr = function() ***REMOVED***
	try ***REMOVED***
		return new XMLHttpRequest();
	***REMOVED*** catch( e ) ***REMOVED******REMOVED***
***REMOVED***;

var xhrId = 0,
	xhrCallbacks = ***REMOVED******REMOVED***,
	xhrSuccessStatus = ***REMOVED***
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	***REMOVED***,
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) ***REMOVED***
	window.attachEvent( "onunload", function() ***REMOVED***
		for ( var key in xhrCallbacks ) ***REMOVED***
			xhrCallbacks[ key ]();
		***REMOVED***
	***REMOVED***);
***REMOVED***

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) ***REMOVED***
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) ***REMOVED***
		return ***REMOVED***
			send: function( headers, complete ) ***REMOVED***
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) ***REMOVED***
					for ( i in options.xhrFields ) ***REMOVED***
						xhr[ i ] = options.xhrFields[ i ];
					***REMOVED***
				***REMOVED***

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) ***REMOVED***
					xhr.overrideMimeType( options.mimeType );
				***REMOVED***

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) ***REMOVED***
					headers["X-Requested-With"] = "XMLHttpRequest";
				***REMOVED***

				// Set headers
				for ( i in headers ) ***REMOVED***
					xhr.setRequestHeader( i, headers[ i ] );
				***REMOVED***

				// Callback
				callback = function( type ) ***REMOVED***
					return function() ***REMOVED***
						if ( callback ) ***REMOVED***
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) ***REMOVED***
								xhr.abort();
							***REMOVED*** else if ( type === "error" ) ***REMOVED***
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							***REMOVED*** else ***REMOVED***
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? ***REMOVED***
										text: xhr.responseText
									***REMOVED*** : undefined,
									xhr.getAllResponseHeaders()
								);
							***REMOVED***
						***REMOVED***
					***REMOVED***;
				***REMOVED***;

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try ***REMOVED***
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				***REMOVED*** catch ( e ) ***REMOVED***
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) ***REMOVED***
						throw e;
					***REMOVED***
				***REMOVED***
			***REMOVED***,

			abort: function() ***REMOVED***
				if ( callback ) ***REMOVED***
					callback();
				***REMOVED***
			***REMOVED***
		***REMOVED***;
	***REMOVED***
***REMOVED***);

***REMOVED***);
