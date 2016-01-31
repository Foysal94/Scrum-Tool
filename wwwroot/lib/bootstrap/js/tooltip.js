/* ========================================================================
 * Bootstrap: tooltip.js v3.3.5
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) ***REMOVED***
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) ***REMOVED***
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  ***REMOVED***

  Tooltip.VERSION  = '3.3.5'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = ***REMOVED***
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: ***REMOVED***
      selector: 'body',
      padding: 0
***REMOVED***
  ***REMOVED***

  Tooltip.prototype.init = function (type, element, options) ***REMOVED***
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = ***REMOVED*** click: false, hover: false, focus: false ***REMOVED***

    if (this.$element[0] instanceof document.constructor && !this.options.selector) ***REMOVED***
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
***REMOVED***

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) ***REMOVED***
      var trigger = triggers[i]

      if (trigger == 'click') ***REMOVED***
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
  ***REMOVED*** else if (trigger != 'manual') ***REMOVED***
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
  ***REMOVED***
***REMOVED***

    this.options.selector ?
      (this._options = $.extend(***REMOVED******REMOVED***, this.options, ***REMOVED*** trigger: 'manual', selector: '' ***REMOVED***)) :
      this.fixTitle()
  ***REMOVED***

  Tooltip.prototype.getDefaults = function () ***REMOVED***
    return Tooltip.DEFAULTS
  ***REMOVED***

  Tooltip.prototype.getOptions = function (options) ***REMOVED***
    options = $.extend(***REMOVED******REMOVED***, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') ***REMOVED***
      options.delay = ***REMOVED***
        show: options.delay,
        hide: options.delay
  ***REMOVED***
***REMOVED***

    return options
  ***REMOVED***

  Tooltip.prototype.getDelegateOptions = function () ***REMOVED***
    var options  = ***REMOVED******REMOVED***
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) ***REMOVED***
      if (defaults[key] != value) options[key] = value
***REMOVED***)

    return options
  ***REMOVED***

  Tooltip.prototype.enter = function (obj) ***REMOVED***
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) ***REMOVED***
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
***REMOVED***

    if (obj instanceof $.Event) ***REMOVED***
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
***REMOVED***

    if (self.tip().hasClass('in') || self.hoverState == 'in') ***REMOVED***
      self.hoverState = 'in'
      return
***REMOVED***

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () ***REMOVED***
      if (self.hoverState == 'in') self.show()
***REMOVED***, self.options.delay.show)
  ***REMOVED***

  Tooltip.prototype.isInStateTrue = function () ***REMOVED***
    for (var key in this.inState) ***REMOVED***
      if (this.inState[key]) return true
***REMOVED***

    return false
  ***REMOVED***

  Tooltip.prototype.leave = function (obj) ***REMOVED***
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) ***REMOVED***
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
***REMOVED***

    if (obj instanceof $.Event) ***REMOVED***
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
***REMOVED***

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () ***REMOVED***
      if (self.hoverState == 'out') self.hide()
***REMOVED***, self.options.delay.hide)
  ***REMOVED***

  Tooltip.prototype.show = function () ***REMOVED***
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) ***REMOVED***
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css(***REMOVED*** top: 0, left: 0, display: 'block' ***REMOVED***)
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) ***REMOVED***
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
  ***REMOVED***

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () ***REMOVED***
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
  ***REMOVED***

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
***REMOVED***
  ***REMOVED***

  Tooltip.prototype.applyPlacement = function (offset, placement) ***REMOVED***
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend(***REMOVED***
      using: function (props) ***REMOVED***
        $tip.css(***REMOVED***
          top: Math.round(props.top),
          left: Math.round(props.left)
***REMOVED***)
  ***REMOVED***
***REMOVED***, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) ***REMOVED***
      offset.top = offset.top + height - actualHeight
***REMOVED***

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  ***REMOVED***

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) ***REMOVED***
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  ***REMOVED***

  Tooltip.prototype.setContent = function () ***REMOVED***
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  ***REMOVED***

  Tooltip.prototype.hide = function (callback) ***REMOVED***
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() ***REMOVED***
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
***REMOVED***

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  ***REMOVED***

  Tooltip.prototype.fixTitle = function () ***REMOVED***
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') ***REMOVED***
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
***REMOVED***
  ***REMOVED***

  Tooltip.prototype.hasContent = function () ***REMOVED***
    return this.getTitle()
  ***REMOVED***

  Tooltip.prototype.getPosition = function ($element) ***REMOVED***
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) ***REMOVED***
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend(***REMOVED******REMOVED***, elRect, ***REMOVED*** width: elRect.right - elRect.left, height: elRect.bottom - elRect.top ***REMOVED***)
***REMOVED***
    var elOffset  = isBody ? ***REMOVED*** top: 0, left: 0 ***REMOVED*** : $element.offset()
    var scroll    = ***REMOVED*** scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() ***REMOVED***
    var outerDims = isBody ? ***REMOVED*** width: $(window).width(), height: $(window).height() ***REMOVED*** : null

    return $.extend(***REMOVED******REMOVED***, elRect, scroll, outerDims, elOffset)
  ***REMOVED***

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) ***REMOVED***
    return placement == 'bottom' ? ***REMOVED*** top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 ***REMOVED*** :
           placement == 'top'    ? ***REMOVED*** top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 ***REMOVED*** :
           placement == 'left'   ? ***REMOVED*** top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth ***REMOVED*** :
        /* placement == 'right' */ ***REMOVED*** top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width ***REMOVED***

  ***REMOVED***

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) ***REMOVED***
    var delta = ***REMOVED*** top: 0, left: 0 ***REMOVED***
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) ***REMOVED***
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) ***REMOVED*** // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
  ***REMOVED*** else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) ***REMOVED*** // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
  ***REMOVED***
***REMOVED*** else ***REMOVED***
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) ***REMOVED*** // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
  ***REMOVED*** else if (rightEdgeOffset > viewportDimensions.right) ***REMOVED*** // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
  ***REMOVED***
***REMOVED***

    return delta
  ***REMOVED***

  Tooltip.prototype.getTitle = function () ***REMOVED***
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  ***REMOVED***

  Tooltip.prototype.getUID = function (prefix) ***REMOVED***
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  ***REMOVED***

  Tooltip.prototype.tip = function () ***REMOVED***
    if (!this.$tip) ***REMOVED***
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) ***REMOVED***
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
  ***REMOVED***
***REMOVED***
    return this.$tip
  ***REMOVED***

  Tooltip.prototype.arrow = function () ***REMOVED***
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  ***REMOVED***

  Tooltip.prototype.enable = function () ***REMOVED***
    this.enabled = true
  ***REMOVED***

  Tooltip.prototype.disable = function () ***REMOVED***
    this.enabled = false
  ***REMOVED***

  Tooltip.prototype.toggleEnabled = function () ***REMOVED***
    this.enabled = !this.enabled
  ***REMOVED***

  Tooltip.prototype.toggle = function (e) ***REMOVED***
    var self = this
    if (e) ***REMOVED***
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) ***REMOVED***
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
  ***REMOVED***
***REMOVED***

    if (e) ***REMOVED***
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
***REMOVED*** else ***REMOVED***
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
***REMOVED***
  ***REMOVED***

  Tooltip.prototype.destroy = function () ***REMOVED***
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () ***REMOVED***
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) ***REMOVED***
        that.$tip.detach()
  ***REMOVED***
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
***REMOVED***)
  ***REMOVED***


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) ***REMOVED***
    return this.each(function () ***REMOVED***
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
***REMOVED***)
  ***REMOVED***

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () ***REMOVED***
    $.fn.tooltip = old
    return this
  ***REMOVED***

***REMOVED***(jQuery);
