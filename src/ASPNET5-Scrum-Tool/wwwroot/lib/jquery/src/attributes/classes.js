define([
	"../core",
	"../var/rnotwhite",
	"../var/strundefined",
	"../data/var/data_priv",
	"../core/init"
], function( jQuery, rnotwhite, strundefined, data_priv ) ***REMOVED***

var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend(***REMOVED***
	addClass: function( value ) ***REMOVED***
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) ***REMOVED***
			return this.each(function( j ) ***REMOVED***
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			***REMOVED***);
		***REMOVED***

		if ( proceed ) ***REMOVED***
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) ***REMOVED***
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) ***REMOVED***
					j = 0;
					while ( (clazz = classes[j++]) ) ***REMOVED***
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) ***REMOVED***
							cur += clazz + " ";
						***REMOVED***
					***REMOVED***

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) ***REMOVED***
						elem.className = finalValue;
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***

		return this;
	***REMOVED***,

	removeClass: function( value ) ***REMOVED***
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) ***REMOVED***
			return this.each(function( j ) ***REMOVED***
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			***REMOVED***);
		***REMOVED***
		if ( proceed ) ***REMOVED***
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) ***REMOVED***
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) ***REMOVED***
					j = 0;
					while ( (clazz = classes[j++]) ) ***REMOVED***
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) ***REMOVED***
							cur = cur.replace( " " + clazz + " ", " " );
						***REMOVED***
					***REMOVED***

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) ***REMOVED***
						elem.className = finalValue;
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***

		return this;
	***REMOVED***,

	toggleClass: function( value, stateVal ) ***REMOVED***
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) ***REMOVED***
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		***REMOVED***

		if ( jQuery.isFunction( value ) ) ***REMOVED***
			return this.each(function( i ) ***REMOVED***
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			***REMOVED***);
		***REMOVED***

		return this.each(function() ***REMOVED***
			if ( type === "string" ) ***REMOVED***
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) ***REMOVED***
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) ***REMOVED***
						self.removeClass( className );
					***REMOVED*** else ***REMOVED***
						self.addClass( className );
					***REMOVED***
				***REMOVED***

			// Toggle whole class name
			***REMOVED*** else if ( type === strundefined || type === "boolean" ) ***REMOVED***
				if ( this.className ) ***REMOVED***
					// store className if set
					data_priv.set( this, "__className__", this.className );
				***REMOVED***

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			***REMOVED***
		***REMOVED***);
	***REMOVED***,

	hasClass: function( selector ) ***REMOVED***
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) ***REMOVED***
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) ***REMOVED***
				return true;
			***REMOVED***
		***REMOVED***

		return false;
	***REMOVED***
***REMOVED***);

***REMOVED***);
