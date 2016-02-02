define([
	"./core",
	"./core/init",
	"./manipulation", // clone
	"./traversing" // parent, contents
], function( jQuery ) ***REMOVED***

jQuery.fn.extend(***REMOVED***
	wrapAll: function( html ) ***REMOVED***
		var wrap;

		if ( jQuery.isFunction( html ) ) ***REMOVED***
			return this.each(function( i ) ***REMOVED***
				jQuery( this ).wrapAll( html.call(this, i) );
			***REMOVED***);
		***REMOVED***

		if ( this[ 0 ] ) ***REMOVED***

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) ***REMOVED***
				wrap.insertBefore( this[ 0 ] );
			***REMOVED***

			wrap.map(function() ***REMOVED***
				var elem = this;

				while ( elem.firstElementChild ) ***REMOVED***
					elem = elem.firstElementChild;
				***REMOVED***

				return elem;
			***REMOVED***).append( this );
		***REMOVED***

		return this;
	***REMOVED***,

	wrapInner: function( html ) ***REMOVED***
		if ( jQuery.isFunction( html ) ) ***REMOVED***
			return this.each(function( i ) ***REMOVED***
				jQuery( this ).wrapInner( html.call(this, i) );
			***REMOVED***);
		***REMOVED***

		return this.each(function() ***REMOVED***
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) ***REMOVED***
				contents.wrapAll( html );

			***REMOVED*** else ***REMOVED***
				self.append( html );
			***REMOVED***
		***REMOVED***);
	***REMOVED***,

	wrap: function( html ) ***REMOVED***
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) ***REMOVED***
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		***REMOVED***);
	***REMOVED***,

	unwrap: function() ***REMOVED***
		return this.parent().each(function() ***REMOVED***
			if ( !jQuery.nodeName( this, "body" ) ) ***REMOVED***
				jQuery( this ).replaceWith( this.childNodes );
			***REMOVED***
		***REMOVED***).end();
	***REMOVED***
***REMOVED***);

return jQuery;
***REMOVED***);
