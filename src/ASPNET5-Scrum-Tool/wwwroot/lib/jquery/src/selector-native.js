define([
	"./core"
], function( jQuery ) ***REMOVED***

/*
 * Optional (non-Sizzle) selector module for custom builds.
 *
 * Note that this DOES NOT SUPPORT many documented jQuery
 * features in exchange for its smaller size:
 *
 * Attribute not equal selector
 * Positional selectors (:first; :eq(n); :odd; etc.)
 * Type selectors (:input; :checkbox; :button; etc.)
 * State-based selectors (:animated; :visible; :hidden; etc.)
 * :has(selector)
 * :not(complex selector)
 * custom selectors via Sizzle extensions
 * Leading combinators (e.g., $collection.find("> *"))
 * Reliable functionality on XML fragments
 * Requiring all parts of a selector to match elements under context
 *   (e.g., $div.find("div > *") now matches children of $div)
 * Matching against non-elements
 * Reliable sorting of disconnected nodes
 * querySelectorAll bug fixes (e.g., unreliable :focus on WebKit)
 *
 * If any of these are unacceptable tradeoffs, either use Sizzle or
 * customize this stub for the project's specific needs.
 */

var docElem = window.document.documentElement,
	selector_hasDuplicate,
	matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector,
	selector_sortOrder = function( a, b ) ***REMOVED***
		// Flag for duplicate removal
		if ( a === b ) ***REMOVED***
			selector_hasDuplicate = true;
			return 0;
		***REMOVED***

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) ***REMOVED***
			// Disconnected nodes
			if ( compare & 1 ) ***REMOVED***

				// Choose the first element that is related to our document
				if ( a === document || jQuery.contains(document, a) ) ***REMOVED***
					return -1;
				***REMOVED***
				if ( b === document || jQuery.contains(document, b) ) ***REMOVED***
					return 1;
				***REMOVED***

				// Maintain original order
				return 0;
			***REMOVED***

			return compare & 4 ? -1 : 1;
		***REMOVED***

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	***REMOVED***;

jQuery.extend(***REMOVED***
	find: function( selector, context, results, seed ) ***REMOVED***
		var elem, nodeType,
			i = 0;

		results = results || [];
		context = context || document;

		// Same basic safeguard as Sizzle
		if ( !selector || typeof selector !== "string" ) ***REMOVED***
			return results;
		***REMOVED***

		// Early return if context is not an element or document
		if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) ***REMOVED***
			return [];
		***REMOVED***

		if ( seed ) ***REMOVED***
			while ( (elem = seed[i++]) ) ***REMOVED***
				if ( jQuery.find.matchesSelector(elem, selector) ) ***REMOVED***
					results.push( elem );
				***REMOVED***
			***REMOVED***
		***REMOVED*** else ***REMOVED***
			jQuery.merge( results, context.querySelectorAll(selector) );
		***REMOVED***

		return results;
	***REMOVED***,
	unique: function( results ) ***REMOVED***
		var elem,
			duplicates = [],
			i = 0,
			j = 0;

		selector_hasDuplicate = false;
		results.sort( selector_sortOrder );

		if ( selector_hasDuplicate ) ***REMOVED***
			while ( (elem = results[i++]) ) ***REMOVED***
				if ( elem === results[ i ] ) ***REMOVED***
					j = duplicates.push( i );
				***REMOVED***
			***REMOVED***
			while ( j-- ) ***REMOVED***
				results.splice( duplicates[ j ], 1 );
			***REMOVED***
		***REMOVED***

		return results;
	***REMOVED***,
	text: function( elem ) ***REMOVED***
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) ***REMOVED***
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) ***REMOVED***
				// Do not traverse comment nodes
				ret += jQuery.text( node );
			***REMOVED***
		***REMOVED*** else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) ***REMOVED***
			// Use textContent for elements
			return elem.textContent;
		***REMOVED*** else if ( nodeType === 3 || nodeType === 4 ) ***REMOVED***
			return elem.nodeValue;
		***REMOVED***
		// Do not include comment or processing instruction nodes

		return ret;
	***REMOVED***,
	contains: function( a, b ) ***REMOVED***
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b && b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains(bup) );
	***REMOVED***,
	isXMLDoc: function( elem ) ***REMOVED***
		return (elem.ownerDocument || elem).documentElement.nodeName !== "HTML";
	***REMOVED***,
	expr: ***REMOVED***
		attrHandle: ***REMOVED******REMOVED***,
		match: ***REMOVED***
			bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i,
			needsContext: /^[\x20\t\r\n\f]*[>+~]/
		***REMOVED***
	***REMOVED***
***REMOVED***);

jQuery.extend( jQuery.find, ***REMOVED***
	matches: function( expr, elements ) ***REMOVED***
		return jQuery.find( expr, null, null, elements );
	***REMOVED***,
	matchesSelector: function( elem, expr ) ***REMOVED***
		return matches.call( elem, expr );
	***REMOVED***,
	attr: function( elem, name ) ***REMOVED***
		return elem.getAttribute( name );
	***REMOVED***
***REMOVED***);

***REMOVED***);
