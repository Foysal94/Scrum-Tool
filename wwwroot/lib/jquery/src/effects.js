define([
	"./core",
	"./var/pnum",
	"./css/var/cssExpand",
	"./css/var/isHidden",
	"./css/defaultDisplay",
	"./data/var/data_priv",

	"./core/init",
	"./effects/Tween",
	"./queue",
	"./css",
	"./deferred",
	"./traversing"
], function( jQuery, pnum, cssExpand, isHidden, defaultDisplay, data_priv ) ***REMOVED***

var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = ***REMOVED***
		"*": [ function( prop, value ) ***REMOVED***
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) ***REMOVED***
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do ***REMOVED***
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				***REMOVED*** while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			***REMOVED***

			// Update tween properties
			if ( parts ) ***REMOVED***
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			***REMOVED***

			return tween;
		***REMOVED*** ]
	***REMOVED***;

// Animations created synchronously will run synchronously
function createFxNow() ***REMOVED***
	setTimeout(function() ***REMOVED***
		fxNow = undefined;
	***REMOVED***);
	return ( fxNow = jQuery.now() );
***REMOVED***

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) ***REMOVED***
	var which,
		i = 0,
		attrs = ***REMOVED*** height: type ***REMOVED***;

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) ***REMOVED***
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	***REMOVED***

	if ( includeWidth ) ***REMOVED***
		attrs.opacity = attrs.width = type;
	***REMOVED***

	return attrs;
***REMOVED***

function createTween( value, prop, animation ) ***REMOVED***
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) ***REMOVED***
		if ( (tween = collection[ index ].call( animation, prop, value )) ) ***REMOVED***

			// We're done with this property
			return tween;
		***REMOVED***
	***REMOVED***
***REMOVED***

function defaultPrefilter( elem, props, opts ) ***REMOVED***
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = ***REMOVED******REMOVED***,
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) ***REMOVED***
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) ***REMOVED***
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() ***REMOVED***
				if ( !hooks.unqueued ) ***REMOVED***
					oldfire();
				***REMOVED***
			***REMOVED***;
		***REMOVED***
		hooks.unqueued++;

		anim.always(function() ***REMOVED***
			// Ensure the complete handler is called before this completes
			anim.always(function() ***REMOVED***
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) ***REMOVED***
					hooks.empty.fire();
				***REMOVED***
			***REMOVED***);
		***REMOVED***);
	***REMOVED***

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) ***REMOVED***
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) ***REMOVED***
			style.display = "inline-block";
		***REMOVED***
	***REMOVED***

	if ( opts.overflow ) ***REMOVED***
		style.overflow = "hidden";
		anim.always(function() ***REMOVED***
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		***REMOVED***);
	***REMOVED***

	// show/hide pass
	for ( prop in props ) ***REMOVED***
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) ***REMOVED***
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) ***REMOVED***

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) ***REMOVED***
					hidden = true;
				***REMOVED*** else ***REMOVED***
					continue;
				***REMOVED***
			***REMOVED***
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		***REMOVED*** else ***REMOVED***
			display = undefined;
		***REMOVED***
	***REMOVED***

	if ( !jQuery.isEmptyObject( orig ) ) ***REMOVED***
		if ( dataShow ) ***REMOVED***
			if ( "hidden" in dataShow ) ***REMOVED***
				hidden = dataShow.hidden;
			***REMOVED***
		***REMOVED*** else ***REMOVED***
			dataShow = data_priv.access( elem, "fxshow", ***REMOVED******REMOVED*** );
		***REMOVED***

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) ***REMOVED***
			dataShow.hidden = !hidden;
		***REMOVED***
		if ( hidden ) ***REMOVED***
			jQuery( elem ).show();
		***REMOVED*** else ***REMOVED***
			anim.done(function() ***REMOVED***
				jQuery( elem ).hide();
			***REMOVED***);
		***REMOVED***
		anim.done(function() ***REMOVED***
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) ***REMOVED***
				jQuery.style( elem, prop, orig[ prop ] );
			***REMOVED***
		***REMOVED***);
		for ( prop in orig ) ***REMOVED***
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) ***REMOVED***
				dataShow[ prop ] = tween.start;
				if ( hidden ) ***REMOVED***
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				***REMOVED***
			***REMOVED***
		***REMOVED***

	// If this is a noop like .hide().hide(), restore an overwritten display value
	***REMOVED*** else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) ***REMOVED***
		style.display = display;
	***REMOVED***
***REMOVED***

function propFilter( props, specialEasing ) ***REMOVED***
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) ***REMOVED***
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) ***REMOVED***
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		***REMOVED***

		if ( index !== name ) ***REMOVED***
			props[ name ] = value;
			delete props[ index ];
		***REMOVED***

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) ***REMOVED***
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) ***REMOVED***
				if ( !( index in props ) ) ***REMOVED***
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				***REMOVED***
			***REMOVED***
		***REMOVED*** else ***REMOVED***
			specialEasing[ name ] = easing;
		***REMOVED***
	***REMOVED***
***REMOVED***

function Animation( elem, properties, options ) ***REMOVED***
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() ***REMOVED***
			// Don't match elem in the :animated selector
			delete tick.elem;
		***REMOVED***),
		tick = function() ***REMOVED***
			if ( stopped ) ***REMOVED***
				return false;
			***REMOVED***
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) ***REMOVED***
				animation.tweens[ index ].run( percent );
			***REMOVED***

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) ***REMOVED***
				return remaining;
			***REMOVED*** else ***REMOVED***
				deferred.resolveWith( elem, [ animation ] );
				return false;
			***REMOVED***
		***REMOVED***,
		animation = deferred.promise(***REMOVED***
			elem: elem,
			props: jQuery.extend( ***REMOVED******REMOVED***, properties ),
			opts: jQuery.extend( true, ***REMOVED*** specialEasing: ***REMOVED******REMOVED*** ***REMOVED***, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) ***REMOVED***
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			***REMOVED***,
			stop: function( gotoEnd ) ***REMOVED***
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) ***REMOVED***
					return this;
				***REMOVED***
				stopped = true;
				for ( ; index < length ; index++ ) ***REMOVED***
					animation.tweens[ index ].run( 1 );
				***REMOVED***

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) ***REMOVED***
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				***REMOVED*** else ***REMOVED***
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				***REMOVED***
				return this;
			***REMOVED***
		***REMOVED***),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) ***REMOVED***
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) ***REMOVED***
			return result;
		***REMOVED***
	***REMOVED***

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) ***REMOVED***
		animation.opts.start.call( elem, animation );
	***REMOVED***

	jQuery.fx.timer(
		jQuery.extend( tick, ***REMOVED***
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		***REMOVED***)
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
***REMOVED***

jQuery.Animation = jQuery.extend( Animation, ***REMOVED***

	tweener: function( props, callback ) ***REMOVED***
		if ( jQuery.isFunction( props ) ) ***REMOVED***
			callback = props;
			props = [ "*" ];
		***REMOVED*** else ***REMOVED***
			props = props.split(" ");
		***REMOVED***

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) ***REMOVED***
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		***REMOVED***
	***REMOVED***,

	prefilter: function( callback, prepend ) ***REMOVED***
		if ( prepend ) ***REMOVED***
			animationPrefilters.unshift( callback );
		***REMOVED*** else ***REMOVED***
			animationPrefilters.push( callback );
		***REMOVED***
	***REMOVED***
***REMOVED***);

jQuery.speed = function( speed, easing, fn ) ***REMOVED***
	var opt = speed && typeof speed === "object" ? jQuery.extend( ***REMOVED******REMOVED***, speed ) : ***REMOVED***
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	***REMOVED***;

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) ***REMOVED***
		opt.queue = "fx";
	***REMOVED***

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() ***REMOVED***
		if ( jQuery.isFunction( opt.old ) ) ***REMOVED***
			opt.old.call( this );
		***REMOVED***

		if ( opt.queue ) ***REMOVED***
			jQuery.dequeue( this, opt.queue );
		***REMOVED***
	***REMOVED***;

	return opt;
***REMOVED***;

jQuery.fn.extend(***REMOVED***
	fadeTo: function( speed, to, easing, callback ) ***REMOVED***

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate(***REMOVED*** opacity: to ***REMOVED***, speed, easing, callback );
	***REMOVED***,
	animate: function( prop, speed, easing, callback ) ***REMOVED***
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() ***REMOVED***
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( ***REMOVED******REMOVED***, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) ***REMOVED***
					anim.stop( true );
				***REMOVED***
			***REMOVED***;
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	***REMOVED***,
	stop: function( type, clearQueue, gotoEnd ) ***REMOVED***
		var stopQueue = function( hooks ) ***REMOVED***
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		***REMOVED***;

		if ( typeof type !== "string" ) ***REMOVED***
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		***REMOVED***
		if ( clearQueue && type !== false ) ***REMOVED***
			this.queue( type || "fx", [] );
		***REMOVED***

		return this.each(function() ***REMOVED***
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) ***REMOVED***
				if ( data[ index ] && data[ index ].stop ) ***REMOVED***
					stopQueue( data[ index ] );
				***REMOVED***
			***REMOVED*** else ***REMOVED***
				for ( index in data ) ***REMOVED***
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) ***REMOVED***
						stopQueue( data[ index ] );
					***REMOVED***
				***REMOVED***
			***REMOVED***

			for ( index = timers.length; index--; ) ***REMOVED***
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) ***REMOVED***
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				***REMOVED***
			***REMOVED***

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) ***REMOVED***
				jQuery.dequeue( this, type );
			***REMOVED***
		***REMOVED***);
	***REMOVED***,
	finish: function( type ) ***REMOVED***
		if ( type !== false ) ***REMOVED***
			type = type || "fx";
		***REMOVED***
		return this.each(function() ***REMOVED***
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) ***REMOVED***
				hooks.stop.call( this, true );
			***REMOVED***

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) ***REMOVED***
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) ***REMOVED***
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				***REMOVED***
			***REMOVED***

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) ***REMOVED***
				if ( queue[ index ] && queue[ index ].finish ) ***REMOVED***
					queue[ index ].finish.call( this );
				***REMOVED***
			***REMOVED***

			// Turn off finishing flag
			delete data.finish;
		***REMOVED***);
	***REMOVED***
***REMOVED***);

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) ***REMOVED***
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) ***REMOVED***
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	***REMOVED***;
***REMOVED***);

// Generate shortcuts for custom animations
jQuery.each(***REMOVED***
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: ***REMOVED*** opacity: "show" ***REMOVED***,
	fadeOut: ***REMOVED*** opacity: "hide" ***REMOVED***,
	fadeToggle: ***REMOVED*** opacity: "toggle" ***REMOVED***
***REMOVED***, function( name, props ) ***REMOVED***
	jQuery.fn[ name ] = function( speed, easing, callback ) ***REMOVED***
		return this.animate( props, speed, easing, callback );
	***REMOVED***;
***REMOVED***);

jQuery.timers = [];
jQuery.fx.tick = function() ***REMOVED***
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) ***REMOVED***
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) ***REMOVED***
			timers.splice( i--, 1 );
		***REMOVED***
	***REMOVED***

	if ( !timers.length ) ***REMOVED***
		jQuery.fx.stop();
	***REMOVED***
	fxNow = undefined;
***REMOVED***;

jQuery.fx.timer = function( timer ) ***REMOVED***
	jQuery.timers.push( timer );
	if ( timer() ) ***REMOVED***
		jQuery.fx.start();
	***REMOVED*** else ***REMOVED***
		jQuery.timers.pop();
	***REMOVED***
***REMOVED***;

jQuery.fx.interval = 13;

jQuery.fx.start = function() ***REMOVED***
	if ( !timerId ) ***REMOVED***
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	***REMOVED***
***REMOVED***;

jQuery.fx.stop = function() ***REMOVED***
	clearInterval( timerId );
	timerId = null;
***REMOVED***;

jQuery.fx.speeds = ***REMOVED***
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
***REMOVED***;

return jQuery;
***REMOVED***);
