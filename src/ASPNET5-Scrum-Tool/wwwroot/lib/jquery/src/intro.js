/*!
 * jQuery JavaScript Library v@VERSION
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: @DATE
 */

(function( global, factory ) ***REMOVED***

	if ( typeof module === "object" && typeof module.exports === "object" ) ***REMOVED***
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) ***REMOVED***
				if ( !w.document ) ***REMOVED***
					throw new Error( "jQuery requires a window with a document" );
				***REMOVED***
				return factory( w );
			***REMOVED***;
	***REMOVED*** else ***REMOVED***
		factory( global );
	***REMOVED***

// Pass this if window is not defined yet
***REMOVED***(typeof window !== "undefined" ? window : this, function( window, noGlobal ) ***REMOVED***

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";