define([
	"../core"
], function( jQuery ) ***REMOVED***

// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) ***REMOVED***
	var ret, name,
		old = ***REMOVED******REMOVED***;

	// Remember the old values, and insert the new ones
	for ( name in options ) ***REMOVED***
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	***REMOVED***

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) ***REMOVED***
		elem.style[ name ] = old[ name ];
	***REMOVED***

	return ret;
***REMOVED***;

return jQuery.swap;

***REMOVED***);