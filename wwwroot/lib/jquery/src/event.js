define([
	"./core",
	"./var/strundefined",
	"./var/rnotwhite",
	"./var/hasOwn",
	"./var/slice",
	"./event/support",
	"./data/var/data_priv",

	"./core/init",
	"./data/accepts",
	"./selector"
], function( jQuery, strundefined, rnotwhite, hasOwn, slice, support, data_priv ) ***REMOVED***

var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() ***REMOVED***
	return true;
***REMOVED***

function returnFalse() ***REMOVED***
	return false;
***REMOVED***

function safeActiveElement() ***REMOVED***
	try ***REMOVED***
		return document.activeElement;
	***REMOVED*** catch ( err ) ***REMOVED*** ***REMOVED***
***REMOVED***

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = ***REMOVED***

	global: ***REMOVED******REMOVED***,

	add: function( elem, types, handler, data, selector ) ***REMOVED***

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) ***REMOVED***
			return;
		***REMOVED***

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) ***REMOVED***
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		***REMOVED***

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) ***REMOVED***
			handler.guid = jQuery.guid++;
		***REMOVED***

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) ***REMOVED***
			events = elemData.events = ***REMOVED******REMOVED***;
		***REMOVED***
		if ( !(eventHandle = elemData.handle) ) ***REMOVED***
			eventHandle = elemData.handle = function( e ) ***REMOVED***
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			***REMOVED***;
		***REMOVED***

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) ***REMOVED***
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) ***REMOVED***
				continue;
			***REMOVED***

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || ***REMOVED******REMOVED***;

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || ***REMOVED******REMOVED***;

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend(***REMOVED***
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			***REMOVED***, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) ***REMOVED***
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) ***REMOVED***
					if ( elem.addEventListener ) ***REMOVED***
						elem.addEventListener( type, eventHandle, false );
					***REMOVED***
				***REMOVED***
			***REMOVED***

			if ( special.add ) ***REMOVED***
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) ***REMOVED***
					handleObj.handler.guid = handler.guid;
				***REMOVED***
			***REMOVED***

			// Add to the element's handler list, delegates in front
			if ( selector ) ***REMOVED***
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			***REMOVED*** else ***REMOVED***
				handlers.push( handleObj );
			***REMOVED***

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		***REMOVED***

	***REMOVED***,

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) ***REMOVED***

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) ***REMOVED***
			return;
		***REMOVED***

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) ***REMOVED***
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) ***REMOVED***
				for ( type in events ) ***REMOVED***
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				***REMOVED***
				continue;
			***REMOVED***

			special = jQuery.event.special[ type ] || ***REMOVED******REMOVED***;
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) ***REMOVED***
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) ***REMOVED***
					handlers.splice( j, 1 );

					if ( handleObj.selector ) ***REMOVED***
						handlers.delegateCount--;
					***REMOVED***
					if ( special.remove ) ***REMOVED***
						special.remove.call( elem, handleObj );
					***REMOVED***
				***REMOVED***
			***REMOVED***

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) ***REMOVED***
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) ***REMOVED***
					jQuery.removeEvent( elem, type, elemData.handle );
				***REMOVED***

				delete events[ type ];
			***REMOVED***
		***REMOVED***

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) ***REMOVED***
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		***REMOVED***
	***REMOVED***,

	trigger: function( event, data, elem, onlyHandlers ) ***REMOVED***

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) ***REMOVED***
			return;
		***REMOVED***

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) ***REMOVED***
			return;
		***REMOVED***

		if ( type.indexOf(".") >= 0 ) ***REMOVED***
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		***REMOVED***
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) ***REMOVED***
			event.target = elem;
		***REMOVED***

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || ***REMOVED******REMOVED***;
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) ***REMOVED***
			return;
		***REMOVED***

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) ***REMOVED***

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) ***REMOVED***
				cur = cur.parentNode;
			***REMOVED***
			for ( ; cur; cur = cur.parentNode ) ***REMOVED***
				eventPath.push( cur );
				tmp = cur;
			***REMOVED***

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) ***REMOVED***
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			***REMOVED***
		***REMOVED***

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) ***REMOVED***

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || ***REMOVED******REMOVED*** )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) ***REMOVED***
				handle.apply( cur, data );
			***REMOVED***

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) ***REMOVED***
				event.result = handle.apply( cur, data );
				if ( event.result === false ) ***REMOVED***
					event.preventDefault();
				***REMOVED***
			***REMOVED***
		***REMOVED***
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) ***REMOVED***

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) ***REMOVED***

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) ***REMOVED***

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) ***REMOVED***
						elem[ ontype ] = null;
					***REMOVED***

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) ***REMOVED***
						elem[ ontype ] = tmp;
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***

		return event.result;
	***REMOVED***,

	dispatch: function( event ) ***REMOVED***

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || ***REMOVED******REMOVED*** )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || ***REMOVED******REMOVED***;

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) ***REMOVED***
			return;
		***REMOVED***

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) ***REMOVED***
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) ***REMOVED***

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) ***REMOVED***

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || ***REMOVED******REMOVED***).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) ***REMOVED***
						if ( (event.result = ret) === false ) ***REMOVED***
							event.preventDefault();
							event.stopPropagation();
						***REMOVED***
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) ***REMOVED***
			special.postDispatch.call( this, event );
		***REMOVED***

		return event.result;
	***REMOVED***,

	handlers: function( event, handlers ) ***REMOVED***
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) ***REMOVED***

			for ( ; cur !== this; cur = cur.parentNode || this ) ***REMOVED***

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) ***REMOVED***
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) ***REMOVED***
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) ***REMOVED***
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						***REMOVED***
						if ( matches[ sel ] ) ***REMOVED***
							matches.push( handleObj );
						***REMOVED***
					***REMOVED***
					if ( matches.length ) ***REMOVED***
						handlerQueue.push(***REMOVED*** elem: cur, handlers: matches ***REMOVED***);
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) ***REMOVED***
			handlerQueue.push(***REMOVED*** elem: this, handlers: handlers.slice( delegateCount ) ***REMOVED***);
		***REMOVED***

		return handlerQueue;
	***REMOVED***,

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: ***REMOVED******REMOVED***,

	keyHooks: ***REMOVED***
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) ***REMOVED***

			// Add which for key events
			if ( event.which == null ) ***REMOVED***
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			***REMOVED***

			return event;
		***REMOVED***
	***REMOVED***,

	mouseHooks: ***REMOVED***
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) ***REMOVED***
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) ***REMOVED***
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			***REMOVED***

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) ***REMOVED***
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			***REMOVED***

			return event;
		***REMOVED***
	***REMOVED***,

	fix: function( event ) ***REMOVED***
		if ( event[ jQuery.expando ] ) ***REMOVED***
			return event;
		***REMOVED***

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) ***REMOVED***
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				***REMOVED******REMOVED***;
		***REMOVED***
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) ***REMOVED***
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		***REMOVED***

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) ***REMOVED***
			event.target = document;
		***REMOVED***

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) ***REMOVED***
			event.target = event.target.parentNode;
		***REMOVED***

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	***REMOVED***,

	special: ***REMOVED***
		load: ***REMOVED***
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		***REMOVED***,
		focus: ***REMOVED***
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() ***REMOVED***
				if ( this !== safeActiveElement() && this.focus ) ***REMOVED***
					this.focus();
					return false;
				***REMOVED***
			***REMOVED***,
			delegateType: "focusin"
		***REMOVED***,
		blur: ***REMOVED***
			trigger: function() ***REMOVED***
				if ( this === safeActiveElement() && this.blur ) ***REMOVED***
					this.blur();
					return false;
				***REMOVED***
			***REMOVED***,
			delegateType: "focusout"
		***REMOVED***,
		click: ***REMOVED***
			// For checkbox, fire native event so checked state will be right
			trigger: function() ***REMOVED***
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) ***REMOVED***
					this.click();
					return false;
				***REMOVED***
			***REMOVED***,

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) ***REMOVED***
				return jQuery.nodeName( event.target, "a" );
			***REMOVED***
		***REMOVED***,

		beforeunload: ***REMOVED***
			postDispatch: function( event ) ***REMOVED***

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) ***REMOVED***
					event.originalEvent.returnValue = event.result;
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	simulate: function( type, elem, event, bubble ) ***REMOVED***
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			***REMOVED***
				type: type,
				isSimulated: true,
				originalEvent: ***REMOVED******REMOVED***
			***REMOVED***
		);
		if ( bubble ) ***REMOVED***
			jQuery.event.trigger( e, null, elem );
		***REMOVED*** else ***REMOVED***
			jQuery.event.dispatch.call( elem, e );
		***REMOVED***
		if ( e.isDefaultPrevented() ) ***REMOVED***
			event.preventDefault();
		***REMOVED***
	***REMOVED***
***REMOVED***;

jQuery.removeEvent = function( elem, type, handle ) ***REMOVED***
	if ( elem.removeEventListener ) ***REMOVED***
		elem.removeEventListener( type, handle, false );
	***REMOVED***
***REMOVED***;

jQuery.Event = function( src, props ) ***REMOVED***
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) ***REMOVED***
		return new jQuery.Event( src, props );
	***REMOVED***

	// Event object
	if ( src && src.type ) ***REMOVED***
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	***REMOVED*** else ***REMOVED***
		this.type = src;
	***REMOVED***

	// Put explicitly provided properties onto the event object
	if ( props ) ***REMOVED***
		jQuery.extend( this, props );
	***REMOVED***

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
***REMOVED***;

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = ***REMOVED***
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() ***REMOVED***
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) ***REMOVED***
			e.preventDefault();
		***REMOVED***
	***REMOVED***,
	stopPropagation: function() ***REMOVED***
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) ***REMOVED***
			e.stopPropagation();
		***REMOVED***
	***REMOVED***,
	stopImmediatePropagation: function() ***REMOVED***
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) ***REMOVED***
			e.stopImmediatePropagation();
		***REMOVED***

		this.stopPropagation();
	***REMOVED***
***REMOVED***;

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each(***REMOVED***
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
***REMOVED***, function( orig, fix ) ***REMOVED***
	jQuery.event.special[ orig ] = ***REMOVED***
		delegateType: fix,
		bindType: fix,

		handle: function( event ) ***REMOVED***
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) ***REMOVED***
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			***REMOVED***
			return ret;
		***REMOVED***
	***REMOVED***;
***REMOVED***);

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) ***REMOVED***
	jQuery.each(***REMOVED*** focus: "focusin", blur: "focusout" ***REMOVED***, function( orig, fix ) ***REMOVED***

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) ***REMOVED***
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			***REMOVED***;

		jQuery.event.special[ fix ] = ***REMOVED***
			setup: function() ***REMOVED***
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) ***REMOVED***
					doc.addEventListener( orig, handler, true );
				***REMOVED***
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			***REMOVED***,
			teardown: function() ***REMOVED***
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) ***REMOVED***
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				***REMOVED*** else ***REMOVED***
					data_priv.access( doc, fix, attaches );
				***REMOVED***
			***REMOVED***
		***REMOVED***;
	***REMOVED***);
***REMOVED***

jQuery.fn.extend(***REMOVED***

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) ***REMOVED***
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) ***REMOVED***
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) ***REMOVED***
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			***REMOVED***
			for ( type in types ) ***REMOVED***
				this.on( type, selector, data, types[ type ], one );
			***REMOVED***
			return this;
		***REMOVED***

		if ( data == null && fn == null ) ***REMOVED***
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		***REMOVED*** else if ( fn == null ) ***REMOVED***
			if ( typeof selector === "string" ) ***REMOVED***
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			***REMOVED*** else ***REMOVED***
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			***REMOVED***
		***REMOVED***
		if ( fn === false ) ***REMOVED***
			fn = returnFalse;
		***REMOVED*** else if ( !fn ) ***REMOVED***
			return this;
		***REMOVED***

		if ( one === 1 ) ***REMOVED***
			origFn = fn;
			fn = function( event ) ***REMOVED***
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			***REMOVED***;
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		***REMOVED***
		return this.each( function() ***REMOVED***
			jQuery.event.add( this, types, fn, data, selector );
		***REMOVED***);
	***REMOVED***,
	one: function( types, selector, data, fn ) ***REMOVED***
		return this.on( types, selector, data, fn, 1 );
	***REMOVED***,
	off: function( types, selector, fn ) ***REMOVED***
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) ***REMOVED***
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		***REMOVED***
		if ( typeof types === "object" ) ***REMOVED***
			// ( types-object [, selector] )
			for ( type in types ) ***REMOVED***
				this.off( type, selector, types[ type ] );
			***REMOVED***
			return this;
		***REMOVED***
		if ( selector === false || typeof selector === "function" ) ***REMOVED***
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		***REMOVED***
		if ( fn === false ) ***REMOVED***
			fn = returnFalse;
		***REMOVED***
		return this.each(function() ***REMOVED***
			jQuery.event.remove( this, types, fn, selector );
		***REMOVED***);
	***REMOVED***,

	trigger: function( type, data ) ***REMOVED***
		return this.each(function() ***REMOVED***
			jQuery.event.trigger( type, data, this );
		***REMOVED***);
	***REMOVED***,
	triggerHandler: function( type, data ) ***REMOVED***
		var elem = this[0];
		if ( elem ) ***REMOVED***
			return jQuery.event.trigger( type, data, elem, true );
		***REMOVED***
	***REMOVED***
***REMOVED***);

return jQuery;
***REMOVED***);
