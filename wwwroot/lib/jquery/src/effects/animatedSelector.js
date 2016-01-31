define([
	"../core",
	"../selector",
	"../effects"
], function( jQuery ) ***REMOVED***

jQuery.expr.filters.animated = function( elem ) ***REMOVED***
	return jQuery.grep(jQuery.timers, function( fn ) ***REMOVED***
		return elem === fn.elem;
	***REMOVED***).length;
***REMOVED***;

***REMOVED***);
