define([
	"../core"
], function( jQuery ) ***REMOVED***

/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) ***REMOVED***
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
***REMOVED***;

return jQuery.acceptData;
***REMOVED***);