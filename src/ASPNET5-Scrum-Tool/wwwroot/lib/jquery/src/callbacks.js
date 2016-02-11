define([
	"./core",
	"./var/rnotwhite"
], function( jQuery, rnotwhite ) ***REMOVED***

// String to Object options format cache
var optionsCache = ***REMOVED******REMOVED***;

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) ***REMOVED***
	var object = optionsCache[ options ] = ***REMOVED******REMOVED***;
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) ***REMOVED***
		object[ flag ] = true;
	***REMOVED***);
	return object;
***REMOVED***

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) ***REMOVED***

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( ***REMOVED******REMOVED***, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) ***REMOVED***
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) ***REMOVED***
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) ***REMOVED***
					memory = false; // To prevent further calls using add
					break;
				***REMOVED***
			***REMOVED***
			firing = false;
			if ( list ) ***REMOVED***
				if ( stack ) ***REMOVED***
					if ( stack.length ) ***REMOVED***
						fire( stack.shift() );
					***REMOVED***
				***REMOVED*** else if ( memory ) ***REMOVED***
					list = [];
				***REMOVED*** else ***REMOVED***
					self.disable();
				***REMOVED***
			***REMOVED***
		***REMOVED***,
		// Actual Callbacks object
		self = ***REMOVED***
			// Add a callback or a collection of callbacks to the list
			add: function() ***REMOVED***
				if ( list ) ***REMOVED***
					// First, we save the current length
					var start = list.length;
					(function add( args ) ***REMOVED***
						jQuery.each( args, function( _, arg ) ***REMOVED***
							var type = jQuery.type( arg );
							if ( type === "function" ) ***REMOVED***
								if ( !options.unique || !self.has( arg ) ) ***REMOVED***
									list.push( arg );
								***REMOVED***
							***REMOVED*** else if ( arg && arg.length && type !== "string" ) ***REMOVED***
								// Inspect recursively
								add( arg );
							***REMOVED***
						***REMOVED***);
					***REMOVED***)( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) ***REMOVED***
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					***REMOVED*** else if ( memory ) ***REMOVED***
						firingStart = start;
						fire( memory );
					***REMOVED***
				***REMOVED***
				return this;
			***REMOVED***,
			// Remove a callback from the list
			remove: function() ***REMOVED***
				if ( list ) ***REMOVED***
					jQuery.each( arguments, function( _, arg ) ***REMOVED***
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) ***REMOVED***
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) ***REMOVED***
								if ( index <= firingLength ) ***REMOVED***
									firingLength--;
								***REMOVED***
								if ( index <= firingIndex ) ***REMOVED***
									firingIndex--;
								***REMOVED***
							***REMOVED***
						***REMOVED***
					***REMOVED***);
				***REMOVED***
				return this;
			***REMOVED***,
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) ***REMOVED***
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			***REMOVED***,
			// Remove all callbacks from the list
			empty: function() ***REMOVED***
				list = [];
				firingLength = 0;
				return this;
			***REMOVED***,
			// Have the list do nothing anymore
			disable: function() ***REMOVED***
				list = stack = memory = undefined;
				return this;
			***REMOVED***,
			// Is it disabled?
			disabled: function() ***REMOVED***
				return !list;
			***REMOVED***,
			// Lock the list in its current state
			lock: function() ***REMOVED***
				stack = undefined;
				if ( !memory ) ***REMOVED***
					self.disable();
				***REMOVED***
				return this;
			***REMOVED***,
			// Is it locked?
			locked: function() ***REMOVED***
				return !stack;
			***REMOVED***,
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) ***REMOVED***
				if ( list && ( !fired || stack ) ) ***REMOVED***
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) ***REMOVED***
						stack.push( args );
					***REMOVED*** else ***REMOVED***
						fire( args );
					***REMOVED***
				***REMOVED***
				return this;
			***REMOVED***,
			// Call all the callbacks with the given arguments
			fire: function() ***REMOVED***
				self.fireWith( this, arguments );
				return this;
			***REMOVED***,
			// To know if the callbacks have already been called at least once
			fired: function() ***REMOVED***
				return !!fired;
			***REMOVED***
		***REMOVED***;

	return self;
***REMOVED***;

return jQuery;
***REMOVED***);
