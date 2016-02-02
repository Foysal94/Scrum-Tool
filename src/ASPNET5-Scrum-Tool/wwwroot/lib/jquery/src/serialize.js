define([
	"./core",
	"./manipulation/var/rcheckableType",
	"./core/init",
	"./traversing", // filter
	"./attributes/prop"
], function( jQuery, rcheckableType ) ***REMOVED***

var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) ***REMOVED***
	var name;

	if ( jQuery.isArray( obj ) ) ***REMOVED***
		// Serialize array item.
		jQuery.each( obj, function( i, v ) ***REMOVED***
			if ( traditional || rbracket.test( prefix ) ) ***REMOVED***
				// Treat each array item as a scalar.
				add( prefix, v );

			***REMOVED*** else ***REMOVED***
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			***REMOVED***
		***REMOVED***);

	***REMOVED*** else if ( !traditional && jQuery.type( obj ) === "object" ) ***REMOVED***
		// Serialize object item.
		for ( name in obj ) ***REMOVED***
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		***REMOVED***

	***REMOVED*** else ***REMOVED***
		// Serialize scalar item.
		add( prefix, obj );
	***REMOVED***
***REMOVED***

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) ***REMOVED***
	var prefix,
		s = [],
		add = function( key, value ) ***REMOVED***
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		***REMOVED***;

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) ***REMOVED***
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	***REMOVED***

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) ***REMOVED***
		// Serialize the form elements
		jQuery.each( a, function() ***REMOVED***
			add( this.name, this.value );
		***REMOVED***);

	***REMOVED*** else ***REMOVED***
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) ***REMOVED***
			buildParams( prefix, a[ prefix ], traditional, add );
		***REMOVED***
	***REMOVED***

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
***REMOVED***;

jQuery.fn.extend(***REMOVED***
	serialize: function() ***REMOVED***
		return jQuery.param( this.serializeArray() );
	***REMOVED***,
	serializeArray: function() ***REMOVED***
		return this.map(function() ***REMOVED***
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		***REMOVED***)
		.filter(function() ***REMOVED***
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		***REMOVED***)
		.map(function( i, elem ) ***REMOVED***
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) ***REMOVED***
						return ***REMOVED*** name: elem.name, value: val.replace( rCRLF, "\r\n" ) ***REMOVED***;
					***REMOVED***) :
					***REMOVED*** name: elem.name, value: val.replace( rCRLF, "\r\n" ) ***REMOVED***;
		***REMOVED***).get();
	***REMOVED***
***REMOVED***);

return jQuery;
***REMOVED***);
