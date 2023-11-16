/* --------------------------------------------------
 * © Copyright 2022 - Uhost by Designesia
 * --------------------------------------------------*/
(function ($) {
  "use strict";

  /* --------------------------------------------------
   * template options (customable)
   * --------------------------------------------------*/

  var de_nav_style = 2; // 1 - solid, 2 - transparent
  var de_nav_color = 1; // 1 - dark, - 2 light
  var de_nav_color_scroll = 1; // 1 - default, - 2 light

  /* --------------------------------------------------
   * predefined vars
   * --------------------------------------------------*/
  var mobile_menu_show = 0;
  var v_count = "0";
  var mb;
  var instances = [];
  var $window = $(window);
  var $tmp_h = "70px";
  var $op_header_autoshow = 0;
  var grid_size = 10;

  if ($("header").hasClass("has-topbar")) {
    $tmp_h = "105px";
  }

  /* --------------------------------------------------
   * header | style
   * --------------------------------------------------*/
  function header_styles() {
    if (de_nav_style == 2) {
      $("header").addClass("transparent");
    }
    $("#mainmenu").addClass("no-separator");
    if (de_nav_color == 2) {
      $("header").addClass("header-light");
    }
    if (de_nav_color_scroll == 2) {
      $("header").addClass("scroll-light");
    }
  }
  /* --------------------------------------------------
   * header | sticky
   * --------------------------------------------------*/
  function header_sticky() {
    jQuery("header").addClass("clone", 1000, "easeOutBounce");
    var $document = $(document);
    var vscroll = 0;
    var header = jQuery("header.autoshow");
    if ($document.scrollTop() >= 50 && vscroll == 0) {
      header.removeClass("scrollOff");
      header.addClass("scrollOn");
      header.css("height", "auto");
      vscroll = 1;
    } else {
      header.removeClass("scrollOn");
      header.addClass("scrollOff");
      vscroll = 0;
    }
  }
  /* --------------------------------------------------
   * plugin | magnificPopup
   * --------------------------------------------------*/
  function load_magnificPopup() {
    jQuery(".simple-ajax-popup-align-top").magnificPopup({
      type: "ajax",
      alignTop: true,
      overflowY: "scroll",
    });
    jQuery(".simple-ajax-popup").magnificPopup({
      type: "ajax",
    });
    // zoom gallery
    jQuery(".zoom-gallery").magnificPopup({
      delegate: "a",
      type: "image",
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: "mfp-with-zoom mfp-img-mobile",
      image: {
        verticalFit: true,
        titleSrc: function (item) {
          return item.el.attr("title");
          //return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
        },
      },
      gallery: {
        enabled: true,
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function (element) {
          return element.find("img");
        },
      },
    });
    // popup youtube, video, gmaps
    jQuery(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });
    // Initialize popup as usual
    $(".image-popup").magnificPopup({
      type: "image",
      mainClass: "mfp-with-zoom", // this class is for CSS animation below

      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: "ease-in-out", // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function (openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },
    });
    $(".image-popup-vertical-fit").magnificPopup({
      type: "image",
      closeOnContentClick: true,
      mainClass: "mfp-img-mobile",
      image: {
        verticalFit: true,
      },
    });
    $(".image-popup-fit-width").magnificPopup({
      type: "image",
      closeOnContentClick: true,
      image: {
        verticalFit: false,
      },
    });
    $(".image-popup-no-margins").magnificPopup({
      type: "image",
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
      image: {
        verticalFit: true,
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
      },
    });
    $(".image-popup-gallery").magnificPopup({
      type: "image",
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: "mfp-with-zoom mfp-img-mobile",
      image: {
        verticalFit: true,
        titleSrc: function (item) {
          return item.el.attr("title");
          //return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
        },
      },
      gallery: {
        enabled: true,
      },
    });
    $(".images-group").each(function () {
      // the containers for all your galleries
      $(this).magnificPopup({
        delegate: "a", // the selector for gallery item
        type: "image",
        gallery: {
          enabled: true,
        },
      });
    });

    $(".images-popup").magnificPopup({
      delegate: "a", // child items selector, by clicking on it popup will open
      type: "image",
      // other options
    });
  }
  /* --------------------------------------------------
   * plugin | enquire.js
   * --------------------------------------------------*/
  function init_resize() {
    enquire.register("screen and (min-width: 993px)", {
      match: function () {
        mobile_menu_show = 1;
      },
      unmatch: function () {
        mobile_menu_show = 0;
        jQuery("#menu-btn").show();
      },
    });
    enquire.register("screen and (max-width: 993px)", {
      match: function () {
        $("header").addClass("header-mobile");
        var body = jQuery("body");
        if (body.hasClass("side-content")) {
          body.removeClass("side-layout");
        }
      },
      unmatch: function () {
        $("header").removeClass("header-mobile");
        jQuery("header").css("height", $tmp_h);
        var body = jQuery("body");
        if (body.hasClass("side-content")) {
          body.addClass("side-layout");
        }
      },
    });
    init();
    init_de();
    video_autosize();

    var header = $("header");
    header.removeClass("smaller");
    header.removeClass("logo-smaller");
    header.removeClass("clone");

    var mx = window.matchMedia("(max-width: 992px)");
    var osw = jQuery(".owl-slide-wrapper");
    if (mx.matches) {
      osw.find("img").css("height", $(window).innerHeight());
      osw.find("img").css("width", "auto");
      if ($op_header_autoshow == 1) {
        header.removeClass("autoshow");
      }
    } else {
      osw.find("img").css("width", "100%");
      osw.find("img").css("height", "auto");
      if ($op_header_autoshow == 1) {
        header.addClass("autoshow");
      }
    }
  }
  /* --------------------------------------------------
   * plugin | owl carousel
   * --------------------------------------------------*/
  function load_owl() {
    jQuery("#event-carousel").owlCarousel({
      center: false,
      items: 3,
      loop: true,
      margin: 0,
      nav: false,
      dots: false,
      responsive: {
        1000: {
          items: 3,
        },
        600: {
          items: 3,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery("#testimonial-carousel").owlCarousel({
      center: true,
      items: 4,
      loop: true,
      margin: 30,
      responsive: {
        1000: {
          items: 4,
        },
        600: {
          items: 2,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery("#blog-carousel").owlCarousel({
      center: false,
      items: 3,
      loop: true,
      margin: 30,
      responsive: {
        1000: {
          items: 3,
        },
        600: {
          items: 2,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery("#blog-carousel-3").owlCarousel({
      center: true,
      items: 5,
      loop: true,
      margin: 20,
      responsive: {
        1000: {
          items: 3,
        },
        600: {
          items: 2,
        },
        0: {
          items: 1,
        },
      },
    });

    jQuery("#owl-logo").owlCarousel({
      center: false,
      items: 6,
      loop: true,
      dots: false,
      margin: 30,
      autoplay: true,
      autoplayTimeout: 2000,
      responsive: {
        1000: {
          items: 6,
        },
        600: {
          items: 4,
        },
        0: {
          items: 2,
        },
      },
    });

    jQuery("#owl-features").owlCarousel({
      center: true,
      items: 4,
      loop: true,
      dots: true,
      margin: 30,
      autoplay: false,
      autoplayTimeout: 0,
      responsive: {
        1000: {
          items: 4,
        },
        600: {
          items: 2,
        },
        0: {
          items: 1,
        },
      },
    });

    // Custom Navigation owlCarousel
    $(".next").on("click", function () {
      $(this).parent().parent().find(".blog-slide").trigger("owl.next");
    });
    $(".prev").on("click", function () {
      $(this).parent().parent().find(".blog-slide").trigger("owl.prev");
    });

    jQuery(".owl-custom-nav").each(function () {
      var owl = $(".owl-custom-nav").next();
      var ow = parseInt(owl.css("height"), 10);
      $(this).css("margin-top", ow / 2 - 25);
      owl.owlCarousel();
      // Custom Navigation Events
      $(".btn-next").on("click", function () {
        owl.trigger("owl.next");
      });
      $(".btn-prev").on("click", function () {
        owl.trigger("owl.prev");
      });
    });

    // custom navigation for slider
    var ows = $("#custom-owl-slider");
    var arr = $(".owl-slider-nav");
    var doc_height = $(window).innerHeight();
    arr.css("top", doc_height / 2 - 25);
    ows.owlCarousel();
    // Custom Navigation Events
    arr.find(".next").on("click", function () {
      ows.trigger("owl.next");
    });
    arr.find(".prev").on("click", function () {
      ows.trigger("owl.prev");
    });

    jQuery(".owl-slide-wrapper")
      .on("mouseenter", function () {
        arr.find(".next").css("right", "40px");
        arr.find(".prev").css("left", "40px");
      })
      .on("mouseleave", function () {
        arr.find(".next").css("right", "-50px");
        arr.find(".prev").css("left", "-50px");
      });
  }
  /* --------------------------------------------------
   * plugin | isotope
   * --------------------------------------------------*/
  function filter_gallery() {
    var $container = jQuery("#gallery");
    $container.isotope({
      itemSelector: ".item",
      filter: "*",
    });
    jQuery("#filters a").on("click", function () {
      var $this = jQuery(this);
      if ($this.hasClass("selected")) {
        return false;
      }
      var $optionSet = $this.parents();
      $optionSet.find(".selected").removeClass("selected");
      $this.addClass("selected");
      var selector = jQuery(this).attr("data-filter");
      $container.isotope({
        filter: selector,
      });
      return false;
    });
  }
  /* --------------------------------------------------
   * plugin | fitvids
   * --------------------------------------------------*/
  /*!
   * FitVids 1.0
   *
   * Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
   * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
   * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
   *
   * Date: Thu Sept 01 18:00:00 2011 -0500
   */
  !(function (a) {
    a.fn.fitVids = function (b) {
      var c = {
          customSelector: null,
        },
        d = document.createElement("div"),
        e =
          document.getElementsByTagName("base")[0] ||
          document.getElementsByTagName("script")[0];
      return (
        (d.className = "fit-vids-style"),
        (d.innerHTML =
          "&shy;<style> .fluid-width-video-wrapper { width: 100%; position: relative; padding: 0; } .fluid-width-video-wrapper iframe, .fluid-width-video-wrapper object, .fluid-width-video-wrapper embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } </style>"),
        e.parentNode.insertBefore(d, e),
        b && a.extend(c, b),
        this.each(function () {
          var b = [
            "iframe[src*='player.vimeo.com']",
            "iframe[src*='www.youtube.com']",
            "iframe[src*='www.kickstarter.com']",
            "object",
            "embed",
          ];
          c.customSelector && b.push(c.customSelector);
          var d = a(this).find(b.join(","));
          d.each(function () {
            var b = a(this);
            if (
              !(
                ("embed" == this.tagName.toLowerCase() &&
                  b.parent("object").length) ||
                b.parent(".fluid-width-video-wrapper").length
              )
            ) {
              var c =
                  "object" == this.tagName.toLowerCase() || b.attr("height")
                    ? b.attr("height")
                    : b.height(),
                d = b.attr("width") ? b.attr("width") : b.width(),
                e = c / d;
              if (!b.attr("id")) {
                var f = "fitvid" + Math.floor(999999 * Math.random());
                b.attr("id", f);
              }
              b
                .wrap('<div class="fluid-width-video-wrapper"></div>')
                .parent(".fluid-width-video-wrapper")
                .css("padding-top", 100 * e + "%"),
                b.removeAttr("height").removeAttr("width");
            }
          });
        })
      );
    };
  })(jQuery);
  /* --------------------------------------------------
   * back to top
   * --------------------------------------------------*/
  var scrollTrigger = 500; // px
  var t = 0;

  function backToTop() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > scrollTrigger) {
      $("#back-to-top").addClass("show");
      $("#back-to-top").removeClass("hide");
      t = 1;
    }

    if (scrollTop < scrollTrigger && t == 1) {
      $("#back-to-top").addClass("hide");
    }

    $("#back-to-top").on("click", function (e) {
      e.preventDefault();
      $("html,body").stop(true).animate(
        {
          scrollTop: 0,
        },
        700
      );
    });
  }
  /* SmoothScroll */
  !(function () {
    var s,
      i,
      c,
      a,
      o = {
        frameRate: 200,
        animationTime: 800,
        stepSize: 100,
        pulseAlgorithm: !0,
        pulseScale: 4,
        pulseNormalize: 1,
        accelerationDelta: 50,
        accelerationMax: 3,
        keyboardSupport: !0,
        arrowScroll: 50,
        fixedBackground: !0,
        excluded: "",
      },
      p = o,
      u = !1,
      d = !1,
      n = { x: 0, y: 0 },
      f = !1,
      m = document.documentElement,
      l = [],
      h = /^Mac/.test(navigator.platform),
      w = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        spacebar: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
      },
      v = { 37: 1, 38: 1, 39: 1, 40: 1 };
    function y() {
      if (!f && document.body) {
        f = !0;
        var e = document.body,
          t = document.documentElement,
          o = window.innerHeight,
          n = e.scrollHeight;
        if (
          ((m = 0 <= document.compatMode.indexOf("CSS") ? t : e),
          (s = e),
          p.keyboardSupport && Y("keydown", x),
          top != self)
        )
          d = !0;
        else if (Q && o < n && (e.offsetHeight <= o || t.offsetHeight <= o)) {
          var r,
            a = document.createElement("div");
          (a.style.cssText =
            "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" +
            m.scrollHeight +
            "px"),
            document.body.appendChild(a),
            (c = function () {
              r =
                r ||
                setTimeout(function () {
                  u ||
                    ((a.style.height = "0"),
                    (a.style.height = m.scrollHeight + "px"),
                    (r = null));
                }, 500);
            }),
            setTimeout(c, 10),
            Y("resize", c);
          if (
            ((i = new R(c)).observe(e, {
              attributes: !0,
              childList: !0,
              characterData: !1,
            }),
            m.offsetHeight <= o)
          ) {
            var l = document.createElement("div");
            (l.style.clear = "both"), e.appendChild(l);
          }
        }
        p.fixedBackground ||
          u ||
          ((e.style.backgroundAttachment = "scroll"),
          (t.style.backgroundAttachment = "scroll"));
      }
    }
    var b = [],
      g = !1,
      r = Date.now();
    function S(d, f, m) {
      if (
        ((function (e, t) {
          (e = 0 < e ? 1 : -1),
            (t = 0 < t ? 1 : -1),
            (n.x === e && n.y === t) ||
              ((n.x = e), (n.y = t), (b = []), (r = 0));
        })(f, m),
        1 != p.accelerationMax)
      ) {
        var e = Date.now() - r;
        if (e < p.accelerationDelta) {
          var t = (1 + 50 / e) / 2;
          1 < t && ((t = Math.min(t, p.accelerationMax)), (f *= t), (m *= t));
        }
        r = Date.now();
      }
      if (
        (b.push({
          x: f,
          y: m,
          lastX: f < 0 ? 0.99 : -0.99,
          lastY: m < 0 ? 0.99 : -0.99,
          start: Date.now(),
        }),
        !g)
      ) {
        var o = q(),
          h = d === o || d === document.body;
        null == d.$scrollBehavior &&
          (function (e) {
            var t = M(e);
            if (null == B[t]) {
              var o = getComputedStyle(e, "")["scroll-behavior"];
              B[t] = "smooth" == o;
            }
            return B[t];
          })(d) &&
          ((d.$scrollBehavior = d.style.scrollBehavior),
          (d.style.scrollBehavior = "auto"));
        var w = function (e) {
          for (var t = Date.now(), o = 0, n = 0, r = 0; r < b.length; r++) {
            var a = b[r],
              l = t - a.start,
              i = l >= p.animationTime,
              c = i ? 1 : l / p.animationTime;
            p.pulseAlgorithm && (c = F(c));
            var s = (a.x * c - a.lastX) >> 0,
              u = (a.y * c - a.lastY) >> 0;
            (o += s),
              (n += u),
              (a.lastX += s),
              (a.lastY += u),
              i && (b.splice(r, 1), r--);
          }
          h
            ? window.scrollBy(o, n)
            : (o && (d.scrollLeft += o), n && (d.scrollTop += n)),
            f || m || (b = []),
            b.length
              ? j(w, d, 1e3 / p.frameRate + 1)
              : ((g = !1),
                null != d.$scrollBehavior &&
                  ((d.style.scrollBehavior = d.$scrollBehavior),
                  (d.$scrollBehavior = null)));
        };
        j(w, d, 0), (g = !0);
      }
    }
    function e(e) {
      f || y();
      var t = e.target;
      if (e.defaultPrevented || e.ctrlKey) return !0;
      if (
        N(s, "embed") ||
        (N(t, "embed") && /\.pdf/i.test(t.src)) ||
        N(s, "object") ||
        t.shadowRoot
      )
        return !0;
      var o = -e.wheelDeltaX || e.deltaX || 0,
        n = -e.wheelDeltaY || e.deltaY || 0;
      h &&
        (e.wheelDeltaX &&
          K(e.wheelDeltaX, 120) &&
          (o = (e.wheelDeltaX / Math.abs(e.wheelDeltaX)) * -120),
        e.wheelDeltaY &&
          K(e.wheelDeltaY, 120) &&
          (n = (e.wheelDeltaY / Math.abs(e.wheelDeltaY)) * -120)),
        o || n || (n = -e.wheelDelta || 0),
        1 === e.deltaMode && ((o *= 40), (n *= 40));
      var r = z(t);
      return r
        ? !!(function (e) {
            if (!e) return;
            l.length || (l = [e, e, e]);
            (e = Math.abs(e)),
              l.push(e),
              l.shift(),
              clearTimeout(a),
              (a = setTimeout(function () {
                try {
                  localStorage.SS_deltaBuffer = l.join(",");
                } catch (e) {}
              }, 1e3));
            var t = 120 < e && P(e),
              o = !P(120) && !P(100) && !t;
            return e < 50 || o;
          })(n) ||
            (1.2 < Math.abs(o) && (o *= p.stepSize / 120),
            1.2 < Math.abs(n) && (n *= p.stepSize / 120),
            S(r, o, n),
            e.preventDefault(),
            void C())
        : !d ||
            !W ||
            (Object.defineProperty(e, "target", { value: window.frameElement }),
            parent.wheel(e));
    }
    function x(e) {
      var t = e.target,
        o =
          e.ctrlKey ||
          e.altKey ||
          e.metaKey ||
          (e.shiftKey && e.keyCode !== w.spacebar);
      document.body.contains(s) || (s = document.activeElement);
      var n = /^(button|submit|radio|checkbox|file|color|image)$/i;
      if (
        e.defaultPrevented ||
        /^(textarea|select|embed|object)$/i.test(t.nodeName) ||
        (N(t, "input") && !n.test(t.type)) ||
        N(s, "video") ||
        (function (e) {
          var t = e.target,
            o = !1;
          if (-1 != document.URL.indexOf("www.youtube.com/watch"))
            do {
              if (
                (o =
                  t.classList && t.classList.contains("html5-video-controls"))
              )
                break;
            } while ((t = t.parentNode));
          return o;
        })(e) ||
        t.isContentEditable ||
        o
      )
        return !0;
      if (
        (N(t, "button") || (N(t, "input") && n.test(t.type))) &&
        e.keyCode === w.spacebar
      )
        return !0;
      if (N(t, "input") && "radio" == t.type && v[e.keyCode]) return !0;
      var r = 0,
        a = 0,
        l = z(s);
      if (!l) return !d || !W || parent.keydown(e);
      var i = l.clientHeight;
      switch ((l == document.body && (i = window.innerHeight), e.keyCode)) {
        case w.up:
          a = -p.arrowScroll;
          break;
        case w.down:
          a = p.arrowScroll;
          break;
        case w.spacebar:
          a = -(e.shiftKey ? 1 : -1) * i * 0.9;
          break;
        case w.pageup:
          a = 0.9 * -i;
          break;
        case w.pagedown:
          a = 0.9 * i;
          break;
        case w.home:
          l == document.body &&
            document.scrollingElement &&
            (l = document.scrollingElement),
            (a = -l.scrollTop);
          break;
        case w.end:
          var c = l.scrollHeight - l.scrollTop - i;
          a = 0 < c ? 10 + c : 0;
          break;
        case w.left:
          r = -p.arrowScroll;
          break;
        case w.right:
          r = p.arrowScroll;
          break;
        default:
          return !0;
      }
      S(l, r, a), e.preventDefault(), C();
    }
    function t(e) {
      s = e.target;
    }
    var k,
      D,
      M =
        ((k = 0),
        function (e) {
          return e.uniqueID || (e.uniqueID = k++);
        }),
      E = {},
      T = {},
      B = {};
    function C() {
      clearTimeout(D),
        (D = setInterval(function () {
          E = T = B = {};
        }, 1e3));
    }
    function H(e, t, o) {
      for (var n = o ? E : T, r = e.length; r--; ) n[M(e[r])] = t;
      return t;
    }
    function z(e) {
      var t = [],
        o = document.body,
        n = m.scrollHeight;
      do {
        var r = (!1 ? E : T)[M(e)];
        if (r) return H(t, r);
        if ((t.push(e), n === e.scrollHeight)) {
          var a = (O(m) && O(o)) || X(m);
          if ((d && L(m)) || (!d && a)) return H(t, q());
        } else if (L(e) && X(e)) return H(t, e);
      } while ((e = e.parentElement));
    }
    function L(e) {
      return e.clientHeight + 10 < e.scrollHeight;
    }
    function O(e) {
      return (
        "hidden" !== getComputedStyle(e, "").getPropertyValue("overflow-y")
      );
    }
    function X(e) {
      var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
      return "scroll" === t || "auto" === t;
    }
    function Y(e, t, o) {
      window.addEventListener(e, t, o || !1);
    }
    function A(e, t, o) {
      window.removeEventListener(e, t, o || !1);
    }
    function N(e, t) {
      return e && (e.nodeName || "").toLowerCase() === t.toLowerCase();
    }
    if (window.localStorage && localStorage.SS_deltaBuffer)
      try {
        l = localStorage.SS_deltaBuffer.split(",");
      } catch (e) {}
    function K(e, t) {
      return Math.floor(e / t) == e / t;
    }
    function P(e) {
      return K(l[0], e) && K(l[1], e) && K(l[2], e);
    }
    var $,
      j =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (e, t, o) {
          window.setTimeout(e, o || 1e3 / 60);
        },
      R =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver,
      q =
        (($ = document.scrollingElement),
        function () {
          if (!$) {
            var e = document.createElement("div");
            (e.style.cssText = "height:10000px;width:1px;"),
              document.body.appendChild(e);
            var t = document.body.scrollTop;
            document.documentElement.scrollTop,
              window.scrollBy(0, 3),
              ($ =
                document.body.scrollTop != t
                  ? document.body
                  : document.documentElement),
              window.scrollBy(0, -3),
              document.body.removeChild(e);
          }
          return $;
        });
    function V(e) {
      var t;
      return (
        ((e *= p.pulseScale) < 1
          ? e - (1 - Math.exp(-e))
          : ((e -= 1), (t = Math.exp(-1)) + (1 - Math.exp(-e)) * (1 - t))) *
        p.pulseNormalize
      );
    }
    function F(e) {
      return 1 <= e
        ? 1
        : e <= 0
        ? 0
        : (1 == p.pulseNormalize && (p.pulseNormalize /= V(1)), V(e));
    }
    var I = window.navigator.userAgent,
      _ = /Edge/.test(I),
      W = /chrome/i.test(I) && !_,
      U = /safari/i.test(I) && !_,
      G = /mobile/i.test(I),
      J = /Windows NT 6.1/i.test(I) && /rv:11/i.test(I),
      Q = U && (/Version\/8/i.test(I) || /Version\/9/i.test(I)),
      Z = (W || U || J) && !G,
      ee = !1;
    try {
      window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
          get: function () {
            ee = !0;
          },
        })
      );
    } catch (e) {}
    var te = !!ee && { passive: !1 },
      oe = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
    function ne(e) {
      for (var t in e) o.hasOwnProperty(t) && (p[t] = e[t]);
    }
    oe && Z && (Y(oe, e, te), Y("mousedown", t), Y("load", y)),
      (ne.destroy = function () {
        i && i.disconnect(),
          A(oe, e),
          A("mousedown", t),
          A("keydown", x),
          A("resize", c),
          A("load", y);
      }),
      window.SmoothScrollOptions && ne(window.SmoothScrollOptions),
      "function" == typeof define && define.amd
        ? define(function () {
            return ne;
          })
        : "object" == typeof exports
        ? (module.exports = ne)
        : (window.SmoothScroll = ne);
  })();

  /* --------------------------------------------------
   * plugin | scroll to
   * --------------------------------------------------*/
  /*!
   * jquery.scrollto.js 0.0.1 - https://github.com/yckart/jquery.scrollto.js
   * Scroll smooth to any element in your DOM.
   *
   * Copyright (c) 2012 Yannick Albert (http://yckart.com)
   * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
   * 2013/02/17
   **/
  $.scrollTo = $.fn.scrollTo = function (x, y, options) {
    if (!(this instanceof $))
      return $.fn.scrollTo.apply($("html, body"), arguments);

    options = $.extend(
      {},
      {
        gap: {
          x: 0,
          y: 0,
        },
        animation: {
          easing: "easeInOutExpo",
          duration: 600,
          complete: $.noop,
          step: $.noop,
        },
      },
      options
    );

    return this.each(function () {
      if (!jQuery("body").hasClass("side-layout")) {
        var h = 69;
      } else {
        var h = 0;
      }

      var elem = $(this);
      elem.stop().animate(
        {
          scrollLeft: !isNaN(Number(x))
            ? x
            : $(y).offset().left + options.gap.x,
          scrollTop: !isNaN(Number(y))
            ? y
            : $(y).offset().top + options.gap.y - h, // *edited
        },
        options.animation
      );
    });
  };
  /* --------------------------------------------------
   * counting number
   * --------------------------------------------------*/
  function de_counter() {
    jQuery(".timer").each(function () {
      var imagePos = jQuery(this).offset().top;
      var topOfWindow = jQuery(window).scrollTop();
      if (imagePos < topOfWindow + jQuery(window).height() && v_count == "0") {
        jQuery(function ($) {
          // start all the timers
          jQuery(".timer").each(count);

          function count(options) {
            v_count = "1";
            var $this = jQuery(this);
            options = $.extend(
              {},
              options || {},
              $this.data("countToOptions") || {}
            );
            $this.countTo(options);
          }
        });
      }
    });
  }
  /* --------------------------------------------------
   * progress bar
   * --------------------------------------------------*/

  function text_rotate() {
    var quotes = $(".text-rotate-wrap .text-item");
    var quoteIndex = -1;

    function showNextQuote() {
      ++quoteIndex;
      quotes
        .eq(quoteIndex % quotes.length)
        .fadeIn(1)
        .delay(1500)
        .fadeOut(1, showNextQuote);
    }

    showNextQuote();
  }
  /* --------------------------------------------------
   * custom background
   * --------------------------------------------------*/
  function custom_bg() {
    $("body,div,section,span").css("background-color", function () {
      return jQuery(this).data("bgcolor");
    });
    $("body,div,section").css("background", function () {
      return jQuery(this).data("bgimage");
    });
    $("body,div,section").css("background-size", function () {
      return "cover";
    });
  }
  /* --------------------------------------------------
   * custom elements
   * --------------------------------------------------*/
  function custom_elements() {
    // --------------------------------------------------
    // tabs
    // --------------------------------------------------
    jQuery(".de_tab").find(".de_tab_content > div").hide();
    jQuery(".de_tab").find(".de_tab_content > div:first").show();
    jQuery("li").find(".v-border").fadeTo(150, 0);
    jQuery("li.active").find(".v-border").fadeTo(150, 1);
    jQuery(".de_nav li").on("click", function () {
      jQuery(this).parent().find("li").removeClass("active");
      jQuery(this).addClass("active");
      jQuery(this).parent().parent().find(".v-border").fadeTo(150, 0);
      jQuery(this).parent().parent().find(".de_tab_content > div").hide();
      var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
      jQuery(this)
        .parent()
        .parent()
        .find(".de_tab_content > div:eq(" + indexer + ")")
        .fadeIn(); //uses whatever index the link has to open the corresponding box
      jQuery(this).find(".v-border").fadeTo(150, 1);
    });
    // request quote function
    var rq_step = 1;
    jQuery("#request_form .btn-right").on("click", function () {
      var rq_name = $("#rq_name").val();
      var rq_email = $("#rq_email").val();
      var rq_phone = $("#rq_phone").val();
      if (rq_step == 1) {
        if (rq_name.length == 0) {
          $("#rq_name").addClass("error_input");
        } else {
          $("#rq_name").removeClass("error_input");
        }
        if (rq_email.length == 0) {
          $("#rq_email").addClass("error_input");
        } else {
          $("#rq_email").removeClass("error_input");
        }
        if (rq_phone.length == 0) {
          $("#rq_phone").addClass("error_input");
        } else {
          $("#rq_phone").removeClass("error_input");
        }
      }
      if (rq_name.length != 0 && rq_email.length != 0 && rq_phone.length != 0) {
        jQuery("#rq_step_1").hide();
        jQuery("#rq_step_2").fadeIn();
      }
    });
    // --------------------------------------------------
    // tabs
    // --------------------------------------------------
    jQuery(".de_review").find(".de_tab_content > div").hide();
    jQuery(".de_review").find(".de_tab_content > div:first").show();
    //jQuery('.de_review').find('.de_nav li').fadeTo(150,.5);
    jQuery(".de_review").find(".de_nav li:first").fadeTo(150, 1);
    jQuery(".de_nav li").on("click", function () {
      jQuery(this).parent().find("li").removeClass("active");
      //jQuery(this).parent().find('li').fadeTo(150,.5);
      jQuery(this).addClass("active");
      jQuery(this).fadeTo(150, 1);
      jQuery(this).parent().parent().find(".de_tab_content > div").hide();
      var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
      jQuery(this)
        .parent()
        .parent()
        .find(".de_tab_content > div:eq(" + indexer + ")")
        .show(); //uses whatever index the link has to open the corresponding box
    });
    // --------------------------------------------------
    // toggle
    // --------------------------------------------------
    jQuery(".toggle-list h2").addClass("acc_active");
    jQuery(".toggle-list h2").toggle(
      function () {
        jQuery(this).addClass("acc_noactive");
        jQuery(this).next(".ac-content").slideToggle(200);
      },
      function () {
        jQuery(this).removeClass("acc_noactive").addClass("acc_active");
        jQuery(this).next(".ac-content").slideToggle(200);
      }
    );
    // --------------------------------------------------
    // toggle
    // --------------------------------------------------
    jQuery(".expand-custom .toggle").click(function () {
      jQuery(this).stop().toggleClass("clicked");
      jQuery(this)
        .stop()
        .parent()
        .parent()
        .parent()
        .find(".details")
        .slideToggle(500);
    });
  }
  /* --------------------------------------------------
   * video autosize
   * --------------------------------------------------*/
  function video_autosize() {
    jQuery(".de-video-container").each(function () {
      var height_1 = jQuery(this).css("height");
      var height_2 = jQuery(this).find(".de-video-content").css("height");
      var newheight =
        (height_1.substring(0, height_1.length - 2) -
          height_2.substring(0, height_2.length - 2)) /
        2;
      jQuery(this).find(".de-video-overlay").css("height", height_1);
      jQuery(this).find(".de-video-content").animate(
        {
          "margin-top": newheight,
        },
        "fast"
      );
    });
  }
  /* --------------------------------------------------
   * center x and y
   * --------------------------------------------------*/
  function center_xy() {
    jQuery(".center-xy").each(function () {
      jQuery(this)
        .parent()
        .find("img")
        .on("load", function () {
          var w = parseInt(
            jQuery(this).parent().find(".center-xy").css("width"),
            10
          );
          var h = parseInt(
            jQuery(this).parent().find(".center-xy").css("height"),
            10
          );
          var pic_w = jQuery(this).css("width");
          var pic_h = jQuery(this).css("height");
          var tp = jQuery(this).parent();
          tp.find(".center-xy").css("left", parseInt(pic_w, 10) / 2 - w / 2);
          tp.find(".center-xy").css("top", parseInt(pic_h, 10) / 2 - h / 2);
          tp.find(".bg-overlay").css("width", pic_w);
          tp.find(".bg-overlay").css("height", pic_h);
        })
        .each(function () {
          if (this.complete) $(this).load();
        });
    });
  }
  /* --------------------------------------------------
   * add arrow for mobile menu
   * --------------------------------------------------*/
  function menu_arrow() {
    // mainmenu create span
    jQuery("#mainmenu li a").each(function () {
      if ($(this).next("ul").length > 0) {
        $("<span></span>").insertAfter($(this));
      }
    });
    // mainmenu arrow click
    jQuery("#mainmenu > li > span").on("click", function () {
      var iteration = $(this).data("iteration") || 1;
      switch (iteration) {
        case 1:
          $(this).addClass("active");
          $(this).parent().find("ul:first").css("height", "auto");
          var curHeight = $(this).parent().find("ul:first").height();
          $(this).parent().find("ul:first").css("height", "0");
          $(this).parent().find("ul:first").animate(
            {
              height: curHeight,
            },
            300,
            "easeOutQuint"
          );
          $("header").css(
            "height",
            $("#mainmenu")[0].scrollHeight + curHeight + parseInt($tmp_h) * 2
          );
          break;
        case 2:
          var curHeight = $(this).parent().find("ul:first").height();
          $(this).removeClass("active");
          $(this).parent().find("ul:first").animate(
            {
              height: "0",
            },
            300,
            "easeOutQuint"
          );
          $("header").css(
            "height",
            $("#mainmenu")[0].scrollHeight - curHeight + parseInt($tmp_h) * 2
          );
          break;
      }
      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data("iteration", iteration);
    });
    jQuery("#mainmenu > li > ul > li > span").on("click", function () {
      var iteration = $(this).data("iteration") || 1;
      switch (iteration) {
        case 1:
          $(this).addClass("active");
          $(this).parent().find("ul:first").css("height", "auto");
          $(this)
            .parent()
            .parent()
            .parent()
            .find("ul:first")
            .css("height", "auto");
          var curHeight = $(this).parent().find("ul:first").height();
          $(this).parent().find("ul:first").css("height", "0");
          $(this).parent().find("ul:first").animate(
            {
              height: curHeight,
            },
            400,
            "easeInOutQuint"
          );
          break;
        case 2:
          $(this).removeClass("active");
          $(this).parent().find("ul:first").animate(
            {
              height: "0",
            },
            400,
            "easeInOutQuint"
          );
          break;
      }
      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data("iteration", iteration);
    });
  }
  /* --------------------------------------------------
   * show gallery item sequence
   * --------------------------------------------------*/
  function sequence() {
    var sq = jQuery(".sequence > .gallery-item .picframe");
    var count = sq.length;
    sq.addClass("fadeIn");
    sq.find("img").addClass("slideInUp");
    for (var i = 0; i <= count; i++) {
      var sqx = jQuery(".sequence > .gallery-item:eq(" + i + ") .picframe");
      sqx.attr("data-wow-delay", i / 8 + "s");
      sqx.find("img").attr("data-wow-delay", i / 16 + "s");
    }
  }
  /* --------------------------------------------------
   * show gallery item sequence
   * --------------------------------------------------*/
  function sequence_a() {
    var sq = jQuery(".sequence").find(".sq-item");
    var count = sq.length;
    sq.addClass("scaleOutFade");
    for (var i = 0; i <= count; i++) {
      var sqx = jQuery(".sequence").find(".sq-item:eq(" + i + ")");
      sqx.attr("data-wow-delay", i / 8 + "s");
      sqx.attr("data-wow-speed", "1s");
    }
  }
  /* --------------------------------------------------
   * custom scroll
   * --------------------------------------------------*/
  $.fn.moveIt = function () {
    $(this).each(function () {
      instances.push(new moveItItem($(this)));
    });
  };

  function moveItItemNow() {
    var scrollTop = $window.scrollTop();
    instances.forEach(function (inst) {
      inst.update(scrollTop);
    });
  }

  function moveItItem(el) {
    this.el = $(el);
    this.speed = parseInt(this.el.attr("data-scroll-speed"));
  }
  moveItItem.prototype.update = function (scrollTop) {
    var pos = scrollTop / this.speed;
    this.el.css("transform", "translateY(" + pos + "px)");
  };
  $(function () {
    $("[data-scroll-speed]").moveIt();
  });
  /* --------------------------------------------------
   * multiple function
   * --------------------------------------------------*/
  function init() {
    var sh = jQuery("#de-sidebar").css("height");
    var dh = jQuery(window).innerHeight();
    var h = parseInt(sh) - parseInt(dh);

    function scrolling() {
      var mq = window.matchMedia("(min-width: 993px)");
      var ms = window.matchMedia("(min-width: 768px)");
      if (mq.matches) {
        var distanceY =
            window.pageYOffset || document.documentElement.scrollTop,
          shrinkOn = 0,
          header = jQuery("header");
        if (distanceY > shrinkOn) {
          header.addClass("smaller");
        } else {
          if (header.hasClass("smaller")) {
            header.removeClass("smaller");
          }
        }
      }
      if (mq.matches) {
        if (jQuery("header").hasClass("side-header")) {
          if (jQuery(document).scrollTop() >= h) {
            jQuery("#de-sidebar").css("position", "fixed");
            if (parseInt(sh) > parseInt(dh)) {
              jQuery("#de-sidebar").css("top", -h);
            }
            jQuery("#main").addClass("col-md-offset-3");
            jQuery("h1#logo img").css("padding-left", "7px");
            jQuery("header .h-content").css("padding-left", "7px");
            jQuery("#mainmenu li").css("width", "103%");
          } else {
            jQuery("#de-sidebar").css("position", "relative");
            if (parseInt(sh) > parseInt(dh)) {
              jQuery("#de-sidebar").css("top", 0);
            }
            jQuery("#main").removeClass("col-md-offset-3");
            jQuery("h1#logo img").css("padding-left", "0px");
            jQuery("header .h-content").css("padding-left", "0px");
            jQuery("#mainmenu li").css("width", "100%");
          }
        }
      }
    }

    // --------------------------------------------------
    // looping background
    // --------------------------------------------------

    scrolling();

    jQuery(".btn-rsvp").on("click", function () {
      var iteration = $(this).data("iteration") || 1;
      switch (iteration) {
        case 1:
          jQuery("#popup-box").addClass("popup-show");
          jQuery("#popup-box").removeClass("popup-hide");
          break;
        case 2:
          break;
      }
      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data("iteration", iteration);
    });

    jQuery(".btn-close").on("click", function () {
      var iteration = $(this).data("iteration") || 1;
      switch (iteration) {
        case 1:
          jQuery("#popup-box").addClass("popup-hide");
          jQuery("#popup-box").removeClass("popup-show");
          break;
        case 2:
          break;
      }
      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data("iteration", iteration);
    });

    $("#sw-1").click(function () {
      if ($(this).is(":checked")) {
        $(".opt-1").css("display", "none");
        $(".opt-2").css("display", "inline-block");
      } else {
        $(".opt-2").css("display", "none");
        $(".opt-1").css("display", "inline-block");
      }
    });

    $("#switch-set-v2 .ch-1").click(function () {
      $("#switch-set-v2 div").removeClass("active");
      $(this).addClass("active");
      $(".opt-2").css("display", "none");
      $(".opt-1").css("display", "inline-block");
    });

    $("#switch-set-v2 .ch-2").click(function () {
      $("#switch-set-v2 div").removeClass("active");
      $(this).addClass("active");
      $(".opt-1").css("display", "none");
      $(".opt-2").css("display", "inline-block");
    });
  }
  /* --------------------------------------------------
   * multiple function
   * --------------------------------------------------*/
  function init_de() {
    jQuery(".de-team-list").each(function () {
      jQuery(this)
        .find("img")
        .on("load", function () {
          var w = jQuery(this).css("width");
          var h = jQuery(this).css("height");
          var tpp = jQuery(this).parent().parent();
          tpp.find(".team-pic").css("height", h);
          tpp.find(".team-desc").css("width", w);
          tpp.find(".team-desc").css("height", h);
          tpp.find(".team-desc").css("top", h);
        })
        .each(function () {
          if (this.complete) $(this).load();
        });
    });
    jQuery(".de-team-list")
      .on("mouseenter", function () {
        var h;
        h = jQuery(this).find("img").css("height");
        jQuery(this).find(".team-desc").stop(true).animate(
          {
            top: "0px",
          },
          350,
          "easeOutQuad"
        );
        jQuery(this).find("img").stop(true).animate(
          {
            "margin-top": "-100px",
          },
          400,
          "easeOutQuad"
        );
      })
      .on("mouseleave", function () {
        var h;
        h = jQuery(this).find("img").css("height");
        jQuery(this).find(".team-desc").stop(true).animate(
          {
            top: h,
          },
          350,
          "easeOutQuad"
        );
        jQuery(this).find("img").stop(true).animate(
          {
            "margin-top": "0px",
          },
          400,
          "easeOutQuad"
        );
      });
    // portfolio
    jQuery(".item .picframe").each(function () {
      var img = jQuery(this).find("img");
      img.css("width", "100%");
      img.css("height", "auto");
      img
        .on("load", function () {
          var w = jQuery(this).css("width");
          var h = jQuery(this).css("height");
          //nh = (h.substring(0, h.length - 2)/2)-48;
          jQuery(this).parent().css("height", h);
        })
        .each(function () {
          if (this.complete) $(this).load();
        });
    });
    // --------------------------------------------------
    // portfolio hover
    // --------------------------------------------------
    jQuery(".overlay").fadeTo(1, 0);
    // gallery hover
    jQuery(".item .picframe")
      .on("mouseenter", function () {
        var ov = jQuery(this).parent().find(".overlay");
        ov.width(jQuery(this).find("img").css("width"));
        ov.height(jQuery(this).find("img").css("height"));
        ov.stop(true).fadeTo(200, 1);
        var picheight = jQuery(this).find("img").css("height");
        var newheight;
        newheight = picheight.substring(0, picheight.length - 2) / 2 - 10;
        //alert(newheight);
        //jQuery(this).parent().find(".pf_text").stop(true).animate({'margin-top': newheight},200,'easeOutCubic');
        jQuery(this).parent().find(".pf_text").css("margin-top", newheight);
        jQuery(this).parent().find(".pf_text").stop(true).animate(
          {
            opacity: "1",
          },
          1000,
          "easeOutCubic"
        );
        var w = jQuery(this).find("img").css("width");
        var h = jQuery(this).find("img").css("height");
        var w = parseInt(w, 10);
        var h = parseInt(h, 10);
        var $scale = 1;
        //alert(w);
        jQuery(this)
          .find("img")
          .stop(true)
          .animate(
            {
              width: w * $scale,
              height: h * $scale,
              "margin-left": (-w * ($scale - 1)) / 2,
              "margin-top": (-h * ($scale - 1)) / 2,
            },
            400,
            "easeOutCubic"
          );
      })
      .on("mouseleave", function () {
        var newheight;
        var picheight = jQuery(this).find("img").css("height");
        newheight = picheight.substring(0, picheight.length - 2) / 2 - 10;
        //jQuery(this).parent().find(".pf_text").stop(true).animate({'margin-top': newheight - 30},200,'easeOutCubic');
        jQuery(this).parent().find(".pf_text").stop(true).animate(
          {
            opacity: "0",
          },
          400,
          "easeOutCubic"
        );
        jQuery(this).parent().find(".overlay").stop(true).fadeTo(200, 0);
        jQuery(this).find("img").stop(true).animate(
          {
            width: "100%",
            height: "100%",
            "margin-left": 0,
            "margin-top": 0,
          },
          400,
          "easeOutQuad"
        );
      });
    jQuery(".overlay").fadeTo(1, 0);
    $.stellar("refresh");

    var preloader_pos = parseInt(jQuery(window).innerHeight() / 2) - 30;
    $(".preloader1").css("top", preloader_pos);

    jQuery(".grid.border").css("padding-top", grid_size);
    jQuery(".grid.border").css("padding-left", grid_size);

    jQuery("#selector .opt").on("click", function () {
      jQuery("#selector .opt").removeClass("active");
      var color = jQuery(this).data("color");
      jQuery("#colors").attr("href", "css/colors/" + color + ".css");
      jQuery(this).addClass("active");
      $.cookie("c_scheme", color, { expires: 1000 });
    });

    jQuery("#dark-mode").on("click", function () {
      var iteration = $(this).data("iteration") || 1;
      switch (iteration) {
        case 1:
          jQuery("body").addClass("dark-mode");
          jQuery("body").addClass("text-light");
          jQuery(this).addClass("active");
          jQuery(this).text("Disable Dark Mode");
          break;
        case 2:
          jQuery("body").removeClass("dark-mode");
          jQuery("body").removeClass("text-light");
          jQuery(this).removeClass("active");
          jQuery(this).text("Enable Dark Mode");
          break;
      }
      iteration++;
      if (iteration > 2) iteration = 1;
      $(this).data("iteration", iteration);
    });

    jQuery("#related-items").on("click", function () {
      jQuery("#theme-select-wrapper").fadeIn();
      jQuery("#theme-select").addClass("active");
    });

    jQuery("#theme-select-wrapper").on("click", function () {
      jQuery(this).fadeOut();
      jQuery("#theme-select").removeClass("active");
    });

    $("#html-loader").load("demo/index.php");
  }

  function grid_gallery() {
    jQuery(".grid-item").each(function () {
      var this_col = Number(jQuery(this).parent().attr("data-col"));
      var this_gridspace = Number(jQuery(this).parent().attr("data-gridspace"));
      var this_ratio = eval($(this).parent().attr("data-ratio"));
      jQuery(this).parent().css("padding-left", this_gridspace);
      var w =
        ($(document).width() - (this_gridspace * this_col + 1)) / this_col -
        this_gridspace / this_col;
      var gi = $(this);
      var h = w * this_ratio;
      gi.css("width", w);
      gi.css("height", h);
      gi.find(".pf_title").css("margin-top", h / 2 - 10);
      gi.css("margin-right", this_gridspace);
      gi.css("margin-bottom", this_gridspace);
      $(this).parent().css("padding-top", this_gridspace);
      if (gi.hasClass("large")) {
        $(this).css("width", w * 2 + this_gridspace);
        $(this).css("height", h * 2 + this_gridspace);
      }
      if (gi.hasClass("large-width")) {
        $(this).css("width", w * 2 + this_gridspace);
        $(this).css("height", h);
      }
      if (gi.hasClass("large-height")) {
        $(this).css("height", h * 2 + this_gridspace);
        gi.find(".pf_title").css("margin-top", h - 20);
      }
    });
  }

  /* --------------------------------------------------
   * center-y
   * --------------------------------------------------*/
  function centerY() {
    jQuery(".full-height").each(function () {
      var dh = jQuery(window).innerHeight();
      jQuery(this).css("height", dh);
    });
  }

  /* --------------------------------------------------
   * progress bar
   * --------------------------------------------------*/
  function de_progress() {
    jQuery(".de-progress").each(function () {
      var pos_y = jQuery(this).offset().top;
      var value = jQuery(this).find(".progress-bar").attr("data-value");
      var topOfWindow = jQuery(window).scrollTop();
      if (pos_y < topOfWindow + 550) {
        jQuery(this).find(".progress-bar").css(
          {
            width: value,
          },
          "slow"
        );
      }

      jQuery(this)
        .find(".value")
        .text(jQuery(this).find(".progress-bar").attr("data-value"));
    });
  }
  /* --------------------------------------------------
   * document ready
   * --------------------------------------------------*/
  jQuery(document).ready(function () {
    /* set color begin
         var c_scheme = $.cookie('c_scheme');
         if(c_scheme==undefined){
            c_scheme = "scheme-01";
         }
         jQuery("#colors").attr("href", 'css/colors/' + c_scheme + '.css');
         jQuery(this).addClass("active");
         var lst = c_scheme.charAt(c_scheme.length - 1);
         jQuery(".tc"+lst).addClass("active");
         // set color end*/

    "use strict";
    $("body").show();
    header_styles();
    load_magnificPopup();
    center_xy();
    init_de();
    grid_gallery();
    init_resize();
    de_progress();
    // --------------------------------------------------
    // custom positiion
    // --------------------------------------------------
    var $doc_height = jQuery(window).innerHeight();
    jQuery("#homepage #content.content-overlay").css("margin-top", $doc_height);
    //jQuery('.full-height').css("height", $doc_height);
    //var picheight = jQuery('.center-y').css("height");
    //picheight = parseInt(picheight, 10);
    //jQuery('.center-y').css('margin-top', (($doc_height - picheight) / 2)-100);
    jQuery(".full-height .de-video-container").css("min-height", $doc_height);

    if (jQuery("header").hasClass("autoshow")) {
      $op_header_autoshow = 1;
    }

    centerY();

    // --------------------------------------------------
    // blog list hover
    // --------------------------------------------------
    jQuery(".blog-list")
      .on("mouseenter", function () {
        var v_height = jQuery(this).find(".blog-slide").css("height");
        var v_width = jQuery(this).find(".blog-slide").css("width");
        var newheight = v_height.substring(0, v_height.length - 2) / 2 - 40;
        var owa = jQuery(this).find(".owl-arrow");
        owa.css("margin-top", newheight);
        owa.css("width", v_width);
        owa.fadeTo(150, 1);
        //alert(v_height);
      })
      .on("mouseleave", function () {
        jQuery(this).find(".owl-arrow").fadeTo(150, 0);
      });
    //  logo carousel hover
    jQuery("#logo-carousel img")
      .on("mouseenter", function () {
        jQuery(this).fadeTo(150, 0.5);
      })
      .on("mouseleave", function () {
        jQuery(this).fadeTo(150, 1);
      });
    if ($("#back-to-top").length) {
      backToTop();
    }
    jQuery(".nav-exit").on("click", function () {
      $.magnificPopup.close();
    });
    // --------------------------------------------------
    // navigation for mobile
    // --------------------------------------------------
    jQuery("#menu-btn").on("click", function () {
      var h = jQuery("header")[0].scrollHeight;

      if (mobile_menu_show == 0) {
        jQuery("header.header-mobile").stop(true).animate(
          {
            height: h,
          },
          200,
          "easeOutCubic"
        );
        mobile_menu_show = 1;
      } else {
        jQuery("header.header-mobile").stop(true).animate(
          {
            height: $tmp_h,
          },
          200,
          "easeOutCubic"
        );
        mobile_menu_show = 0;
      }
    });
    jQuery("a.btn").on("click", function (evn) {
      if (this.href.indexOf("#") != -1) {
        evn.preventDefault();
        jQuery("html,body").scrollTo(this.hash, this.hash);
      }
    });
    jQuery(".de-gallery .item .icon-info").on("click", function () {
      jQuery(".page-overlay").show();
      url = jQuery(this).attr("data-value");
      jQuery("#loader-area .project-load").load(url, function () {
        jQuery("#loader-area").slideDown(500, function () {
          jQuery(".page-overlay").hide();
          jQuery("html, body").animate(
            {
              scrollTop: jQuery("#loader-area").offset().top - 70,
            },
            500,
            "easeOutCubic"
          );
          //
          jQuery(".image-slider").owlCarousel({
            items: 1,
            singleItem: true,
            navigation: false,
            pagination: true,
            autoPlay: false,
          });
          jQuery(".container").fitVids();
          jQuery("#btn-close-x").on("click", function () {
            jQuery("#loader-area").slideUp(500, function () {
              jQuery("html, body").animate(
                {
                  scrollTop: jQuery("#section-portfolio").offset().top - 70,
                },
                500,
                "easeOutCirc"
              );
            });
            return false;
          });
        });
      });
    });
    jQuery(".de-gallery .item").on("click", function () {
      $("#navigation").show();
    });
    // btn arrow up
    jQuery(".arrow-up").on("click", function () {
      jQuery(".coming-soon .coming-soon-content").fadeOut(
        "medium",
        function () {
          jQuery("#hide-content").fadeIn(600, function () {
            jQuery(".arrow-up").animate(
              {
                bottom: "-40px",
              },
              "slow"
            );
            jQuery(".arrow-down").animate(
              {
                top: "0",
              },
              "slow"
            );
          });
        }
      );
    });
    // btn arrow down
    jQuery(".arrow-down").on("click", function () {
      jQuery("#hide-content").fadeOut("slow", function () {
        jQuery(".coming-soon .coming-soon-content").fadeIn(800, function () {
          jQuery(".arrow-up").animate(
            {
              bottom: "0px",
            },
            "slow"
          );
          jQuery(".arrow-down").animate(
            {
              top: "-40",
            },
            "slow"
          );
        });
      });
    });
    /* --------------------------------------------------
          after window load
          * --------------------------------------------------*/

    video_autosize();
    filter_gallery();
    custom_bg();
    menu_arrow();
    load_owl();
    custom_elements();
    init();
    //hide preloader after loaded
    jQuery("#preloader").delay(500).fadeOut(500);
    // one page navigation
    /**
     * This part causes smooth scrolling using scrollto.js
     * We target all a tags inside the nav, and apply the scrollto.js to it.
     */
    jQuery("#homepage nav a, .scroll-to").on("click", function (evn) {
      if (this.href.indexOf("#") != -1) {
        evn.preventDefault();
        jQuery("html,body").scrollTo(this.hash, this.hash);
      }
    });
    sequence();
    sequence_a();

    $(".accordion-section-title").click(function (e) {
      var currentAttrvalue = $(this).data("tab");
      if ($(e.target).is(".active")) {
        $(this).removeClass("active");
        $(".accordion-section-content:visible").slideUp(300);
      } else {
        $(".accordion-section-title")
          .removeClass("active")
          .filter(this)
          .addClass("active");
        $(".accordion-section-content")
          .slideUp(300)
          .filter(currentAttrvalue)
          .slideDown(300);
      }
    });

    /* --------------------------------------------------
     * window | on resize
     * --------------------------------------------------*/
    $(window).resize(function () {
      init_resize();
      centerY();
      grid_gallery();
    });
    /* --------------------------------------------------
     * window | on scroll
     * --------------------------------------------------*/
    jQuery(window).on("scroll", function () {
      /* functions */
      header_sticky();
      de_counter();
      de_progress();
      init();
      backToTop();
      moveItItemNow();
      /* plugin | stellar */
      $.stellar({
        horizontalScrolling: false,
        verticalOffset: 0,
      });

      /* fade base scroll position */
      var target = $(".fadeScroll");
      var targetHeight = target.outerHeight();
      var scrollPercent = (targetHeight - window.scrollY) / targetHeight;
      if (scrollPercent >= 0) {
        target.css("opacity", scrollPercent);
      } else {
        target.css("opacity", 0);
      }
      // custom page with background on side
      jQuery(".side-bg").each(function () {
        jQuery(this)
          .find(".image-container")
          .css(
            "height",
            jQuery(this).find(".image-container").parent().css("height")
          );
      });
      /* go to anchor */
      jQuery("#mainmenu li a").each(function () {
        var cur = jQuery(this);
        if (this.href.indexOf("#") != -1) {
          var href = jQuery(this).attr("href");
          if (location.hash !== "") {
            if (jQuery(window).scrollTop() > jQuery(href).offset().top - 140) {
              clearTimeout($.data(this, "scrollCheck"));
              $.data(
                this,
                "scrollCheck",
                setTimeout(function () {
                  jQuery("#mainmenu li a").removeClass("active");
                  cur.addClass("active");
                }, 250)
              );
            }
          }
        }
      });

      // acc
      $(".toggle").click(function (e) {
        e.preventDefault();

        var $this = $(this);

        if ($this.next().hasClass("show")) {
          $this.next().removeClass("show");
          $this.next().slideUp(350);
        } else {
          $this.parent().parent().find("li .inner").removeClass("show");
          $this.parent().parent().find("li .inner").slideUp(350);
          $this.next().toggleClass("show");
          $this.next().slideToggle(350);
        }
      });
    });
    $(function () {
      "use strict";
      var x = 0;
      setInterval(function () {
        x -= 1;
        $(".bg-loop").css("background-position", x + "px 0");
      }, 50);
    });

    $(window).load(function () {
      filter_gallery();
      new WOW().init();
      window.dispatchEvent(new Event("resize"));

      $(".grid").isotope({
        itemSelector: ".grid-item",
      });
      grid_gallery();
    });
  });
})(jQuery);
