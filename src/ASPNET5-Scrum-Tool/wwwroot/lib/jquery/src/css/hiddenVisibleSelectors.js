define([
	"../core",
	"../selector"
], function( jQuery ) ***REMOVED***

jQuery.expr.filters.hidden = function( elem ) ***REMOVED***
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
***REMOVED***;
jQuery.expr.filters.visible = function( elem ) ***REMOVED***
	return !jQuery.expr.filters.hidden( elem );
***REMOVED***;

***REMOVED***);
