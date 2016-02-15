define([
	"../core",
	"./var/rnumnonpx",
	"./var/rmargin",
	"./var/getStyles",
	"../selector" // contains
], function( jQuery, rnumnonpx, rmargin, getStyles ) ***REMOVED***

function curCSS( elem, name, computed ) ***REMOVED***
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) ***REMOVED***
		ret = computed.getPropertyValue( name ) || computed[ name ];
	***REMOVED***

	if ( computed ) ***REMOVED***

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) ***REMOVED***
			ret = jQuery.style( elem, name );
		***REMOVED***

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) ***REMOVED***

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		***REMOVED***
	***REMOVED***

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
***REMOVED***

return curCSS;
***REMOVED***);