define([
	"../../core",
	"../../selector"
	// css is assumed
], function( jQuery ) ***REMOVED***

	return function( elem, el ) ***REMOVED***
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	***REMOVED***;
***REMOVED***);
