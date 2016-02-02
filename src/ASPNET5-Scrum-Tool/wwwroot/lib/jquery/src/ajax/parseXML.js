define([
	"../core"
], function( jQuery ) ***REMOVED***

// Cross-browser xml parsing
jQuery.parseXML = function( data ) ***REMOVED***
	var xml, tmp;
	if ( !data || typeof data !== "string" ) ***REMOVED***
		return null;
	***REMOVED***

	// Support: IE9
	try ***REMOVED***
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	***REMOVED*** catch ( e ) ***REMOVED***
		xml = undefined;
	***REMOVED***

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) ***REMOVED***
		jQuery.error( "Invalid XML: " + data );
	***REMOVED***
	return xml;
***REMOVED***;

return jQuery.parseXML;

***REMOVED***);
