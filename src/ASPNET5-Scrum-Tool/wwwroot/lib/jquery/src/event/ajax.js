define([
	"../core",
	"../event"
], function( jQuery ) ***REMOVED***

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) ***REMOVED***
	jQuery.fn[ type ] = function( fn ) ***REMOVED***
		return this.on( type, fn );
	***REMOVED***;
***REMOVED***);

***REMOVED***);
