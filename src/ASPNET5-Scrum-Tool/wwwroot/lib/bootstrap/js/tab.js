/* ========================================================================
 * Bootstrap: tab.js v3.3.5
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) ***REMOVED***
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) ***REMOVED***
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  ***REMOVED***

  Tab.VERSION = '3.3.5'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () ***REMOVED***
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) ***REMOVED***
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
***REMOVED***

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', ***REMOVED***
      relatedTarget: $this[0]
***REMOVED***)
    var showEvent = $.Event('show.bs.tab', ***REMOVED***
      relatedTarget: $previous[0]
***REMOVED***)

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () ***REMOVED***
      $previous.trigger(***REMOVED***
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
  ***REMOVED***)
      $this.trigger(***REMOVED***
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
  ***REMOVED***)
***REMOVED***)
  ***REMOVED***

  Tab.prototype.activate = function (element, container, callback) ***REMOVED***
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() ***REMOVED***
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) ***REMOVED***
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
  ***REMOVED*** else ***REMOVED***
        element.removeClass('fade')
  ***REMOVED***

      if (element.parent('.dropdown-menu').length) ***REMOVED***
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
  ***REMOVED***

      callback && callback()
***REMOVED***

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  ***REMOVED***


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) ***REMOVED***
    return this.each(function () ***REMOVED***
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
***REMOVED***)
  ***REMOVED***

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () ***REMOVED***
    $.fn.tab = old
    return this
  ***REMOVED***


  // TAB DATA-API
  // ============

  var clickHandler = function (e) ***REMOVED***
    e.preventDefault()
    Plugin.call($(this), 'show')
  ***REMOVED***

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

***REMOVED***(jQuery);
