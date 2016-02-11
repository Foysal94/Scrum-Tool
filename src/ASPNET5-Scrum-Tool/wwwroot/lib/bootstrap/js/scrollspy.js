/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.5
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) ***REMOVED***
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) ***REMOVED***
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend(***REMOVED******REMOVED***, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  ***REMOVED***

  ScrollSpy.VERSION  = '3.3.5'

  ScrollSpy.DEFAULTS = ***REMOVED***
    offset: 10
  ***REMOVED***

  ScrollSpy.prototype.getScrollHeight = function () ***REMOVED***
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  ***REMOVED***

  ScrollSpy.prototype.refresh = function () ***REMOVED***
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) ***REMOVED***
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
***REMOVED***

    this.$body
      .find(this.selector)
      .map(function () ***REMOVED***
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
  ***REMOVED***)
      .sort(function (a, b) ***REMOVED*** return a[0] - b[0] ***REMOVED***)
      .each(function () ***REMOVED***
        that.offsets.push(this[0])
        that.targets.push(this[1])
  ***REMOVED***)
  ***REMOVED***

  ScrollSpy.prototype.process = function () ***REMOVED***
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) ***REMOVED***
      this.refresh()
***REMOVED***

    if (scrollTop >= maxScroll) ***REMOVED***
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
***REMOVED***

    if (activeTarget && scrollTop < offsets[0]) ***REMOVED***
      this.activeTarget = null
      return this.clear()
***REMOVED***

    for (i = offsets.length; i--;) ***REMOVED***
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
***REMOVED***
  ***REMOVED***

  ScrollSpy.prototype.activate = function (target) ***REMOVED***
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) ***REMOVED***
      active = active
        .closest('li.dropdown')
        .addClass('active')
***REMOVED***

    active.trigger('activate.bs.scrollspy')
  ***REMOVED***

  ScrollSpy.prototype.clear = function () ***REMOVED***
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  ***REMOVED***


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) ***REMOVED***
    return this.each(function () ***REMOVED***
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
***REMOVED***)
  ***REMOVED***

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () ***REMOVED***
    $.fn.scrollspy = old
    return this
  ***REMOVED***


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () ***REMOVED***
    $('[data-spy="scroll"]').each(function () ***REMOVED***
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
***REMOVED***)
  ***REMOVED***)

***REMOVED***(jQuery);
