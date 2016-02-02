/* ========================================================================
 * Bootstrap: carousel.js v3.3.5
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) ***REMOVED***
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) ***REMOVED***
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  ***REMOVED***

  Carousel.VERSION  = '3.3.5'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = ***REMOVED***
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  ***REMOVED***

  Carousel.prototype.keydown = function (e) ***REMOVED***
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) ***REMOVED***
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
***REMOVED***

    e.preventDefault()
  ***REMOVED***

  Carousel.prototype.cycle = function (e) ***REMOVED***
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  ***REMOVED***

  Carousel.prototype.getItemIndex = function (item) ***REMOVED***
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  ***REMOVED***

  Carousel.prototype.getItemForDirection = function (direction, active) ***REMOVED***
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  ***REMOVED***

  Carousel.prototype.to = function (pos) ***REMOVED***
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () ***REMOVED*** that.to(pos) ***REMOVED***) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  ***REMOVED***

  Carousel.prototype.pause = function (e) ***REMOVED***
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) ***REMOVED***
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
***REMOVED***

    this.interval = clearInterval(this.interval)

    return this
  ***REMOVED***

  Carousel.prototype.next = function () ***REMOVED***
    if (this.sliding) return
    return this.slide('next')
  ***REMOVED***

  Carousel.prototype.prev = function () ***REMOVED***
    if (this.sliding) return
    return this.slide('prev')
  ***REMOVED***

  Carousel.prototype.slide = function (type, next) ***REMOVED***
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', ***REMOVED***
      relatedTarget: relatedTarget,
      direction: direction
***REMOVED***)
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) ***REMOVED***
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
***REMOVED***

    var slidEvent = $.Event('slid.bs.carousel', ***REMOVED*** relatedTarget: relatedTarget, direction: direction ***REMOVED***) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) ***REMOVED***
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () ***REMOVED***
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () ***REMOVED***
            that.$element.trigger(slidEvent)
  ***REMOVED***, 0)
***REMOVED***)
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
***REMOVED*** else ***REMOVED***
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
***REMOVED***

    isCycling && this.cycle()

    return this
  ***REMOVED***


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) ***REMOVED***
    return this.each(function () ***REMOVED***
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend(***REMOVED******REMOVED***, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
***REMOVED***)
  ***REMOVED***

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () ***REMOVED***
    $.fn.carousel = old
    return this
  ***REMOVED***


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) ***REMOVED***
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend(***REMOVED******REMOVED***, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) ***REMOVED***
      $target.data('bs.carousel').to(slideIndex)
***REMOVED***

    e.preventDefault()
  ***REMOVED***

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () ***REMOVED***
    $('[data-ride="carousel"]').each(function () ***REMOVED***
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
***REMOVED***)
  ***REMOVED***)

***REMOVED***(jQuery);
