define([
	"../core",
	"../var/rnotwhite",
	"./accepts"
], function( jQuery, rnotwhite ) ***REMOVED***

function Data() ***REMOVED***
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = ***REMOVED******REMOVED***, 0, ***REMOVED***
		get: function() ***REMOVED***
			return ***REMOVED******REMOVED***;
		***REMOVED***
	***REMOVED***);

	this.expando = jQuery.expando + Data.uid++;
***REMOVED***

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = ***REMOVED***
	key: function( owner ) ***REMOVED***
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) ***REMOVED***
			return 0;
		***REMOVED***

		var descriptor = ***REMOVED******REMOVED***,
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) ***REMOVED***
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try ***REMOVED***
				descriptor[ this.expando ] = ***REMOVED*** value: unlock ***REMOVED***;
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			***REMOVED*** catch ( e ) ***REMOVED***
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			***REMOVED***
		***REMOVED***

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) ***REMOVED***
			this.cache[ unlock ] = ***REMOVED******REMOVED***;
		***REMOVED***

		return unlock;
	***REMOVED***,
	set: function( owner, data, value ) ***REMOVED***
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) ***REMOVED***
			cache[ data ] = value;

		// Handle: [ owner, ***REMOVED*** properties ***REMOVED*** ] args
		***REMOVED*** else ***REMOVED***
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) ***REMOVED***
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			***REMOVED*** else ***REMOVED***
				for ( prop in data ) ***REMOVED***
					cache[ prop ] = data[ prop ];
				***REMOVED***
			***REMOVED***
		***REMOVED***
		return cache;
	***REMOVED***,
	get: function( owner, key ) ***REMOVED***
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	***REMOVED***,
	access: function( owner, key, value ) ***REMOVED***
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) ***REMOVED***

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		***REMOVED***

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	***REMOVED***,
	remove: function( owner, key ) ***REMOVED***
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) ***REMOVED***
			this.cache[ unlock ] = ***REMOVED******REMOVED***;

		***REMOVED*** else ***REMOVED***
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) ***REMOVED***
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			***REMOVED*** else ***REMOVED***
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) ***REMOVED***
					name = [ key, camel ];
				***REMOVED*** else ***REMOVED***
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				***REMOVED***
			***REMOVED***

			i = name.length;
			while ( i-- ) ***REMOVED***
				delete cache[ name[ i ] ];
			***REMOVED***
		***REMOVED***
	***REMOVED***,
	hasData: function( owner ) ***REMOVED***
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || ***REMOVED******REMOVED***
		);
	***REMOVED***,
	discard: function( owner ) ***REMOVED***
		if ( owner[ this.expando ] ) ***REMOVED***
			delete this.cache[ owner[ this.expando ] ];
		***REMOVED***
	***REMOVED***
***REMOVED***;

return Data;
***REMOVED***);
