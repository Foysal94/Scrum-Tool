define([
	"../core",
	"../var/indexOf",
	"./var/rneedsContext",
	"../selector"
], function( jQuery, indexOf, rneedsContext ) ***REMOVED***

var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) ***REMOVED***
	if ( jQuery.isFunction( qualifier ) ) ***REMOVED***
		return jQuery.grep( elements, function( elem, i ) ***REMOVED***
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		***REMOVED***);

	***REMOVED***

	if ( qualifier.nodeType ) ***REMOVED***
		return jQuery.grep( elements, function( elem ) ***REMOVED***
			return ( elem === qualifier ) !== not;
		***REMOVED***);

	***REMOVED***

	if ( typeof qualifier === "string" ) ***REMOVED***
		if ( risSimple.test( qualifier ) ) ***REMOVED***
			return jQuery.filter( qualifier, elements, not );
		***REMOVED***

		qualifier = jQuery.filter( qualifier, elements );
	***REMOVED***

	return jQuery.grep( elements, function( elem ) ***REMOVED***
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	***REMOVED***);
***REMOVED***

jQuery.filter = function( expr, elems, not ) ***REMOVED***
	var elem = elems[ 0 ];

	if ( not ) ***REMOVED***
		expr = ":not(" + expr + ")";
	***REMOVED***

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) ***REMOVED***
			return elem.nodeType === 1;
		***REMOVED***));
***REMOVED***;

jQuery.fn.extend(***REMOVED***
	find: function( selector ) ***REMOVED***
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) ***REMOVED***
			return this.pushStack( jQuery( selector ).filter(function() ***REMOVED***
				for ( i = 0; i < len; i++ ) ***REMOVED***
					if ( jQuery.contains( self[ i ], this ) ) ***REMOVED***
						return true;
					***REMOVED***
				***REMOVED***
			***REMOVED***) );
		***REMOVED***

		for ( i = 0; i < len; i++ ) ***REMOVED***
			jQuery.find( selector, self[ i ], ret );
		***REMOVED***

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	***REMOVED***,
	filter: function( selector ) ***REMOVED***
		return this.pushStack( winnow(this, selector || [], false) );
	***REMOVED***,
	not: function( selector ) ***REMOVED***
		return this.pushStack( winnow(this, selector || [], true) );
	***REMOVED***,
	is: function( selector ) ***REMOVED***
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	***REMOVED***
***REMOVED***);

***REMOVED***);
