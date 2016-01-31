/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) ***REMOVED***

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) ***REMOVED***
		if ( a === b ) ***REMOVED***
			hasDuplicate = true;
		***REMOVED***
		return 0;
	***REMOVED***,

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = (***REMOVED******REMOVED***).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) ***REMOVED***
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) ***REMOVED***
			if ( list[i] === elem ) ***REMOVED***
				return i;
			***REMOVED***
		***REMOVED***
		return -1;
	***REMOVED***,

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = ***REMOVED***
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	***REMOVED***,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^***REMOVED***]+\***REMOVED***\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]***REMOVED***1,6***REMOVED***" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) ***REMOVED***
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	***REMOVED***,

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() ***REMOVED***
		setDocument();
	***REMOVED***;

// Optimize for push.apply( _, NodeList )
try ***REMOVED***
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
***REMOVED*** catch ( e ) ***REMOVED***
	push = ***REMOVED*** apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) ***REMOVED***
			push_native.apply( target, slice.call(els) );
		***REMOVED*** :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) ***REMOVED***
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) ***REMOVED******REMOVED***
			target.length = j - 1;
		***REMOVED***
	***REMOVED***;
***REMOVED***

function Sizzle( selector, context, results, seed ) ***REMOVED***
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) ***REMOVED***
		setDocument( context );
	***REMOVED***

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) ***REMOVED***

		return results;
	***REMOVED***

	if ( !seed && documentIsHTML ) ***REMOVED***

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) ***REMOVED***
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) ***REMOVED***
				if ( nodeType === 9 ) ***REMOVED***
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) ***REMOVED***
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) ***REMOVED***
							results.push( elem );
							return results;
						***REMOVED***
					***REMOVED*** else ***REMOVED***
						return results;
					***REMOVED***
				***REMOVED*** else ***REMOVED***
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) ***REMOVED***
						results.push( elem );
						return results;
					***REMOVED***
				***REMOVED***

			// Speed-up: Sizzle("TAG")
			***REMOVED*** else if ( match[2] ) ***REMOVED***
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			***REMOVED*** else if ( (m = match[3]) && support.getElementsByClassName ) ***REMOVED***
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			***REMOVED***
		***REMOVED***

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) ***REMOVED***
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) ***REMOVED***
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) ***REMOVED***
					nid = old.replace( rescape, "\\$&" );
				***REMOVED*** else ***REMOVED***
					context.setAttribute( "id", nid );
				***REMOVED***
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) ***REMOVED***
					groups[i] = nid + toSelector( groups[i] );
				***REMOVED***
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			***REMOVED***

			if ( newSelector ) ***REMOVED***
				try ***REMOVED***
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				***REMOVED*** catch(qsaError) ***REMOVED***
				***REMOVED*** finally ***REMOVED***
					if ( !old ) ***REMOVED***
						context.removeAttribute("id");
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
***REMOVED***

/**
 * Create key-value caches of limited size
 * @returns ***REMOVED***Function(string, Object)***REMOVED*** Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() ***REMOVED***
	var keys = [];

	function cache( key, value ) ***REMOVED***
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) ***REMOVED***
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		***REMOVED***
		return (cache[ key + " " ] = value);
	***REMOVED***
	return cache;
***REMOVED***

/**
 * Mark a function for special use by Sizzle
 * @param ***REMOVED***Function***REMOVED*** fn The function to mark
 */
function markFunction( fn ) ***REMOVED***
	fn[ expando ] = true;
	return fn;
***REMOVED***

/**
 * Support testing using an element
 * @param ***REMOVED***Function***REMOVED*** fn Passed the created div and expects a boolean result
 */
function assert( fn ) ***REMOVED***
	var div = document.createElement("div");

	try ***REMOVED***
		return !!fn( div );
	***REMOVED*** catch (e) ***REMOVED***
		return false;
	***REMOVED*** finally ***REMOVED***
		// Remove from its parent by default
		if ( div.parentNode ) ***REMOVED***
			div.parentNode.removeChild( div );
		***REMOVED***
		// release memory in IE
		div = null;
	***REMOVED***
***REMOVED***

/**
 * Adds the same handler for all of the specified attrs
 * @param ***REMOVED***String***REMOVED*** attrs Pipe-separated list of attributes
 * @param ***REMOVED***Function***REMOVED*** handler The method that will be applied
 */
function addHandle( attrs, handler ) ***REMOVED***
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) ***REMOVED***
		Expr.attrHandle[ arr[i] ] = handler;
	***REMOVED***
***REMOVED***

/**
 * Checks document order of two siblings
 * @param ***REMOVED***Element***REMOVED*** a
 * @param ***REMOVED***Element***REMOVED*** b
 * @returns ***REMOVED***Number***REMOVED*** Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) ***REMOVED***
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) ***REMOVED***
		return diff;
	***REMOVED***

	// Check if b follows a
	if ( cur ) ***REMOVED***
		while ( (cur = cur.nextSibling) ) ***REMOVED***
			if ( cur === b ) ***REMOVED***
				return -1;
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return a ? 1 : -1;
***REMOVED***

/**
 * Returns a function to use in pseudos for input types
 * @param ***REMOVED***String***REMOVED*** type
 */
function createInputPseudo( type ) ***REMOVED***
	return function( elem ) ***REMOVED***
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	***REMOVED***;
***REMOVED***

/**
 * Returns a function to use in pseudos for buttons
 * @param ***REMOVED***String***REMOVED*** type
 */
function createButtonPseudo( type ) ***REMOVED***
	return function( elem ) ***REMOVED***
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	***REMOVED***;
***REMOVED***

/**
 * Returns a function to use in pseudos for positionals
 * @param ***REMOVED***Function***REMOVED*** fn
 */
function createPositionalPseudo( fn ) ***REMOVED***
	return markFunction(function( argument ) ***REMOVED***
		argument = +argument;
		return markFunction(function( seed, matches ) ***REMOVED***
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) ***REMOVED***
				if ( seed[ (j = matchIndexes[i]) ] ) ***REMOVED***
					seed[j] = !(matches[j] = seed[j]);
				***REMOVED***
			***REMOVED***
		***REMOVED***);
	***REMOVED***);
***REMOVED***

/**
 * Checks a node for validity as a Sizzle context
 * @param ***REMOVED***Element|Object=***REMOVED*** context
 * @returns ***REMOVED***Element|Object|Boolean***REMOVED*** The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) ***REMOVED***
	return context && typeof context.getElementsByTagName !== "undefined" && context;
***REMOVED***

// Expose support vars for convenience
support = Sizzle.support = ***REMOVED******REMOVED***;

/**
 * Detects XML nodes
 * @param ***REMOVED***Element|Object***REMOVED*** elem An element or a document
 * @returns ***REMOVED***Boolean***REMOVED*** True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) ***REMOVED***
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
***REMOVED***;

/**
 * Sets document-related variables once based on the current document
 * @param ***REMOVED***Element|Object***REMOVED*** [doc] An element or document object to use to set the document
 * @returns ***REMOVED***Object***REMOVED*** Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) ***REMOVED***
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) ***REMOVED***
		return document;
	***REMOVED***

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) ***REMOVED***
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) ***REMOVED***
			parent.addEventListener( "unload", unloadHandler, false );
		***REMOVED*** else if ( parent.attachEvent ) ***REMOVED***
			parent.attachEvent( "onunload", unloadHandler );
		***REMOVED***
	***REMOVED***

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) ***REMOVED***
		div.className = "i";
		return !div.getAttribute("className");
	***REMOVED***);

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) ***REMOVED***
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	***REMOVED***);

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) ***REMOVED***
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	***REMOVED***);

	// ID find and filter
	if ( support.getById ) ***REMOVED***
		Expr.find["ID"] = function( id, context ) ***REMOVED***
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) ***REMOVED***
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			***REMOVED***
		***REMOVED***;
		Expr.filter["ID"] = function( id ) ***REMOVED***
			var attrId = id.replace( runescape, funescape );
			return function( elem ) ***REMOVED***
				return elem.getAttribute("id") === attrId;
			***REMOVED***;
		***REMOVED***;
	***REMOVED*** else ***REMOVED***
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) ***REMOVED***
			var attrId = id.replace( runescape, funescape );
			return function( elem ) ***REMOVED***
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			***REMOVED***;
		***REMOVED***;
	***REMOVED***

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) ***REMOVED***
			if ( typeof context.getElementsByTagName !== "undefined" ) ***REMOVED***
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			***REMOVED*** else if ( support.qsa ) ***REMOVED***
				return context.querySelectorAll( tag );
			***REMOVED***
		***REMOVED*** :

		function( tag, context ) ***REMOVED***
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) ***REMOVED***
				while ( (elem = results[i++]) ) ***REMOVED***
					if ( elem.nodeType === 1 ) ***REMOVED***
						tmp.push( elem );
					***REMOVED***
				***REMOVED***

				return tmp;
			***REMOVED***
			return results;
		***REMOVED***;

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) ***REMOVED***
		if ( documentIsHTML ) ***REMOVED***
			return context.getElementsByClassName( className );
		***REMOVED***
	***REMOVED***;

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) ***REMOVED***
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) ***REMOVED***
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) ***REMOVED***
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			***REMOVED***

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) ***REMOVED***
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			***REMOVED***

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) ***REMOVED***
				rbuggyQSA.push("~=");
			***REMOVED***

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) ***REMOVED***
				rbuggyQSA.push(":checked");
			***REMOVED***

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) ***REMOVED***
				rbuggyQSA.push(".#.+[+~]");
			***REMOVED***
		***REMOVED***);

		assert(function( div ) ***REMOVED***
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) ***REMOVED***
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			***REMOVED***

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) ***REMOVED***
				rbuggyQSA.push( ":enabled", ":disabled" );
			***REMOVED***

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		***REMOVED***);
	***REMOVED***

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) ***REMOVED***

		assert(function( div ) ***REMOVED***
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		***REMOVED***);
	***REMOVED***

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) ***REMOVED***
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		***REMOVED*** :
		function( a, b ) ***REMOVED***
			if ( b ) ***REMOVED***
				while ( (b = b.parentNode) ) ***REMOVED***
					if ( b === a ) ***REMOVED***
						return true;
					***REMOVED***
				***REMOVED***
			***REMOVED***
			return false;
		***REMOVED***;

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) ***REMOVED***

		// Flag for duplicate removal
		if ( a === b ) ***REMOVED***
			hasDuplicate = true;
			return 0;
		***REMOVED***

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) ***REMOVED***
			return compare;
		***REMOVED***

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) ***REMOVED***

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) ***REMOVED***
				return -1;
			***REMOVED***
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) ***REMOVED***
				return 1;
			***REMOVED***

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		***REMOVED***

		return compare & 4 ? -1 : 1;
	***REMOVED*** :
	function( a, b ) ***REMOVED***
		// Exit early if the nodes are identical
		if ( a === b ) ***REMOVED***
			hasDuplicate = true;
			return 0;
		***REMOVED***

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) ***REMOVED***
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		***REMOVED*** else if ( aup === bup ) ***REMOVED***
			return siblingCheck( a, b );
		***REMOVED***

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) ***REMOVED***
			ap.unshift( cur );
		***REMOVED***
		cur = b;
		while ( (cur = cur.parentNode) ) ***REMOVED***
			bp.unshift( cur );
		***REMOVED***

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) ***REMOVED***
			i++;
		***REMOVED***

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	***REMOVED***;

	return doc;
***REMOVED***;

Sizzle.matches = function( expr, elements ) ***REMOVED***
	return Sizzle( expr, null, null, elements );
***REMOVED***;

Sizzle.matchesSelector = function( elem, expr ) ***REMOVED***
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) ***REMOVED***
		setDocument( elem );
	***REMOVED***

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) ***REMOVED***

		try ***REMOVED***
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) ***REMOVED***
				return ret;
			***REMOVED***
		***REMOVED*** catch (e) ***REMOVED******REMOVED***
	***REMOVED***

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
***REMOVED***;

Sizzle.contains = function( context, elem ) ***REMOVED***
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) ***REMOVED***
		setDocument( context );
	***REMOVED***
	return contains( context, elem );
***REMOVED***;

Sizzle.attr = function( elem, name ) ***REMOVED***
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) ***REMOVED***
		setDocument( elem );
	***REMOVED***

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
***REMOVED***;

Sizzle.error = function( msg ) ***REMOVED***
	throw new Error( "Syntax error, unrecognized expression: " + msg );
***REMOVED***;

/**
 * Document sorting and removing duplicates
 * @param ***REMOVED***ArrayLike***REMOVED*** results
 */
Sizzle.uniqueSort = function( results ) ***REMOVED***
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) ***REMOVED***
		while ( (elem = results[i++]) ) ***REMOVED***
			if ( elem === results[ i ] ) ***REMOVED***
				j = duplicates.push( i );
			***REMOVED***
		***REMOVED***
		while ( j-- ) ***REMOVED***
			results.splice( duplicates[ j ], 1 );
		***REMOVED***
	***REMOVED***

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
***REMOVED***;

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param ***REMOVED***Array|Element***REMOVED*** elem
 */
getText = Sizzle.getText = function( elem ) ***REMOVED***
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) ***REMOVED***
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) ***REMOVED***
			// Do not traverse comment nodes
			ret += getText( node );
		***REMOVED***
	***REMOVED*** else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) ***REMOVED***
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) ***REMOVED***
			return elem.textContent;
		***REMOVED*** else ***REMOVED***
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) ***REMOVED***
				ret += getText( elem );
			***REMOVED***
		***REMOVED***
	***REMOVED*** else if ( nodeType === 3 || nodeType === 4 ) ***REMOVED***
		return elem.nodeValue;
	***REMOVED***
	// Do not include comment or processing instruction nodes

	return ret;
***REMOVED***;

Expr = Sizzle.selectors = ***REMOVED***

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: ***REMOVED******REMOVED***,

	find: ***REMOVED******REMOVED***,

	relative: ***REMOVED***
		">": ***REMOVED*** dir: "parentNode", first: true ***REMOVED***,
		" ": ***REMOVED*** dir: "parentNode" ***REMOVED***,
		"+": ***REMOVED*** dir: "previousSibling", first: true ***REMOVED***,
		"~": ***REMOVED*** dir: "previousSibling" ***REMOVED***
	***REMOVED***,

	preFilter: ***REMOVED***
		"ATTR": function( match ) ***REMOVED***
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) ***REMOVED***
				match[3] = " " + match[3] + " ";
			***REMOVED***

			return match.slice( 0, 4 );
		***REMOVED***,

		"CHILD": function( match ) ***REMOVED***
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) ***REMOVED***
				// nth-* requires argument
				if ( !match[3] ) ***REMOVED***
					Sizzle.error( match[0] );
				***REMOVED***

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			***REMOVED*** else if ( match[3] ) ***REMOVED***
				Sizzle.error( match[0] );
			***REMOVED***

			return match;
		***REMOVED***,

		"PSEUDO": function( match ) ***REMOVED***
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) ***REMOVED***
				return null;
			***REMOVED***

			// Accept quoted arguments as-is
			if ( match[3] ) ***REMOVED***
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			***REMOVED*** else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) ***REMOVED***

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			***REMOVED***

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		***REMOVED***
	***REMOVED***,

	filter: ***REMOVED***

		"TAG": function( nodeNameSelector ) ***REMOVED***
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() ***REMOVED*** return true; ***REMOVED*** :
				function( elem ) ***REMOVED***
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				***REMOVED***;
		***REMOVED***,

		"CLASS": function( className ) ***REMOVED***
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) ***REMOVED***
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				***REMOVED***);
		***REMOVED***,

		"ATTR": function( name, operator, check ) ***REMOVED***
			return function( elem ) ***REMOVED***
				var result = Sizzle.attr( elem, name );

				if ( result == null ) ***REMOVED***
					return operator === "!=";
				***REMOVED***
				if ( !operator ) ***REMOVED***
					return true;
				***REMOVED***

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			***REMOVED***;
		***REMOVED***,

		"CHILD": function( type, what, argument, first, last ) ***REMOVED***
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) ***REMOVED***
					return !!elem.parentNode;
				***REMOVED*** :

				function( elem, context, xml ) ***REMOVED***
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) ***REMOVED***

						// :(first|last|only)-(child|of-type)
						if ( simple ) ***REMOVED***
							while ( dir ) ***REMOVED***
								node = elem;
								while ( (node = node[ dir ]) ) ***REMOVED***
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) ***REMOVED***
										return false;
									***REMOVED***
								***REMOVED***
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							***REMOVED***
							return true;
						***REMOVED***

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) ***REMOVED***
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = ***REMOVED******REMOVED***);
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) ***REMOVED***

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) ***REMOVED***
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								***REMOVED***
							***REMOVED***

						// Use previously-cached element index if available
						***REMOVED*** else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = ***REMOVED******REMOVED***))[ type ]) && cache[0] === dirruns ) ***REMOVED***
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						***REMOVED*** else ***REMOVED***
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) ***REMOVED***

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) ***REMOVED***
									// Cache the index of each encountered element
									if ( useCache ) ***REMOVED***
										(node[ expando ] || (node[ expando ] = ***REMOVED******REMOVED***))[ type ] = [ dirruns, diff ];
									***REMOVED***

									if ( node === elem ) ***REMOVED***
										break;
									***REMOVED***
								***REMOVED***
							***REMOVED***
						***REMOVED***

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					***REMOVED***
				***REMOVED***;
		***REMOVED***,

		"PSEUDO": function( pseudo, argument ) ***REMOVED***
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) ***REMOVED***
				return fn( argument );
			***REMOVED***

			// But maintain support for old signatures
			if ( fn.length > 1 ) ***REMOVED***
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) ***REMOVED***
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) ***REMOVED***
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						***REMOVED***
					***REMOVED***) :
					function( elem ) ***REMOVED***
						return fn( elem, 0, args );
					***REMOVED***;
			***REMOVED***

			return fn;
		***REMOVED***
	***REMOVED***,

	pseudos: ***REMOVED***
		// Potentially complex pseudos
		"not": markFunction(function( selector ) ***REMOVED***
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) ***REMOVED***
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) ***REMOVED***
						if ( (elem = unmatched[i]) ) ***REMOVED***
							seed[i] = !(matches[i] = elem);
						***REMOVED***
					***REMOVED***
				***REMOVED***) :
				function( elem, context, xml ) ***REMOVED***
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				***REMOVED***;
		***REMOVED***),

		"has": markFunction(function( selector ) ***REMOVED***
			return function( elem ) ***REMOVED***
				return Sizzle( selector, elem ).length > 0;
			***REMOVED***;
		***REMOVED***),

		"contains": markFunction(function( text ) ***REMOVED***
			text = text.replace( runescape, funescape );
			return function( elem ) ***REMOVED***
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			***REMOVED***;
		***REMOVED***),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) ***REMOVED***
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) ***REMOVED***
				Sizzle.error( "unsupported lang: " + lang );
			***REMOVED***
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) ***REMOVED***
				var elemLang;
				do ***REMOVED***
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) ***REMOVED***

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					***REMOVED***
				***REMOVED*** while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			***REMOVED***;
		***REMOVED***),

		// Miscellaneous
		"target": function( elem ) ***REMOVED***
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		***REMOVED***,

		"root": function( elem ) ***REMOVED***
			return elem === docElem;
		***REMOVED***,

		"focus": function( elem ) ***REMOVED***
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		***REMOVED***,

		// Boolean properties
		"enabled": function( elem ) ***REMOVED***
			return elem.disabled === false;
		***REMOVED***,

		"disabled": function( elem ) ***REMOVED***
			return elem.disabled === true;
		***REMOVED***,

		"checked": function( elem ) ***REMOVED***
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		***REMOVED***,

		"selected": function( elem ) ***REMOVED***
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) ***REMOVED***
				elem.parentNode.selectedIndex;
			***REMOVED***

			return elem.selected === true;
		***REMOVED***,

		// Contents
		"empty": function( elem ) ***REMOVED***
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) ***REMOVED***
				if ( elem.nodeType < 6 ) ***REMOVED***
					return false;
				***REMOVED***
			***REMOVED***
			return true;
		***REMOVED***,

		"parent": function( elem ) ***REMOVED***
			return !Expr.pseudos["empty"]( elem );
		***REMOVED***,

		// Element/input types
		"header": function( elem ) ***REMOVED***
			return rheader.test( elem.nodeName );
		***REMOVED***,

		"input": function( elem ) ***REMOVED***
			return rinputs.test( elem.nodeName );
		***REMOVED***,

		"button": function( elem ) ***REMOVED***
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		***REMOVED***,

		"text": function( elem ) ***REMOVED***
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		***REMOVED***,

		// Position-in-collection
		"first": createPositionalPseudo(function() ***REMOVED***
			return [ 0 ];
		***REMOVED***),

		"last": createPositionalPseudo(function( matchIndexes, length ) ***REMOVED***
			return [ length - 1 ];
		***REMOVED***),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) ***REMOVED***
			return [ argument < 0 ? argument + length : argument ];
		***REMOVED***),

		"even": createPositionalPseudo(function( matchIndexes, length ) ***REMOVED***
			var i = 0;
			for ( ; i < length; i += 2 ) ***REMOVED***
				matchIndexes.push( i );
			***REMOVED***
			return matchIndexes;
		***REMOVED***),

		"odd": createPositionalPseudo(function( matchIndexes, length ) ***REMOVED***
			var i = 1;
			for ( ; i < length; i += 2 ) ***REMOVED***
				matchIndexes.push( i );
			***REMOVED***
			return matchIndexes;
		***REMOVED***),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) ***REMOVED***
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) ***REMOVED***
				matchIndexes.push( i );
			***REMOVED***
			return matchIndexes;
		***REMOVED***),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) ***REMOVED***
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) ***REMOVED***
				matchIndexes.push( i );
			***REMOVED***
			return matchIndexes;
		***REMOVED***)
	***REMOVED***
***REMOVED***;

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in ***REMOVED*** radio: true, checkbox: true, file: true, password: true, image: true ***REMOVED*** ) ***REMOVED***
	Expr.pseudos[ i ] = createInputPseudo( i );
***REMOVED***
for ( i in ***REMOVED*** submit: true, reset: true ***REMOVED*** ) ***REMOVED***
	Expr.pseudos[ i ] = createButtonPseudo( i );
***REMOVED***

// Easy API for creating new setFilters
function setFilters() ***REMOVED******REMOVED***
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) ***REMOVED***
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) ***REMOVED***
		return parseOnly ? 0 : cached.slice( 0 );
	***REMOVED***

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) ***REMOVED***

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) ***REMOVED***
			if ( match ) ***REMOVED***
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			***REMOVED***
			groups.push( (tokens = []) );
		***REMOVED***

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) ***REMOVED***
			matched = match.shift();
			tokens.push(***REMOVED***
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			***REMOVED***);
			soFar = soFar.slice( matched.length );
		***REMOVED***

		// Filters
		for ( type in Expr.filter ) ***REMOVED***
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) ***REMOVED***
				matched = match.shift();
				tokens.push(***REMOVED***
					value: matched,
					type: type,
					matches: match
				***REMOVED***);
				soFar = soFar.slice( matched.length );
			***REMOVED***
		***REMOVED***

		if ( !matched ) ***REMOVED***
			break;
		***REMOVED***
	***REMOVED***

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
***REMOVED***;

function toSelector( tokens ) ***REMOVED***
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) ***REMOVED***
		selector += tokens[i].value;
	***REMOVED***
	return selector;
***REMOVED***

function addCombinator( matcher, combinator, base ) ***REMOVED***
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) ***REMOVED***
			while ( (elem = elem[ dir ]) ) ***REMOVED***
				if ( elem.nodeType === 1 || checkNonElements ) ***REMOVED***
					return matcher( elem, context, xml );
				***REMOVED***
			***REMOVED***
		***REMOVED*** :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) ***REMOVED***
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) ***REMOVED***
				while ( (elem = elem[ dir ]) ) ***REMOVED***
					if ( elem.nodeType === 1 || checkNonElements ) ***REMOVED***
						if ( matcher( elem, context, xml ) ) ***REMOVED***
							return true;
						***REMOVED***
					***REMOVED***
				***REMOVED***
			***REMOVED*** else ***REMOVED***
				while ( (elem = elem[ dir ]) ) ***REMOVED***
					if ( elem.nodeType === 1 || checkNonElements ) ***REMOVED***
						outerCache = elem[ expando ] || (elem[ expando ] = ***REMOVED******REMOVED***);
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) ***REMOVED***

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						***REMOVED*** else ***REMOVED***
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) ***REMOVED***
								return true;
							***REMOVED***
						***REMOVED***
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***;
***REMOVED***

function elementMatcher( matchers ) ***REMOVED***
	return matchers.length > 1 ?
		function( elem, context, xml ) ***REMOVED***
			var i = matchers.length;
			while ( i-- ) ***REMOVED***
				if ( !matchers[i]( elem, context, xml ) ) ***REMOVED***
					return false;
				***REMOVED***
			***REMOVED***
			return true;
		***REMOVED*** :
		matchers[0];
***REMOVED***

function multipleContexts( selector, contexts, results ) ***REMOVED***
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) ***REMOVED***
		Sizzle( selector, contexts[i], results );
	***REMOVED***
	return results;
***REMOVED***

function condense( unmatched, map, filter, context, xml ) ***REMOVED***
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) ***REMOVED***
		if ( (elem = unmatched[i]) ) ***REMOVED***
			if ( !filter || filter( elem, context, xml ) ) ***REMOVED***
				newUnmatched.push( elem );
				if ( mapped ) ***REMOVED***
					map.push( i );
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return newUnmatched;
***REMOVED***

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) ***REMOVED***
	if ( postFilter && !postFilter[ expando ] ) ***REMOVED***
		postFilter = setMatcher( postFilter );
	***REMOVED***
	if ( postFinder && !postFinder[ expando ] ) ***REMOVED***
		postFinder = setMatcher( postFinder, postSelector );
	***REMOVED***
	return markFunction(function( seed, results, context, xml ) ***REMOVED***
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) ***REMOVED***
			matcher( matcherIn, matcherOut, context, xml );
		***REMOVED***

		// Apply postFilter
		if ( postFilter ) ***REMOVED***
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) ***REMOVED***
				if ( (elem = temp[i]) ) ***REMOVED***
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				***REMOVED***
			***REMOVED***
		***REMOVED***

		if ( seed ) ***REMOVED***
			if ( postFinder || preFilter ) ***REMOVED***
				if ( postFinder ) ***REMOVED***
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) ***REMOVED***
						if ( (elem = matcherOut[i]) ) ***REMOVED***
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						***REMOVED***
					***REMOVED***
					postFinder( null, (matcherOut = []), temp, xml );
				***REMOVED***

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) ***REMOVED***
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) ***REMOVED***

						seed[temp] = !(results[temp] = elem);
					***REMOVED***
				***REMOVED***
			***REMOVED***

		// Add elements to results, through postFinder if defined
		***REMOVED*** else ***REMOVED***
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) ***REMOVED***
				postFinder( null, results, matcherOut, xml );
			***REMOVED*** else ***REMOVED***
				push.apply( results, matcherOut );
			***REMOVED***
		***REMOVED***
	***REMOVED***);
***REMOVED***

function matcherFromTokens( tokens ) ***REMOVED***
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) ***REMOVED***
			return elem === checkContext;
		***REMOVED***, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) ***REMOVED***
			return indexOf( checkContext, elem ) > -1;
		***REMOVED***, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) ***REMOVED***
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		***REMOVED*** ];

	for ( ; i < len; i++ ) ***REMOVED***
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) ***REMOVED***
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		***REMOVED*** else ***REMOVED***
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) ***REMOVED***
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) ***REMOVED***
					if ( Expr.relative[ tokens[j].type ] ) ***REMOVED***
						break;
					***REMOVED***
				***REMOVED***
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat(***REMOVED*** value: tokens[ i - 2 ].type === " " ? "*" : "" ***REMOVED***)
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			***REMOVED***
			matchers.push( matcher );
		***REMOVED***
	***REMOVED***

	return elementMatcher( matchers );
***REMOVED***

function matcherFromGroupMatchers( elementMatchers, setMatchers ) ***REMOVED***
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) ***REMOVED***
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) ***REMOVED***
				outermostContext = context !== document && context;
			***REMOVED***

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) ***REMOVED***
				if ( byElement && elem ) ***REMOVED***
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) ***REMOVED***
						if ( matcher( elem, context, xml ) ) ***REMOVED***
							results.push( elem );
							break;
						***REMOVED***
					***REMOVED***
					if ( outermost ) ***REMOVED***
						dirruns = dirrunsUnique;
					***REMOVED***
				***REMOVED***

				// Track unmatched elements for set filters
				if ( bySet ) ***REMOVED***
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) ***REMOVED***
						matchedCount--;
					***REMOVED***

					// Lengthen the array for every element, matched or not
					if ( seed ) ***REMOVED***
						unmatched.push( elem );
					***REMOVED***
				***REMOVED***
			***REMOVED***

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) ***REMOVED***
				j = 0;
				while ( (matcher = setMatchers[j++]) ) ***REMOVED***
					matcher( unmatched, setMatched, context, xml );
				***REMOVED***

				if ( seed ) ***REMOVED***
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) ***REMOVED***
						while ( i-- ) ***REMOVED***
							if ( !(unmatched[i] || setMatched[i]) ) ***REMOVED***
								setMatched[i] = pop.call( results );
							***REMOVED***
						***REMOVED***
					***REMOVED***

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				***REMOVED***

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) ***REMOVED***

					Sizzle.uniqueSort( results );
				***REMOVED***
			***REMOVED***

			// Override manipulation of globals by nested matchers
			if ( outermost ) ***REMOVED***
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			***REMOVED***

			return unmatched;
		***REMOVED***;

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
***REMOVED***

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) ***REMOVED***
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) ***REMOVED***
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) ***REMOVED***
			match = tokenize( selector );
		***REMOVED***
		i = match.length;
		while ( i-- ) ***REMOVED***
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) ***REMOVED***
				setMatchers.push( cached );
			***REMOVED*** else ***REMOVED***
				elementMatchers.push( cached );
			***REMOVED***
		***REMOVED***

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	***REMOVED***
	return cached;
***REMOVED***;

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param ***REMOVED***String|Function***REMOVED*** selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param ***REMOVED***Element***REMOVED*** context
 * @param ***REMOVED***Array***REMOVED*** [results]
 * @param ***REMOVED***Array***REMOVED*** [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) ***REMOVED***
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) ***REMOVED***

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) ***REMOVED***

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) ***REMOVED***
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			***REMOVED*** else if ( compiled ) ***REMOVED***
				context = context.parentNode;
			***REMOVED***

			selector = selector.slice( tokens.shift().value.length );
		***REMOVED***

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) ***REMOVED***
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) ***REMOVED***
				break;
			***REMOVED***
			if ( (find = Expr.find[ type ]) ) ***REMOVED***
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) ***REMOVED***

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) ***REMOVED***
						push.apply( results, seed );
						return results;
					***REMOVED***

					break;
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
***REMOVED***;

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) ***REMOVED***
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
***REMOVED***);

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) ***REMOVED***
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
***REMOVED***) ) ***REMOVED***
	addHandle( "type|href|height|width", function( elem, name, isXML ) ***REMOVED***
		if ( !isXML ) ***REMOVED***
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		***REMOVED***
	***REMOVED***);
***REMOVED***

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) ***REMOVED***
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
***REMOVED***) ) ***REMOVED***
	addHandle( "value", function( elem, name, isXML ) ***REMOVED***
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) ***REMOVED***
			return elem.defaultValue;
		***REMOVED***
	***REMOVED***);
***REMOVED***

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) ***REMOVED***
	return div.getAttribute("disabled") == null;
***REMOVED***) ) ***REMOVED***
	addHandle( booleans, function( elem, name, isXML ) ***REMOVED***
		var val;
		if ( !isXML ) ***REMOVED***
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		***REMOVED***
	***REMOVED***);
***REMOVED***

// EXPOSE
if ( typeof define === "function" && define.amd ) ***REMOVED***
	define(function() ***REMOVED*** return Sizzle; ***REMOVED***);
// Sizzle requires that there be a global window in Common-JS like environments
***REMOVED*** else if ( typeof module !== "undefined" && module.exports ) ***REMOVED***
	module.exports = Sizzle;
***REMOVED*** else ***REMOVED***
	window.Sizzle = Sizzle;
***REMOVED***
// EXPOSE

***REMOVED***)( window );
