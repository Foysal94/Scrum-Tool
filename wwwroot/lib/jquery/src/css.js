define([
	"./core",
	"./var/pnum",
	"./core/access",
	"./css/var/rmargin",
	"./css/var/rnumnonpx",
	"./css/var/cssExpand",
	"./css/var/isHidden",
	"./css/var/getStyles",
	"./css/curCSS",
	"./css/defaultDisplay",
	"./css/addGetHookIf",
	"./css/support",
	"./data/var/data_priv",

	"./core/init",
	"./css/swap",
	"./core/ready",
	"./selector" // contains
], function( jQuery, pnum, access, rmargin, rnumnonpx, cssExpand, isHidden,
	getStyles, curCSS, defaultDisplay, addGetHookIf, support, data_priv ) ***REMOVED***

var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = ***REMOVED*** position: "absolute", visibility: "hidden", display: "block" ***REMOVED***,
	cssNormalTransform = ***REMOVED***
		letterSpacing: "0",
		fontWeight: "400"
	***REMOVED***,

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) ***REMOVED***

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) ***REMOVED***
		return name;
	***REMOVED***

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) ***REMOVED***
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) ***REMOVED***
			return name;
		***REMOVED***
	***REMOVED***

	return origName;
***REMOVED***

function setPositiveNumber( elem, value, subtract ) ***REMOVED***
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
***REMOVED***

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) ***REMOVED***
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) ***REMOVED***
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) ***REMOVED***
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		***REMOVED***

		if ( isBorderBox ) ***REMOVED***
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) ***REMOVED***
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			***REMOVED***

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) ***REMOVED***
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			***REMOVED***
		***REMOVED*** else ***REMOVED***
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) ***REMOVED***
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return val;
***REMOVED***

function getWidthOrHeight( elem, name, extra ) ***REMOVED***

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) ***REMOVED***
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) ***REMOVED***
			val = elem.style[ name ];
		***REMOVED***

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) ***REMOVED***
			return val;
		***REMOVED***

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	***REMOVED***

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
***REMOVED***

function showHide( elements, show ) ***REMOVED***
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) ***REMOVED***
		elem = elements[ index ];
		if ( !elem.style ) ***REMOVED***
			continue;
		***REMOVED***

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) ***REMOVED***
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) ***REMOVED***
				elem.style.display = "";
			***REMOVED***

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) ***REMOVED***
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			***REMOVED***
		***REMOVED*** else ***REMOVED***
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) ***REMOVED***
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			***REMOVED***
		***REMOVED***
	***REMOVED***

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) ***REMOVED***
		elem = elements[ index ];
		if ( !elem.style ) ***REMOVED***
			continue;
		***REMOVED***
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) ***REMOVED***
			elem.style.display = show ? values[ index ] || "" : "none";
		***REMOVED***
	***REMOVED***

	return elements;
***REMOVED***

jQuery.extend(***REMOVED***

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: ***REMOVED***
		opacity: ***REMOVED***
			get: function( elem, computed ) ***REMOVED***
				if ( computed ) ***REMOVED***

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: ***REMOVED***
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	***REMOVED***,

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: ***REMOVED***
		"float": "cssFloat"
	***REMOVED***,

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) ***REMOVED***

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) ***REMOVED***
			return;
		***REMOVED***

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) ***REMOVED***
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) ***REMOVED***
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			***REMOVED***

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) ***REMOVED***
				return;
			***REMOVED***

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) ***REMOVED***
				value += "px";
			***REMOVED***

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) ***REMOVED***
				style[ name ] = "inherit";
			***REMOVED***

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) ***REMOVED***
				style[ name ] = value;
			***REMOVED***

		***REMOVED*** else ***REMOVED***
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) ***REMOVED***
				return ret;
			***REMOVED***

			// Otherwise just get the value from the style object
			return style[ name ];
		***REMOVED***
	***REMOVED***,

	css: function( elem, name, extra, styles ) ***REMOVED***
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) ***REMOVED***
			val = hooks.get( elem, true, extra );
		***REMOVED***

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) ***REMOVED***
			val = curCSS( elem, name, styles );
		***REMOVED***

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) ***REMOVED***
			val = cssNormalTransform[ name ];
		***REMOVED***

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) ***REMOVED***
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		***REMOVED***
		return val;
	***REMOVED***
***REMOVED***);

jQuery.each([ "height", "width" ], function( i, name ) ***REMOVED***
	jQuery.cssHooks[ name ] = ***REMOVED***
		get: function( elem, computed, extra ) ***REMOVED***
			if ( computed ) ***REMOVED***

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() ***REMOVED***
						return getWidthOrHeight( elem, name, extra );
					***REMOVED***) :
					getWidthOrHeight( elem, name, extra );
			***REMOVED***
		***REMOVED***,

		set: function( elem, value, extra ) ***REMOVED***
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		***REMOVED***
	***REMOVED***;
***REMOVED***);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) ***REMOVED***
		if ( computed ) ***REMOVED***
			return jQuery.swap( elem, ***REMOVED*** "display": "inline-block" ***REMOVED***,
				curCSS, [ elem, "marginRight" ] );
		***REMOVED***
	***REMOVED***
);

// These hooks are used by animate to expand properties
jQuery.each(***REMOVED***
	margin: "",
	padding: "",
	border: "Width"
***REMOVED***, function( prefix, suffix ) ***REMOVED***
	jQuery.cssHooks[ prefix + suffix ] = ***REMOVED***
		expand: function( value ) ***REMOVED***
			var i = 0,
				expanded = ***REMOVED******REMOVED***,

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) ***REMOVED***
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			***REMOVED***

			return expanded;
		***REMOVED***
	***REMOVED***;

	if ( !rmargin.test( prefix ) ) ***REMOVED***
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	***REMOVED***
***REMOVED***);

jQuery.fn.extend(***REMOVED***
	css: function( name, value ) ***REMOVED***
		return access( this, function( elem, name, value ) ***REMOVED***
			var styles, len,
				map = ***REMOVED******REMOVED***,
				i = 0;

			if ( jQuery.isArray( name ) ) ***REMOVED***
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) ***REMOVED***
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				***REMOVED***

				return map;
			***REMOVED***

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		***REMOVED***, name, value, arguments.length > 1 );
	***REMOVED***,
	show: function() ***REMOVED***
		return showHide( this, true );
	***REMOVED***,
	hide: function() ***REMOVED***
		return showHide( this );
	***REMOVED***,
	toggle: function( state ) ***REMOVED***
		if ( typeof state === "boolean" ) ***REMOVED***
			return state ? this.show() : this.hide();
		***REMOVED***

		return this.each(function() ***REMOVED***
			if ( isHidden( this ) ) ***REMOVED***
				jQuery( this ).show();
			***REMOVED*** else ***REMOVED***
				jQuery( this ).hide();
			***REMOVED***
		***REMOVED***);
	***REMOVED***
***REMOVED***);

return jQuery;
***REMOVED***);
