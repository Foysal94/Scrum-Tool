define([
	"../core",
	"./support",
	"../core/init"
], function( jQuery, support ) ***REMOVED***

var rreturn = /\r/g;

jQuery.fn.extend(***REMOVED***
	val: function( value ) ***REMOVED***
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) ***REMOVED***
			if ( elem ) ***REMOVED***
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) ***REMOVED***
					return ret;
				***REMOVED***

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			***REMOVED***

			return;
		***REMOVED***

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) ***REMOVED***
			var val;

			if ( this.nodeType !== 1 ) ***REMOVED***
				return;
			***REMOVED***

			if ( isFunction ) ***REMOVED***
				val = value.call( this, i, jQuery( this ).val() );
			***REMOVED*** else ***REMOVED***
				val = value;
			***REMOVED***

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) ***REMOVED***
				val = "";

			***REMOVED*** else if ( typeof val === "number" ) ***REMOVED***
				val += "";

			***REMOVED*** else if ( jQuery.isArray( val ) ) ***REMOVED***
				val = jQuery.map( val, function( value ) ***REMOVED***
					return value == null ? "" : value + "";
				***REMOVED***);
			***REMOVED***

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) ***REMOVED***
				this.value = val;
			***REMOVED***
		***REMOVED***);
	***REMOVED***
***REMOVED***);

jQuery.extend(***REMOVED***
	valHooks: ***REMOVED***
		option: ***REMOVED***
			get: function( elem ) ***REMOVED***
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			***REMOVED***
		***REMOVED***,
		select: ***REMOVED***
			get: function( elem ) ***REMOVED***
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) ***REMOVED***
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) ***REMOVED***

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) ***REMOVED***
							return value;
						***REMOVED***

						// Multi-Selects return an array
						values.push( value );
					***REMOVED***
				***REMOVED***

				return values;
			***REMOVED***,

			set: function( elem, value ) ***REMOVED***
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) ***REMOVED***
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) ***REMOVED***
						optionSet = true;
					***REMOVED***
				***REMOVED***

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) ***REMOVED***
					elem.selectedIndex = -1;
				***REMOVED***
				return values;
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***);

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() ***REMOVED***
	jQuery.valHooks[ this ] = ***REMOVED***
		set: function( elem, value ) ***REMOVED***
			if ( jQuery.isArray( value ) ) ***REMOVED***
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			***REMOVED***
		***REMOVED***
	***REMOVED***;
	if ( !support.checkOn ) ***REMOVED***
		jQuery.valHooks[ this ].get = function( elem ) ***REMOVED***
			return elem.getAttribute("value") === null ? "on" : elem.value;
		***REMOVED***;
	***REMOVED***
***REMOVED***);

***REMOVED***);
