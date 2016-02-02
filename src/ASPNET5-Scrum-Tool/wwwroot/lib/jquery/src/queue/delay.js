define([
	"../core",
	"../queue",
	"../effects" // Delay is optional because of this dependency
], function( jQuery ) ***REMOVED***

// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) ***REMOVED***
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) ***REMOVED***
		var timeout = setTimeout( next, time );
		hooks.stop = function() ***REMOVED***
			clearTimeout( timeout );
		***REMOVED***;
	***REMOVED***);
***REMOVED***;

return jQuery.fn.delay;
***REMOVED***);
