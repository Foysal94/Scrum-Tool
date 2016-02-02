/* ========================================================================
 * Bootstrap: affix.js v3.3.5
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) ***REMOVED***
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) ***REMOVED***
    this.options = $.extend(***REMOVED******REMOVED***, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  ***REMOVED***

  Affix.VERSION  = '3.3.5'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = ***REMOVED***
    offset: 0,
    target: window
  ***REMOVED***

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) ***REMOVED***
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') ***REMOVED***
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
***REMOVED***

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  ***REMOVED***

  Affix.prototype.getPinnedOffset = function () ***REMOVED***
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  ***REMOVED***

  Affix.prototype.checkPositionWithEventLoop = function () ***REMOVED***
    setTimeout($.proxy(this.checkPosition, this), 1)
  ***REMOVED***

  Affix.prototype.checkPosition = function () ***REMOVED***
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) ***REMOVED***
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
***REMOVED***

    if (affix == 'bottom') ***REMOVED***
      this.$element.offset(***REMOVED***
        top: scrollHeight - height - offsetBottom
  ***REMOVED***)
***REMOVED***
  ***REMOVED***


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) ***REMOVED***
    return this.each(function () ***REMOVED***
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
***REMOVED***)
  ***REMOVED***

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () ***REMOVED***
    $.fn.affix = old
    return this
  ***REMOVED***


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () ***REMOVED***
    $('[data-spy="affix"]').each(function () ***REMOVED***
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || ***REMOVED******REMOVED***

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
***REMOVED***)
  ***REMOVED***)

***REMOVED***(jQuery);
