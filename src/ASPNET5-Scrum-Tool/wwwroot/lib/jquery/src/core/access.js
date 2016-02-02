define([
	"../core"
], function( jQuery ) ***REMOVED***

// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) ***REMOVED***
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) ***REMOVED***
		chainable = true;
		for ( i in key ) ***REMOVED***
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		***REMOVED***

	// Sets one value
	***REMOVED*** else if ( value !== undefined ) ***REMOVED***
		chainable = true;

		if ( !jQuery.isFunction( value ) ) ***REMOVED***
			raw = true;
		***REMOVED***

		if ( bulk ) ***REMOVED***
			// Bulk operations run against the entire set
			if ( raw ) ***REMOVED***
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			***REMOVED*** else ***REMOVED***
				bulk = fn;
				fn = function( elem, key, value ) ***REMOVED***
					return bulk.call( jQuery( elem ), value );
				***REMOVED***;
			***REMOVED***
		***REMOVED***

		if ( fn ) ***REMOVED***
			for ( ; i < len; i++ ) ***REMOVED***
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
***REMOVED***;

return access;

***REMOVED***);
