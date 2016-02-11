define([
	"../core",
	"../core/access",
	"./support"
], function( jQuery, access, support ) ***REMOVED***

var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend(***REMOVED***
	prop: function( name, value ) ***REMOVED***
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	***REMOVED***,

	removeProp: function( name ) ***REMOVED***
		return this.each(function() ***REMOVED***
			delete this[ jQuery.propFix[ name ] || name ];
		***REMOVED***);
	***REMOVED***
***REMOVED***);

jQuery.extend(***REMOVED***
	propFix: ***REMOVED***
		"for": "htmlFor",
		"class": "className"
	***REMOVED***,

	prop: function( elem, name, value ) ***REMOVED***
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) ***REMOVED***
			return;
		***REMOVED***

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) ***REMOVED***
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		***REMOVED***

		if ( value !== undefined ) ***REMOVED***
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		***REMOVED*** else ***REMOVED***
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		***REMOVED***
	***REMOVED***,

	propHooks: ***REMOVED***
		tabIndex: ***REMOVED***
			get: function( elem ) ***REMOVED***
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***);

if ( !support.optSelected ) ***REMOVED***
	jQuery.propHooks.selected = ***REMOVED***
		get: function( elem ) ***REMOVED***
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) ***REMOVED***
				parent.parentNode.selectedIndex;
			***REMOVED***
			return null;
		***REMOVED***
	***REMOVED***;
***REMOVED***

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() ***REMOVED***
	jQuery.propFix[ this.toLowerCase() ] = this;
***REMOVED***);

***REMOVED***);
