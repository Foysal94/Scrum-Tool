define([
	"../core",
	"../var/rnotwhite",
	"../var/strundefined",
	"../core/access",
	"./support",
	"../selector"
], function( jQuery, rnotwhite, strundefined, access, support ) ***REMOVED***

var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend(***REMOVED***
	attr: function( name, value ) ***REMOVED***
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	***REMOVED***,

	removeAttr: function( name ) ***REMOVED***
		return this.each(function() ***REMOVED***
			jQuery.removeAttr( this, name );
		***REMOVED***);
	***REMOVED***
***REMOVED***);

jQuery.extend(***REMOVED***
	attr: function( elem, name, value ) ***REMOVED***
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) ***REMOVED***
			return;
		***REMOVED***

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) ***REMOVED***
			return jQuery.prop( elem, name, value );
		***REMOVED***

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) ***REMOVED***
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		***REMOVED***

		if ( value !== undefined ) ***REMOVED***

			if ( value === null ) ***REMOVED***
				jQuery.removeAttr( elem, name );

			***REMOVED*** else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) ***REMOVED***
				return ret;

			***REMOVED*** else ***REMOVED***
				elem.setAttribute( name, value + "" );
				return value;
			***REMOVED***

		***REMOVED*** else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) ***REMOVED***
			return ret;

		***REMOVED*** else ***REMOVED***
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		***REMOVED***
	***REMOVED***,

	removeAttr: function( elem, value ) ***REMOVED***
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) ***REMOVED***
			while ( (name = attrNames[i++]) ) ***REMOVED***
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) ***REMOVED***
					// Set corresponding property to false
					elem[ propName ] = false;
				***REMOVED***

				elem.removeAttribute( name );
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	attrHooks: ***REMOVED***
		type: ***REMOVED***
			set: function( elem, value ) ***REMOVED***
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) ***REMOVED***
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) ***REMOVED***
						elem.value = val;
					***REMOVED***
					return value;
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***);

// Hooks for boolean attributes
boolHook = ***REMOVED***
	set: function( elem, value, name ) ***REMOVED***
		if ( value === false ) ***REMOVED***
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		***REMOVED*** else ***REMOVED***
			elem.setAttribute( name, name );
		***REMOVED***
		return name;
	***REMOVED***
***REMOVED***;
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) ***REMOVED***
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) ***REMOVED***
		var ret, handle;
		if ( !isXML ) ***REMOVED***
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		***REMOVED***
		return ret;
	***REMOVED***;
***REMOVED***);

***REMOVED***);
