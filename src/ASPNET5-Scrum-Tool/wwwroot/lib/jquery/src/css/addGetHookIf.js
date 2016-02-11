define(function() ***REMOVED***

function addGetHookIf( conditionFn, hookFn ) ***REMOVED***
	// Define the hook, we'll check on the first run if it's really needed.
	return ***REMOVED***
		get: function() ***REMOVED***
			if ( conditionFn() ) ***REMOVED***
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			***REMOVED***

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		***REMOVED***
	***REMOVED***;
***REMOVED***

return addGetHookIf;

***REMOVED***);
