/* ========================================================================
 * Bootstrap: transition.js v3.3.5
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) ***REMOVED***
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() ***REMOVED***
    var el = document.createElement('bootstrap')

    var transEndEventNames = ***REMOVED***
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
***REMOVED***

    for (var name in transEndEventNames) ***REMOVED***
      if (el.style[name] !== undefined) ***REMOVED***
        return ***REMOVED*** end: transEndEventNames[name] ***REMOVED***
  ***REMOVED***
***REMOVED***

    return false // explicit for ie8 (  ._.)
  ***REMOVED***

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) ***REMOVED***
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () ***REMOVED*** called = true ***REMOVED***)
    var callback = function () ***REMOVED*** if (!called) $($el).trigger($.support.transition.end) ***REMOVED***
    setTimeout(callback, duration)
    return this
  ***REMOVED***

  $(function () ***REMOVED***
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = ***REMOVED***
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) ***REMOVED***
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
  ***REMOVED***
***REMOVED***
  ***REMOVED***)

***REMOVED***(jQuery);
