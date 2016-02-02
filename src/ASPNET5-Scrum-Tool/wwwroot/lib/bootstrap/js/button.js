/* ========================================================================
 * Bootstrap: button.js v3.3.5
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) ***REMOVED***
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) ***REMOVED***
    this.$element  = $(element)
    this.options   = $.extend(***REMOVED******REMOVED***, Button.DEFAULTS, options)
    this.isLoading = false
  ***REMOVED***

  Button.VERSION  = '3.3.5'

  Button.DEFAULTS = ***REMOVED***
    loadingText: 'loading...'
  ***REMOVED***

  Button.prototype.setState = function (state) ***REMOVED***
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () ***REMOVED***
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') ***REMOVED***
        this.isLoading = true
        $el.addClass(d).attr(d, d)
  ***REMOVED*** else if (this.isLoading) ***REMOVED***
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
  ***REMOVED***
***REMOVED***, this), 0)
  ***REMOVED***

  Button.prototype.toggle = function () ***REMOVED***
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) ***REMOVED***
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') ***REMOVED***
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
  ***REMOVED*** else if ($input.prop('type') == 'checkbox') ***REMOVED***
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
  ***REMOVED***
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
***REMOVED*** else ***REMOVED***
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
***REMOVED***
  ***REMOVED***


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) ***REMOVED***
    return this.each(function () ***REMOVED***
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
***REMOVED***)
  ***REMOVED***

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () ***REMOVED***
    $.fn.button = old
    return this
  ***REMOVED***


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) ***REMOVED***
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
***REMOVED***)
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) ***REMOVED***
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
***REMOVED***)

***REMOVED***(jQuery);
