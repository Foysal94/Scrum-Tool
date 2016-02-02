define([
	"./core",
	"./core/access",
	"./css"
], function( jQuery, access ) ***REMOVED***

// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( ***REMOVED*** Height: "height", Width: "width" ***REMOVED***, function( name, type ) ***REMOVED***
	jQuery.each( ***REMOVED*** padding: "inner" + name, content: type, "": "outer" + name ***REMOVED***, function( defaultExtra, funcName ) ***REMOVED***
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) ***REMOVED***
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) ***REMOVED***
				var doc;

				if ( jQuery.isWindow( elem ) ) ***REMOVED***
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				***REMOVED***

				// Get document width or height
				if ( elem.nodeType === 9 ) ***REMOVED***
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				***REMOVED***

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			***REMOVED***, type, chainable ? margin : undefined, chainable, null );
		***REMOVED***;
	***REMOVED***);
***REMOVED***);

return jQuery;
***REMOVED***);
