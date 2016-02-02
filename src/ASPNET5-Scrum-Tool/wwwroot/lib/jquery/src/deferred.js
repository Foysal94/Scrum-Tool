define([
	"./core",
	"./var/slice",
	"./callbacks"
], function( jQuery, slice ) ***REMOVED***

jQuery.extend(***REMOVED***

	Deferred: function( func ) ***REMOVED***
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = ***REMOVED***
				state: function() ***REMOVED***
					return state;
				***REMOVED***,
				always: function() ***REMOVED***
					deferred.done( arguments ).fail( arguments );
					return this;
				***REMOVED***,
				then: function( /* fnDone, fnFail, fnProgress */ ) ***REMOVED***
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) ***REMOVED***
						jQuery.each( tuples, function( i, tuple ) ***REMOVED***
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() ***REMOVED***
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) ***REMOVED***
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								***REMOVED*** else ***REMOVED***
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								***REMOVED***
							***REMOVED***);
						***REMOVED***);
						fns = null;
					***REMOVED***).promise();
				***REMOVED***,
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) ***REMOVED***
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				***REMOVED***
			***REMOVED***,
			deferred = ***REMOVED******REMOVED***;

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) ***REMOVED***
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) ***REMOVED***
				list.add(function() ***REMOVED***
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				***REMOVED***, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			***REMOVED***

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() ***REMOVED***
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			***REMOVED***;
			deferred[ tuple[0] + "With" ] = list.fireWith;
		***REMOVED***);

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) ***REMOVED***
			func.call( deferred, deferred );
		***REMOVED***

		// All done!
		return deferred;
	***REMOVED***,

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) ***REMOVED***
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) ***REMOVED***
				return function( value ) ***REMOVED***
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) ***REMOVED***
						deferred.notifyWith( contexts, values );
					***REMOVED*** else if ( !( --remaining ) ) ***REMOVED***
						deferred.resolveWith( contexts, values );
					***REMOVED***
				***REMOVED***;
			***REMOVED***,

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) ***REMOVED***
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) ***REMOVED***
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) ***REMOVED***
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				***REMOVED*** else ***REMOVED***
					--remaining;
				***REMOVED***
			***REMOVED***
		***REMOVED***

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) ***REMOVED***
			deferred.resolveWith( resolveContexts, resolveValues );
		***REMOVED***

		return deferred.promise();
	***REMOVED***
***REMOVED***);

return jQuery;
***REMOVED***);
