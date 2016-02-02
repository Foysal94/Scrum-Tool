define(function() ***REMOVED***
	return function( elem ) ***REMOVED***
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) ***REMOVED***
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		***REMOVED***

		return window.getComputedStyle( elem, null );
	***REMOVED***;
***REMOVED***);
