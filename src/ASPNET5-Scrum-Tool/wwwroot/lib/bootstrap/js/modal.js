/* ========================================================================
 * Bootstrap: modal.js v3.3.5
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) ***REMOVED***
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) ***REMOVED***
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) ***REMOVED***
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () ***REMOVED***
          this.$element.trigger('loaded.bs.modal')
***REMOVED***, this))
***REMOVED***
  ***REMOVED***

  Modal.VERSION  = '3.3.5'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = ***REMOVED***
    backdrop: true,
    keyboard: true,
    show: true
  ***REMOVED***

  Modal.prototype.toggle = function (_relatedTarget) ***REMOVED***
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  ***REMOVED***

  Modal.prototype.show = function (_relatedTarget) ***REMOVED***
    var that = this
    var e    = $.Event('show.bs.modal', ***REMOVED*** relatedTarget: _relatedTarget ***REMOVED***)

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () ***REMOVED***
      that.$element.one('mouseup.dismiss.bs.modal', function (e) ***REMOVED***
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
  ***REMOVED***)
***REMOVED***)

    this.backdrop(function () ***REMOVED***
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) ***REMOVED***
        that.$element.appendTo(that.$body) // don't move modals dom position
  ***REMOVED***

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) ***REMOVED***
        that.$element[0].offsetWidth // force reflow
  ***REMOVED***

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', ***REMOVED*** relatedTarget: _relatedTarget ***REMOVED***)

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () ***REMOVED***
            that.$element.trigger('focus').trigger(e)
  ***REMOVED***)
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
***REMOVED***)
  ***REMOVED***

  Modal.prototype.hide = function (e) ***REMOVED***
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  ***REMOVED***

  Modal.prototype.enforceFocus = function () ***REMOVED***
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) ***REMOVED***
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) ***REMOVED***
          this.$element.trigger('focus')
***REMOVED***
  ***REMOVED***, this))
  ***REMOVED***

  Modal.prototype.escape = function () ***REMOVED***
    if (this.isShown && this.options.keyboard) ***REMOVED***
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) ***REMOVED***
        e.which == 27 && this.hide()
  ***REMOVED***, this))
***REMOVED*** else if (!this.isShown) ***REMOVED***
      this.$element.off('keydown.dismiss.bs.modal')
***REMOVED***
  ***REMOVED***

  Modal.prototype.resize = function () ***REMOVED***
    if (this.isShown) ***REMOVED***
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
***REMOVED*** else ***REMOVED***
      $(window).off('resize.bs.modal')
***REMOVED***
  ***REMOVED***

  Modal.prototype.hideModal = function () ***REMOVED***
    var that = this
    this.$element.hide()
    this.backdrop(function () ***REMOVED***
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
***REMOVED***)
  ***REMOVED***

  Modal.prototype.removeBackdrop = function () ***REMOVED***
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  ***REMOVED***

  Modal.prototype.backdrop = function (callback) ***REMOVED***
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) ***REMOVED***
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) ***REMOVED***
        if (this.ignoreBackdropClick) ***REMOVED***
          this.ignoreBackdropClick = false
          return
***REMOVED***
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
  ***REMOVED***, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

***REMOVED*** else if (!this.isShown && this.$backdrop) ***REMOVED***
      this.$backdrop.removeClass('in')

      var callbackRemove = function () ***REMOVED***
        that.removeBackdrop()
        callback && callback()
  ***REMOVED***
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

***REMOVED*** else if (callback) ***REMOVED***
      callback()
***REMOVED***
  ***REMOVED***

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () ***REMOVED***
    this.adjustDialog()
  ***REMOVED***

  Modal.prototype.adjustDialog = function () ***REMOVED***
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css(***REMOVED***
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
***REMOVED***)
  ***REMOVED***

  Modal.prototype.resetAdjustments = function () ***REMOVED***
    this.$element.css(***REMOVED***
      paddingLeft: '',
      paddingRight: ''
***REMOVED***)
  ***REMOVED***

  Modal.prototype.checkScrollbar = function () ***REMOVED***
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) ***REMOVED*** // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
***REMOVED***
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  ***REMOVED***

  Modal.prototype.setScrollbar = function () ***REMOVED***
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  ***REMOVED***

  Modal.prototype.resetScrollbar = function () ***REMOVED***
    this.$body.css('padding-right', this.originalBodyPad)
  ***REMOVED***

  Modal.prototype.measureScrollbar = function () ***REMOVED*** // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  ***REMOVED***


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) ***REMOVED***
    return this.each(function () ***REMOVED***
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend(***REMOVED******REMOVED***, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
***REMOVED***)
  ***REMOVED***

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () ***REMOVED***
    $.fn.modal = old
    return this
  ***REMOVED***


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) ***REMOVED***
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend(***REMOVED*** remote: !/#/.test(href) && href ***REMOVED***, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) ***REMOVED***
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () ***REMOVED***
        $this.is(':visible') && $this.trigger('focus')
  ***REMOVED***)
***REMOVED***)
    Plugin.call($target, option, this)
  ***REMOVED***)

***REMOVED***(jQuery);
