define([
	"../core",
	"../event"
], function( jQuery ) ***REMOVED***

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) ***REMOVED***

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) ***REMOVED***
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	***REMOVED***;
***REMOVED***);

jQuery.fn.extend(***REMOVED***
	hover: function( fnOver, fnOut ) ***REMOVED***
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	***REMOVED***,

	bind: function( types, data, fn ) ***REMOVED***
		return this.on( types, null, data, fn );
	***REMOVED***,
	unbind: function( types, fn ) ***REMOVED***
		return this.off( types, null, fn );
	***REMOVED***,

	delegate: function( selector, types, data, fn ) ***REMOVED***
		return this.on( types, selector, data, fn );
	***REMOVED***,
	undelegate: function( selector, types, fn ) ***REMOVED***
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	***REMOVED***
***REMOVED***);

***REMOVED***);
