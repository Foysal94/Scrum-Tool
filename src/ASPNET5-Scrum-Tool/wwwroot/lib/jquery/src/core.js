define([
	"./var/arr",
	"./var/slice",
	"./var/concat",
	"./var/push",
	"./var/indexOf",
	"./var/class2type",
	"./var/toString",
	"./var/hasOwn",
	"./var/support"
], function( arr, slice, concat, push, indexOf, class2type, toString, hasOwn, support ) ***REMOVED***

var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "@VERSION",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) ***REMOVED***
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	***REMOVED***,

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) ***REMOVED***
		return letter.toUpperCase();
	***REMOVED***;

jQuery.fn = jQuery.prototype = ***REMOVED***
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() ***REMOVED***
		return slice.call( this );
	***REMOVED***,

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) ***REMOVED***
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	***REMOVED***,

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) ***REMOVED***

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	***REMOVED***,

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) ***REMOVED***
		return jQuery.each( this, callback, args );
	***REMOVED***,

	map: function( callback ) ***REMOVED***
		return this.pushStack( jQuery.map(this, function( elem, i ) ***REMOVED***
			return callback.call( elem, i, elem );
		***REMOVED***));
	***REMOVED***,

	slice: function() ***REMOVED***
		return this.pushStack( slice.apply( this, arguments ) );
	***REMOVED***,

	first: function() ***REMOVED***
		return this.eq( 0 );
	***REMOVED***,

	last: function() ***REMOVED***
		return this.eq( -1 );
	***REMOVED***,

	eq: function( i ) ***REMOVED***
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	***REMOVED***,

	end: function() ***REMOVED***
		return this.prevObject || this.constructor(null);
	***REMOVED***,

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
***REMOVED***;

jQuery.extend = jQuery.fn.extend = function() ***REMOVED***
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || ***REMOVED******REMOVED***,
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) ***REMOVED***
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || ***REMOVED******REMOVED***;
		i++;
	***REMOVED***

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) ***REMOVED***
		target = ***REMOVED******REMOVED***;
	***REMOVED***

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) ***REMOVED***
		target = this;
		i--;
	***REMOVED***

	for ( ; i < length; i++ ) ***REMOVED***
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) ***REMOVED***
			// Extend the base object
			for ( name in options ) ***REMOVED***
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) ***REMOVED***
					continue;
				***REMOVED***

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) ***REMOVED***
					if ( copyIsArray ) ***REMOVED***
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					***REMOVED*** else ***REMOVED***
						clone = src && jQuery.isPlainObject(src) ? src : ***REMOVED******REMOVED***;
					***REMOVED***

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				***REMOVED*** else if ( copy !== undefined ) ***REMOVED***
					target[ name ] = copy;
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	// Return the modified object
	return target;
***REMOVED***;

jQuery.extend(***REMOVED***
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) ***REMOVED***
		throw new Error( msg );
	***REMOVED***,

	noop: function() ***REMOVED******REMOVED***,

	isFunction: function( obj ) ***REMOVED***
		return jQuery.type(obj) === "function";
	***REMOVED***,

	isArray: Array.isArray,

	isWindow: function( obj ) ***REMOVED***
		return obj != null && obj === obj.window;
	***REMOVED***,

	isNumeric: function( obj ) ***REMOVED***
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	***REMOVED***,

	isPlainObject: function( obj ) ***REMOVED***
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) ***REMOVED***
			return false;
		***REMOVED***

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) ***REMOVED***
			return false;
		***REMOVED***

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by ***REMOVED******REMOVED*** or constructed with new Object
		return true;
	***REMOVED***,

	isEmptyObject: function( obj ) ***REMOVED***
		var name;
		for ( name in obj ) ***REMOVED***
			return false;
		***REMOVED***
		return true;
	***REMOVED***,

	type: function( obj ) ***REMOVED***
		if ( obj == null ) ***REMOVED***
			return obj + "";
		***REMOVED***
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	***REMOVED***,

	// Evaluates a script in a global context
	globalEval: function( code ) ***REMOVED***
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) ***REMOVED***
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) ***REMOVED***
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			***REMOVED*** else ***REMOVED***
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) ***REMOVED***
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	***REMOVED***,

	nodeName: function( elem, name ) ***REMOVED***
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	***REMOVED***,

	// args is for internal usage only
	each: function( obj, callback, args ) ***REMOVED***
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) ***REMOVED***
			if ( isArray ) ***REMOVED***
				for ( ; i < length; i++ ) ***REMOVED***
					value = callback.apply( obj[ i ], args );

					if ( value === false ) ***REMOVED***
						break;
					***REMOVED***
				***REMOVED***
			***REMOVED*** else ***REMOVED***
				for ( i in obj ) ***REMOVED***
					value = callback.apply( obj[ i ], args );

					if ( value === false ) ***REMOVED***
						break;
					***REMOVED***
				***REMOVED***
			***REMOVED***

		// A special, fast, case for the most common use of each
		***REMOVED*** else ***REMOVED***
			if ( isArray ) ***REMOVED***
				for ( ; i < length; i++ ) ***REMOVED***
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) ***REMOVED***
						break;
					***REMOVED***
				***REMOVED***
			***REMOVED*** else ***REMOVED***
				for ( i in obj ) ***REMOVED***
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) ***REMOVED***
						break;
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***

		return obj;
	***REMOVED***,

	// Support: Android<4.1
	trim: function( text ) ***REMOVED***
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	***REMOVED***,

	// results is for internal usage only
	makeArray: function( arr, results ) ***REMOVED***
		var ret = results || [];

		if ( arr != null ) ***REMOVED***
			if ( isArraylike( Object(arr) ) ) ***REMOVED***
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			***REMOVED*** else ***REMOVED***
				push.call( ret, arr );
			***REMOVED***
		***REMOVED***

		return ret;
	***REMOVED***,

	inArray: function( elem, arr, i ) ***REMOVED***
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	***REMOVED***,

	merge: function( first, second ) ***REMOVED***
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) ***REMOVED***
			first[ i++ ] = second[ j ];
		***REMOVED***

		first.length = i;

		return first;
	***REMOVED***,

	grep: function( elems, callback, invert ) ***REMOVED***
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) ***REMOVED***
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) ***REMOVED***
				matches.push( elems[ i ] );
			***REMOVED***
		***REMOVED***

		return matches;
	***REMOVED***,

	// arg is for internal usage only
	map: function( elems, callback, arg ) ***REMOVED***
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) ***REMOVED***
			for ( ; i < length; i++ ) ***REMOVED***
				value = callback( elems[ i ], i, arg );

				if ( value != null ) ***REMOVED***
					ret.push( value );
				***REMOVED***
			***REMOVED***

		// Go through every key on the object,
		***REMOVED*** else ***REMOVED***
			for ( i in elems ) ***REMOVED***
				value = callback( elems[ i ], i, arg );

				if ( value != null ) ***REMOVED***
					ret.push( value );
				***REMOVED***
			***REMOVED***
		***REMOVED***

		// Flatten any nested arrays
		return concat.apply( [], ret );
	***REMOVED***,

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) ***REMOVED***
		var tmp, args, proxy;

		if ( typeof context === "string" ) ***REMOVED***
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		***REMOVED***

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) ***REMOVED***
			return undefined;
		***REMOVED***

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() ***REMOVED***
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		***REMOVED***;

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	***REMOVED***,

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
***REMOVED***);

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) ***REMOVED***
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
***REMOVED***);

function isArraylike( obj ) ***REMOVED***

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) ***REMOVED***
		return false;
	***REMOVED***

	if ( obj.nodeType === 1 && length ) ***REMOVED***
		return true;
	***REMOVED***

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
***REMOVED***

return jQuery;
***REMOVED***);
