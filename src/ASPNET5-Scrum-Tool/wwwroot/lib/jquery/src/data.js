define([
	"./core",
	"./var/rnotwhite",
	"./core/access",
	"./data/var/data_priv",
	"./data/var/data_user"
], function( jQuery, rnotwhite, access, data_priv, data_user ) ***REMOVED***

//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\***REMOVED***[\w\W]*\***REMOVED***|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) ***REMOVED***
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) ***REMOVED***
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) ***REMOVED***
			try ***REMOVED***
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			***REMOVED*** catch( e ) ***REMOVED******REMOVED***

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		***REMOVED*** else ***REMOVED***
			data = undefined;
		***REMOVED***
	***REMOVED***
	return data;
***REMOVED***

jQuery.extend(***REMOVED***
	hasData: function( elem ) ***REMOVED***
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	***REMOVED***,

	data: function( elem, name, data ) ***REMOVED***
		return data_user.access( elem, name, data );
	***REMOVED***,

	removeData: function( elem, name ) ***REMOVED***
		data_user.remove( elem, name );
	***REMOVED***,

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) ***REMOVED***
		return data_priv.access( elem, name, data );
	***REMOVED***,

	_removeData: function( elem, name ) ***REMOVED***
		data_priv.remove( elem, name );
	***REMOVED***
***REMOVED***);

jQuery.fn.extend(***REMOVED***
	data: function( key, value ) ***REMOVED***
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) ***REMOVED***
			if ( this.length ) ***REMOVED***
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) ***REMOVED***
					i = attrs.length;
					while ( i-- ) ***REMOVED***

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) ***REMOVED***
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) ***REMOVED***
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							***REMOVED***
						***REMOVED***
					***REMOVED***
					data_priv.set( elem, "hasDataAttrs", true );
				***REMOVED***
			***REMOVED***

			return data;
		***REMOVED***

		// Sets multiple values
		if ( typeof key === "object" ) ***REMOVED***
			return this.each(function() ***REMOVED***
				data_user.set( this, key );
			***REMOVED***);
		***REMOVED***

		return access( this, function( value ) ***REMOVED***
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) ***REMOVED***
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) ***REMOVED***
					return data;
				***REMOVED***

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) ***REMOVED***
					return data;
				***REMOVED***

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) ***REMOVED***
					return data;
				***REMOVED***

				// We tried really hard, but the data doesn't exist.
				return;
			***REMOVED***

			// Set the data...
			this.each(function() ***REMOVED***
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) ***REMOVED***
					data_user.set( this, key, value );
				***REMOVED***
			***REMOVED***);
		***REMOVED***, null, value, arguments.length > 1, null, true );
	***REMOVED***,

	removeData: function( key ) ***REMOVED***
		return this.each(function() ***REMOVED***
			data_user.remove( this, key );
		***REMOVED***);
	***REMOVED***
***REMOVED***);

return jQuery;
***REMOVED***);
