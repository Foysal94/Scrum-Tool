define([
	"./core",
	"./var/concat",
	"./var/push",
	"./core/access",
	"./manipulation/var/rcheckableType",
	"./manipulation/support",
	"./data/var/data_priv",
	"./data/var/data_user",

	"./core/init",
	"./data/accepts",
	"./traversing",
	"./selector",
	"./event"
], function( jQuery, concat, push, access, rcheckableType, support, data_priv, data_user ) ***REMOVED***

var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = ***REMOVED***

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	***REMOVED***;

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) ***REMOVED***
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
***REMOVED***

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) ***REMOVED***
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
***REMOVED***
function restoreScript( elem ) ***REMOVED***
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) ***REMOVED***
		elem.type = match[ 1 ];
	***REMOVED*** else ***REMOVED***
		elem.removeAttribute("type");
	***REMOVED***

	return elem;
***REMOVED***

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) ***REMOVED***
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) ***REMOVED***
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	***REMOVED***
***REMOVED***

function cloneCopyEvent( src, dest ) ***REMOVED***
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) ***REMOVED***
		return;
	***REMOVED***

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) ***REMOVED***
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) ***REMOVED***
			delete pdataCur.handle;
			pdataCur.events = ***REMOVED******REMOVED***;

			for ( type in events ) ***REMOVED***
				for ( i = 0, l = events[ type ].length; i < l; i++ ) ***REMOVED***
					jQuery.event.add( dest, type, events[ type ][ i ] );
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	// 2. Copy user data
	if ( data_user.hasData( src ) ) ***REMOVED***
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( ***REMOVED******REMOVED***, udataOld );

		data_user.set( dest, udataCur );
	***REMOVED***
***REMOVED***

function getAll( context, tag ) ***REMOVED***
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
***REMOVED***

// Fix IE bugs, see support tests
function fixInput( src, dest ) ***REMOVED***
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) ***REMOVED***
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	***REMOVED*** else if ( nodeName === "input" || nodeName === "textarea" ) ***REMOVED***
		dest.defaultValue = src.defaultValue;
	***REMOVED***
***REMOVED***

jQuery.extend(***REMOVED***
	clone: function( elem, dataAndEvents, deepDataAndEvents ) ***REMOVED***
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) ***REMOVED***

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) ***REMOVED***
				fixInput( srcElements[ i ], destElements[ i ] );
			***REMOVED***
		***REMOVED***

		// Copy the events from the original to the clone
		if ( dataAndEvents ) ***REMOVED***
			if ( deepDataAndEvents ) ***REMOVED***
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) ***REMOVED***
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				***REMOVED***
			***REMOVED*** else ***REMOVED***
				cloneCopyEvent( elem, clone );
			***REMOVED***
		***REMOVED***

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) ***REMOVED***
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		***REMOVED***

		// Return the cloned set
		return clone;
	***REMOVED***,

	buildFragment: function( elems, context, scripts, selection ) ***REMOVED***
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) ***REMOVED***
			elem = elems[ i ];

			if ( elem || elem === 0 ) ***REMOVED***

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) ***REMOVED***
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				***REMOVED*** else if ( !rhtml.test( elem ) ) ***REMOVED***
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				***REMOVED*** else ***REMOVED***
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) ***REMOVED***
						tmp = tmp.lastChild;
					***REMOVED***

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				***REMOVED***
			***REMOVED***
		***REMOVED***

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) ***REMOVED***

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) ***REMOVED***
				continue;
			***REMOVED***

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) ***REMOVED***
				setGlobalEval( tmp );
			***REMOVED***

			// Capture executables
			if ( scripts ) ***REMOVED***
				j = 0;
				while ( (elem = tmp[ j++ ]) ) ***REMOVED***
					if ( rscriptType.test( elem.type || "" ) ) ***REMOVED***
						scripts.push( elem );
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***

		return fragment;
	***REMOVED***,

	cleanData: function( elems ) ***REMOVED***
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) ***REMOVED***
			if ( jQuery.acceptData( elem ) ) ***REMOVED***
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) ***REMOVED***
					if ( data.events ) ***REMOVED***
						for ( type in data.events ) ***REMOVED***
							if ( special[ type ] ) ***REMOVED***
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							***REMOVED*** else ***REMOVED***
								jQuery.removeEvent( elem, type, data.handle );
							***REMOVED***
						***REMOVED***
					***REMOVED***
					if ( data_priv.cache[ key ] ) ***REMOVED***
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					***REMOVED***
				***REMOVED***
			***REMOVED***
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		***REMOVED***
	***REMOVED***
***REMOVED***);

jQuery.fn.extend(***REMOVED***
	text: function( value ) ***REMOVED***
		return access( this, function( value ) ***REMOVED***
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() ***REMOVED***
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) ***REMOVED***
						this.textContent = value;
					***REMOVED***
				***REMOVED***);
		***REMOVED***, null, value, arguments.length );
	***REMOVED***,

	append: function() ***REMOVED***
		return this.domManip( arguments, function( elem ) ***REMOVED***
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) ***REMOVED***
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			***REMOVED***
		***REMOVED***);
	***REMOVED***,

	prepend: function() ***REMOVED***
		return this.domManip( arguments, function( elem ) ***REMOVED***
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) ***REMOVED***
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			***REMOVED***
		***REMOVED***);
	***REMOVED***,

	before: function() ***REMOVED***
		return this.domManip( arguments, function( elem ) ***REMOVED***
			if ( this.parentNode ) ***REMOVED***
				this.parentNode.insertBefore( elem, this );
			***REMOVED***
		***REMOVED***);
	***REMOVED***,

	after: function() ***REMOVED***
		return this.domManip( arguments, function( elem ) ***REMOVED***
			if ( this.parentNode ) ***REMOVED***
				this.parentNode.insertBefore( elem, this.nextSibling );
			***REMOVED***
		***REMOVED***);
	***REMOVED***,

	remove: function( selector, keepData /* Internal Use Only */ ) ***REMOVED***
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) ***REMOVED***
			if ( !keepData && elem.nodeType === 1 ) ***REMOVED***
				jQuery.cleanData( getAll( elem ) );
			***REMOVED***

			if ( elem.parentNode ) ***REMOVED***
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) ***REMOVED***
					setGlobalEval( getAll( elem, "script" ) );
				***REMOVED***
				elem.parentNode.removeChild( elem );
			***REMOVED***
		***REMOVED***

		return this;
	***REMOVED***,

	empty: function() ***REMOVED***
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) ***REMOVED***
			if ( elem.nodeType === 1 ) ***REMOVED***

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			***REMOVED***
		***REMOVED***

		return this;
	***REMOVED***,

	clone: function( dataAndEvents, deepDataAndEvents ) ***REMOVED***
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() ***REMOVED***
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		***REMOVED***);
	***REMOVED***,

	html: function( value ) ***REMOVED***
		return access( this, function( value ) ***REMOVED***
			var elem = this[ 0 ] || ***REMOVED******REMOVED***,
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) ***REMOVED***
				return elem.innerHTML;
			***REMOVED***

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) ***REMOVED***

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try ***REMOVED***
					for ( ; i < l; i++ ) ***REMOVED***
						elem = this[ i ] || ***REMOVED******REMOVED***;

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) ***REMOVED***
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						***REMOVED***
					***REMOVED***

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				***REMOVED*** catch( e ) ***REMOVED******REMOVED***
			***REMOVED***

			if ( elem ) ***REMOVED***
				this.empty().append( value );
			***REMOVED***
		***REMOVED***, null, value, arguments.length );
	***REMOVED***,

	replaceWith: function() ***REMOVED***
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) ***REMOVED***
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) ***REMOVED***
				arg.replaceChild( elem, this );
			***REMOVED***
		***REMOVED***);

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	***REMOVED***,

	detach: function( selector ) ***REMOVED***
		return this.remove( selector, true );
	***REMOVED***,

	domManip: function( args, callback ) ***REMOVED***

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) ***REMOVED***
			return this.each(function( index ) ***REMOVED***
				var self = set.eq( index );
				if ( isFunction ) ***REMOVED***
					args[ 0 ] = value.call( this, index, self.html() );
				***REMOVED***
				self.domManip( args, callback );
			***REMOVED***);
		***REMOVED***

		if ( l ) ***REMOVED***
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) ***REMOVED***
				fragment = first;
			***REMOVED***

			if ( first ) ***REMOVED***
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) ***REMOVED***
					node = fragment;

					if ( i !== iNoClone ) ***REMOVED***
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) ***REMOVED***
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						***REMOVED***
					***REMOVED***

					callback.call( this[ i ], node, i );
				***REMOVED***

				if ( hasScripts ) ***REMOVED***
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) ***REMOVED***
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) ***REMOVED***

							if ( node.src ) ***REMOVED***
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) ***REMOVED***
									jQuery._evalUrl( node.src );
								***REMOVED***
							***REMOVED*** else ***REMOVED***
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							***REMOVED***
						***REMOVED***
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***

		return this;
	***REMOVED***
***REMOVED***);

jQuery.each(***REMOVED***
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
***REMOVED***, function( name, original ) ***REMOVED***
	jQuery.fn[ name ] = function( selector ) ***REMOVED***
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) ***REMOVED***
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		***REMOVED***

		return this.pushStack( ret );
	***REMOVED***;
***REMOVED***);

return jQuery;
***REMOVED***);
