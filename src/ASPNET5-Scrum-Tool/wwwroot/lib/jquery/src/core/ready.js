define([
	"../core",
	"../core/init",
	"../deferred"
], function( jQuery ) ***REMOVED***

// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) ***REMOVED***
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
***REMOVED***;

jQuery.extend(***REMOVED***
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) ***REMOVED***
		if ( hold ) ***REMOVED***
			jQuery.readyWait++;
		***REMOVED*** else ***REMOVED***
			jQuery.ready( true );
		***REMOVED***
	***REMOVED***,

	// Handle when the DOM is ready
	ready: function( wait ) ***REMOVED***

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) ***REMOVED***
			return;
		***REMOVED***

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) ***REMOVED***
			return;
		***REMOVED***

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) ***REMOVED***
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		***REMOVED***
	***REMOVED***
***REMOVED***);

/**
 * The ready event handler and self cleanup method
 */
function completed() ***REMOVED***
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
***REMOVED***

jQuery.ready.promise = function( obj ) ***REMOVED***
	if ( !readyList ) ***REMOVED***

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) ***REMOVED***
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		***REMOVED*** else ***REMOVED***

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		***REMOVED***
	***REMOVED***
	return readyList.promise( obj );
***REMOVED***;

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();

***REMOVED***);
