define([
	"../core",
	"../var/strundefined"
], function( jQuery, strundefined ) ***REMOVED***

var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) ***REMOVED***
	if ( window.$ === jQuery ) ***REMOVED***
		window.$ = _$;
	***REMOVED***

	if ( deep && window.jQuery === jQuery ) ***REMOVED***
		window.jQuery = _jQuery;
	***REMOVED***

	return jQuery;
***REMOVED***;

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) ***REMOVED***
	window.jQuery = window.$ = jQuery;
***REMOVED***

***REMOVED***);
