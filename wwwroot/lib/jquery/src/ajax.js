define([
	"./core",
	"./var/rnotwhite",
	"./ajax/var/nonce",
	"./ajax/var/rquery",
	"./core/init",
	"./ajax/parseJSON",
	"./ajax/parseXML",
	"./deferred"
], function( jQuery, rnotwhite, nonce, rquery ) ***REMOVED***

var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = ***REMOVED******REMOVED***,

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = ***REMOVED******REMOVED***,

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) ***REMOVED***

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) ***REMOVED***

		if ( typeof dataTypeExpression !== "string" ) ***REMOVED***
			func = dataTypeExpression;
			dataTypeExpression = "*";
		***REMOVED***

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) ***REMOVED***
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) ***REMOVED***
				// Prepend if requested
				if ( dataType[0] === "+" ) ***REMOVED***
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				***REMOVED*** else ***REMOVED***
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***;
***REMOVED***

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) ***REMOVED***

	var inspected = ***REMOVED******REMOVED***,
		seekingTransport = ( structure === transports );

	function inspect( dataType ) ***REMOVED***
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) ***REMOVED***
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) ***REMOVED***
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			***REMOVED*** else if ( seekingTransport ) ***REMOVED***
				return !( selected = dataTypeOrTransport );
			***REMOVED***
		***REMOVED***);
		return selected;
	***REMOVED***

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
***REMOVED***

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) ***REMOVED***
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || ***REMOVED******REMOVED***;

	for ( key in src ) ***REMOVED***
		if ( src[ key ] !== undefined ) ***REMOVED***
			( flatOptions[ key ] ? target : ( deep || (deep = ***REMOVED******REMOVED***) ) )[ key ] = src[ key ];
		***REMOVED***
	***REMOVED***
	if ( deep ) ***REMOVED***
		jQuery.extend( true, target, deep );
	***REMOVED***

	return target;
***REMOVED***

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) ***REMOVED***

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) ***REMOVED***
		dataTypes.shift();
		if ( ct === undefined ) ***REMOVED***
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		***REMOVED***
	***REMOVED***

	// Check if we're dealing with a known content-type
	if ( ct ) ***REMOVED***
		for ( type in contents ) ***REMOVED***
			if ( contents[ type ] && contents[ type ].test( ct ) ) ***REMOVED***
				dataTypes.unshift( type );
				break;
			***REMOVED***
		***REMOVED***
	***REMOVED***

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) ***REMOVED***
		finalDataType = dataTypes[ 0 ];
	***REMOVED*** else ***REMOVED***
		// Try convertible dataTypes
		for ( type in responses ) ***REMOVED***
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) ***REMOVED***
				finalDataType = type;
				break;
			***REMOVED***
			if ( !firstDataType ) ***REMOVED***
				firstDataType = type;
			***REMOVED***
		***REMOVED***
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	***REMOVED***

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) ***REMOVED***
		if ( finalDataType !== dataTypes[ 0 ] ) ***REMOVED***
			dataTypes.unshift( finalDataType );
		***REMOVED***
		return responses[ finalDataType ];
	***REMOVED***
***REMOVED***

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) ***REMOVED***
	var conv2, current, conv, tmp, prev,
		converters = ***REMOVED******REMOVED***,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) ***REMOVED***
		for ( conv in s.converters ) ***REMOVED***
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		***REMOVED***
	***REMOVED***

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) ***REMOVED***

		if ( s.responseFields[ current ] ) ***REMOVED***
			jqXHR[ s.responseFields[ current ] ] = response;
		***REMOVED***

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) ***REMOVED***
			response = s.dataFilter( response, s.dataType );
		***REMOVED***

		prev = current;
		current = dataTypes.shift();

		if ( current ) ***REMOVED***

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) ***REMOVED***

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			***REMOVED*** else if ( prev !== "*" && prev !== current ) ***REMOVED***

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) ***REMOVED***
					for ( conv2 in converters ) ***REMOVED***

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) ***REMOVED***

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) ***REMOVED***
								// Condense equivalence converters
								if ( conv === true ) ***REMOVED***
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								***REMOVED*** else if ( converters[ conv2 ] !== true ) ***REMOVED***
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								***REMOVED***
								break;
							***REMOVED***
						***REMOVED***
					***REMOVED***
				***REMOVED***

				// Apply converter (if not an equivalence)
				if ( conv !== true ) ***REMOVED***

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) ***REMOVED***
						response = conv( response );
					***REMOVED*** else ***REMOVED***
						try ***REMOVED***
							response = conv( response );
						***REMOVED*** catch ( e ) ***REMOVED***
							return ***REMOVED*** state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current ***REMOVED***;
						***REMOVED***
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return ***REMOVED*** state: "success", data: response ***REMOVED***;
***REMOVED***

jQuery.extend(***REMOVED***

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: ***REMOVED******REMOVED***,
	etag: ***REMOVED******REMOVED***,

	ajaxSettings: ***REMOVED***
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: ***REMOVED******REMOVED***,
		*/

		accepts: ***REMOVED***
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		***REMOVED***,

		contents: ***REMOVED***
			xml: /xml/,
			html: /html/,
			json: /json/
		***REMOVED***,

		responseFields: ***REMOVED***
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		***REMOVED***,

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: ***REMOVED***

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		***REMOVED***,

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: ***REMOVED***
			url: true,
			context: true
		***REMOVED***
	***REMOVED***,

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) ***REMOVED***
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	***REMOVED***,

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) ***REMOVED***

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) ***REMOVED***
			options = url;
			url = undefined;
		***REMOVED***

		// Force options to be an object
		options = options || ***REMOVED******REMOVED***;

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( ***REMOVED******REMOVED***, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || ***REMOVED******REMOVED***,
			// Headers (they are sent all at once)
			requestHeaders = ***REMOVED******REMOVED***,
			requestHeadersNames = ***REMOVED******REMOVED***,
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = ***REMOVED***
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) ***REMOVED***
					var match;
					if ( state === 2 ) ***REMOVED***
						if ( !responseHeaders ) ***REMOVED***
							responseHeaders = ***REMOVED******REMOVED***;
							while ( (match = rheaders.exec( responseHeadersString )) ) ***REMOVED***
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							***REMOVED***
						***REMOVED***
						match = responseHeaders[ key.toLowerCase() ];
					***REMOVED***
					return match == null ? null : match;
				***REMOVED***,

				// Raw string
				getAllResponseHeaders: function() ***REMOVED***
					return state === 2 ? responseHeadersString : null;
				***REMOVED***,

				// Caches the header
				setRequestHeader: function( name, value ) ***REMOVED***
					var lname = name.toLowerCase();
					if ( !state ) ***REMOVED***
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					***REMOVED***
					return this;
				***REMOVED***,

				// Overrides response content-type header
				overrideMimeType: function( type ) ***REMOVED***
					if ( !state ) ***REMOVED***
						s.mimeType = type;
					***REMOVED***
					return this;
				***REMOVED***,

				// Status-dependent callbacks
				statusCode: function( map ) ***REMOVED***
					var code;
					if ( map ) ***REMOVED***
						if ( state < 2 ) ***REMOVED***
							for ( code in map ) ***REMOVED***
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							***REMOVED***
						***REMOVED*** else ***REMOVED***
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						***REMOVED***
					***REMOVED***
					return this;
				***REMOVED***,

				// Cancel the request
				abort: function( statusText ) ***REMOVED***
					var finalText = statusText || strAbort;
					if ( transport ) ***REMOVED***
						transport.abort( finalText );
					***REMOVED***
					done( 0, finalText );
					return this;
				***REMOVED***
			***REMOVED***;

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) ***REMOVED***
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		***REMOVED***

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) ***REMOVED***
			s.data = jQuery.param( s.data, s.traditional );
		***REMOVED***

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) ***REMOVED***
			return jqXHR;
		***REMOVED***

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) ***REMOVED***
			jQuery.event.trigger("ajaxStart");
		***REMOVED***

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) ***REMOVED***

			// If data is available, append data to url
			if ( s.data ) ***REMOVED***
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			***REMOVED***

			// Add anti-cache in url if needed
			if ( s.cache === false ) ***REMOVED***
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			***REMOVED***
		***REMOVED***

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) ***REMOVED***
			if ( jQuery.lastModified[ cacheURL ] ) ***REMOVED***
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			***REMOVED***
			if ( jQuery.etag[ cacheURL ] ) ***REMOVED***
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			***REMOVED***
		***REMOVED***

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) ***REMOVED***
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		***REMOVED***

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) ***REMOVED***
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		***REMOVED***

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) ***REMOVED***
			// Abort if not done already and return
			return jqXHR.abort();
		***REMOVED***

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in ***REMOVED*** success: 1, error: 1, complete: 1 ***REMOVED*** ) ***REMOVED***
			jqXHR[ i ]( s[ i ] );
		***REMOVED***

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) ***REMOVED***
			done( -1, "No Transport" );
		***REMOVED*** else ***REMOVED***
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) ***REMOVED***
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			***REMOVED***
			// Timeout
			if ( s.async && s.timeout > 0 ) ***REMOVED***
				timeoutTimer = setTimeout(function() ***REMOVED***
					jqXHR.abort("timeout");
				***REMOVED***, s.timeout );
			***REMOVED***

			try ***REMOVED***
				state = 1;
				transport.send( requestHeaders, done );
			***REMOVED*** catch ( e ) ***REMOVED***
				// Propagate exception as error if not done
				if ( state < 2 ) ***REMOVED***
					done( -1, e );
				// Simply rethrow otherwise
				***REMOVED*** else ***REMOVED***
					throw e;
				***REMOVED***
			***REMOVED***
		***REMOVED***

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) ***REMOVED***
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) ***REMOVED***
				return;
			***REMOVED***

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) ***REMOVED***
				clearTimeout( timeoutTimer );
			***REMOVED***

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) ***REMOVED***
				response = ajaxHandleResponses( s, jqXHR, responses );
			***REMOVED***

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) ***REMOVED***

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) ***REMOVED***
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) ***REMOVED***
						jQuery.lastModified[ cacheURL ] = modified;
					***REMOVED***
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) ***REMOVED***
						jQuery.etag[ cacheURL ] = modified;
					***REMOVED***
				***REMOVED***

				// if no content
				if ( status === 204 || s.type === "HEAD" ) ***REMOVED***
					statusText = "nocontent";

				// if not modified
				***REMOVED*** else if ( status === 304 ) ***REMOVED***
					statusText = "notmodified";

				// If we have data, let's convert it
				***REMOVED*** else ***REMOVED***
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				***REMOVED***
			***REMOVED*** else ***REMOVED***
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) ***REMOVED***
					statusText = "error";
					if ( status < 0 ) ***REMOVED***
						status = 0;
					***REMOVED***
				***REMOVED***
			***REMOVED***

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) ***REMOVED***
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			***REMOVED*** else ***REMOVED***
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			***REMOVED***

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) ***REMOVED***
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			***REMOVED***

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) ***REMOVED***
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) ***REMOVED***
					jQuery.event.trigger("ajaxStop");
				***REMOVED***
			***REMOVED***
		***REMOVED***

		return jqXHR;
	***REMOVED***,

	getJSON: function( url, data, callback ) ***REMOVED***
		return jQuery.get( url, data, callback, "json" );
	***REMOVED***,

	getScript: function( url, callback ) ***REMOVED***
		return jQuery.get( url, undefined, callback, "script" );
	***REMOVED***
***REMOVED***);

jQuery.each( [ "get", "post" ], function( i, method ) ***REMOVED***
	jQuery[ method ] = function( url, data, callback, type ) ***REMOVED***
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) ***REMOVED***
			type = type || callback;
			callback = data;
			data = undefined;
		***REMOVED***

		return jQuery.ajax(***REMOVED***
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		***REMOVED***);
	***REMOVED***;
***REMOVED***);

return jQuery;
***REMOVED***);
