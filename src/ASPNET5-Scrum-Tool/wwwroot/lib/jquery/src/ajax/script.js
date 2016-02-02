define([
	"../core",
	"../ajax"
], function( jQuery ) ***REMOVED***

// Install script dataType
jQuery.ajaxSetup(***REMOVED***
	accepts: ***REMOVED***
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	***REMOVED***,
	contents: ***REMOVED***
		script: /(?:java|ecma)script/
	***REMOVED***,
	converters: ***REMOVED***
		"text script": function( text ) ***REMOVED***
			jQuery.globalEval( text );
			return text;
		***REMOVED***
	***REMOVED***
***REMOVED***);

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) ***REMOVED***
	if ( s.cache === undefined ) ***REMOVED***
		s.cache = false;
	***REMOVED***
	if ( s.crossDomain ) ***REMOVED***
		s.type = "GET";
	***REMOVED***
***REMOVED***);

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) ***REMOVED***
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) ***REMOVED***
		var script, callback;
		return ***REMOVED***
			send: function( _, complete ) ***REMOVED***
				script = jQuery("<script>").prop(***REMOVED***
					async: true,
					charset: s.scriptCharset,
					src: s.url
				***REMOVED***).on(
					"load error",
					callback = function( evt ) ***REMOVED***
						script.remove();
						callback = null;
						if ( evt ) ***REMOVED***
							complete( evt.type === "error" ? 404 : 200, evt.type );
						***REMOVED***
					***REMOVED***
				);
				document.head.appendChild( script[ 0 ] );
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
