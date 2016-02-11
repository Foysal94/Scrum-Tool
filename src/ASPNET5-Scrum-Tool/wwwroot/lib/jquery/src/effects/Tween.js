define([
	"../core",
	"../css"
], function( jQuery ) ***REMOVED***

function Tween( elem, options, prop, end, easing ) ***REMOVED***
	return new Tween.prototype.init( elem, options, prop, end, easing );
***REMOVED***
jQuery.Tween = Tween;

Tween.prototype = ***REMOVED***
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) ***REMOVED***
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	***REMOVED***,
	cur: function() ***REMOVED***
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	***REMOVED***,
	run: function( percent ) ***REMOVED***
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) ***REMOVED***
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		***REMOVED*** else ***REMOVED***
			this.pos = eased = percent;
		***REMOVED***
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) ***REMOVED***
			this.options.step.call( this.elem, this.now, this );
		***REMOVED***

		if ( hooks && hooks.set ) ***REMOVED***
			hooks.set( this );
		***REMOVED*** else ***REMOVED***
			Tween.propHooks._default.set( this );
		***REMOVED***
		return this;
	***REMOVED***
***REMOVED***;

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = ***REMOVED***
	_default: ***REMOVED***
		get: function( tween ) ***REMOVED***
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) ***REMOVED***
				return tween.elem[ tween.prop ];
			***REMOVED***

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		***REMOVED***,
		set: function( tween ) ***REMOVED***
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) ***REMOVED***
				jQuery.fx.step[ tween.prop ]( tween );
			***REMOVED*** else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) ***REMOVED***
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			***REMOVED*** else ***REMOVED***
				tween.elem[ tween.prop ] = tween.now;
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = ***REMOVED***
	set: function( tween ) ***REMOVED***
		if ( tween.elem.nodeType && tween.elem.parentNode ) ***REMOVED***
			tween.elem[ tween.prop ] = tween.now;
		***REMOVED***
	***REMOVED***
***REMOVED***;

jQuery.easing = ***REMOVED***
	linear: function( p ) ***REMOVED***
		return p;
	***REMOVED***,
	swing: function( p ) ***REMOVED***
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	***REMOVED***
***REMOVED***;

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = ***REMOVED******REMOVED***;

***REMOVED***);
