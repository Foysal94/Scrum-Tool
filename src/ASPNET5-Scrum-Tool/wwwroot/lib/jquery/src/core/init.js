// Initialize a jQuery object
define([
	"../core",
	"./var/rsingleTag",
	"../traversing/findFilter"
], function( jQuery, rsingleTag ) ***REMOVED***

// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) ***REMOVED***
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) ***REMOVED***
			return this;
		***REMOVED***

		// Handle HTML strings
		if ( typeof selector === "string" ) ***REMOVED***
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) ***REMOVED***
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			***REMOVED*** else ***REMOVED***
				match = rquickExpr.exec( selector );
			***REMOVED***

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) ***REMOVED***

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) ***REMOVED***
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) ***REMOVED***
						for ( match in context ) ***REMOVED***
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) ***REMOVED***
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							***REMOVED*** else ***REMOVED***
								this.attr( match, context[ match ] );
							***REMOVED***
						***REMOVED***
					***REMOVED***

					return this;

				// HANDLE: $(#id)
				***REMOVED*** else ***REMOVED***
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) ***REMOVED***
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					***REMOVED***

					this.context = document;
					this.selector = selector;
					return this;
				***REMOVED***

			// HANDLE: $(expr, $(...))
			***REMOVED*** else if ( !context || context.jquery ) ***REMOVED***
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			***REMOVED*** else ***REMOVED***
				return this.constructor( context ).find( selector );
			***REMOVED***

		// HANDLE: $(DOMElement)
		***REMOVED*** else if ( selector.nodeType ) ***REMOVED***
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		***REMOVED*** else if ( jQuery.isFunction( selector ) ) ***REMOVED***
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		***REMOVED***

		if ( selector.selector !== undefined ) ***REMOVED***
			this.selector = selector.selector;
			this.context = selector.context;
		***REMOVED***

		return jQuery.makeArray( selector, this );
	***REMOVED***;

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );

return init;

***REMOVED***);
