/* ========================================================================
 * Bootstrap: collapse.js v3.3.5
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) ***REMOVED***
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) ***REMOVED***
    this.$element      = $(element)
    this.options       = $.extend(***REMOVED******REMOVED***, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) ***REMOVED***
      this.$parent = this.getParent()
***REMOVED*** else ***REMOVED***
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
***REMOVED***

    if (this.options.toggle) this.toggle()
  ***REMOVED***

  Collapse.VERSION  = '3.3.5'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = ***REMOVED***
    toggle: true
  ***REMOVED***

  Collapse.prototype.dimension = function () ***REMOVED***
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  ***REMOVED***

  Collapse.prototype.show = function () ***REMOVED***
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) ***REMOVED***
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
***REMOVED***

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) ***REMOVED***
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
***REMOVED***

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () ***REMOVED***
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
***REMOVED***

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  ***REMOVED***

  Collapse.prototype.hide = function () ***REMOVED***
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () ***REMOVED***
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
***REMOVED***

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  ***REMOVED***

  Collapse.prototype.toggle = function () ***REMOVED***
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  ***REMOVED***

  Collapse.prototype.getParent = function () ***REMOVED***
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) ***REMOVED***
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
  ***REMOVED***, this))
      .end()
  ***REMOVED***

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) ***REMOVED***
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  ***REMOVED***

  function getTargetFromTrigger($trigger) ***REMOVED***
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  ***REMOVED***


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) ***REMOVED***
    return this.each(function () ***REMOVED***
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend(***REMOVED******REMOVED***, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
***REMOVED***)
  ***REMOVED***

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () ***REMOVED***
    $.fn.collapse = old
    return this
  ***REMOVED***


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) ***REMOVED***
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  ***REMOVED***)

***REMOVED***(jQuery);
