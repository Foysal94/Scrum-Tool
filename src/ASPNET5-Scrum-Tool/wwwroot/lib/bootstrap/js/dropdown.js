/* ========================================================================
 * Bootstrap: dropdown.js v3.3.5
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) ***REMOVED***
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) ***REMOVED***
    $(element).on('click.bs.dropdown', this.toggle)
  ***REMOVED***

  Dropdown.VERSION = '3.3.5'

  function getParent($this) ***REMOVED***
    var selector = $this.attr('data-target')

    if (!selector) ***REMOVED***
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
***REMOVED***

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  ***REMOVED***

  function clearMenus(e) ***REMOVED***
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () ***REMOVED***
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = ***REMOVED*** relatedTarget: this ***REMOVED***

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
***REMOVED***)
  ***REMOVED***

  Dropdown.prototype.toggle = function (e) ***REMOVED***
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) ***REMOVED***
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) ***REMOVED***
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
  ***REMOVED***

      var relatedTarget = ***REMOVED*** relatedTarget: this ***REMOVED***
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
***REMOVED***

    return false
  ***REMOVED***

  Dropdown.prototype.keydown = function (e) ***REMOVED***
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) ***REMOVED***
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
***REMOVED***

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  ***REMOVED***


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) ***REMOVED***
    return this.each(function () ***REMOVED***
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
***REMOVED***)
  ***REMOVED***

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () ***REMOVED***
    $.fn.dropdown = old
    return this
  ***REMOVED***


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) ***REMOVED*** e.stopPropagation() ***REMOVED***)
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

***REMOVED***(jQuery);
