/*
 * Copyright 2018 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

(function ($) {
  "use strict";

  // Dim body div when nav is activated
  function dimBody () {
    $("header + .container-fluid").addClass("dim");
    $("#navbar").addClass("dropShadow");
  }

  // Hover nav w/ scope
  function removeNavClasses () {
    $('#scope').removeClass('downloads-scope topics-scope documentation-scope install-scope');
    $('.dropdown').removeClass('show');
    $("header + .container-fluid").removeClass("dim");
    $("#navbar").removeClass("dropShadow");
  }

  $('#download-navBarItem').mouseenter(function () {
    $("#download-navBarItem").addClass("show");
    $("#documentation-navBarItem").removeClass("show");
    $("#quickstart-navBarItem").removeClass("show");
    $("#learn-navBarItem").removeClass("show");
    $("#install-navBarItem").removeClass("show");
    dimBody();
  });

  $('#install-navBarItem').mouseenter(function () {
    $("#install-navBarItem").addClass("show");
    $("#documentation-navBarItem").removeClass("show");
    $("#quickstart-navBarItem").removeClass("show");
    $("#learn-navBarItem").removeClass("show");
    $("#download-navBarItem").removeClass("show");
    dimBody();
  });

  $("#quickstart-navBarItem").mouseenter(function () {
    $("#quickstart-navBarItem").addClass("show");
    $("#documentation-navBarItem").removeClass("show");
    $("#install-navBarItem").removeClass("show");
    $("#learn-navBarItem").removeClass("show");
    $("#download-navBarItem").removeClass("show");
    dimBody();
  });

  $('#learn-navBarItem').mouseenter(function () {
    $("#learn-navBarItem").addClass("show");
    $("#documentation-navBarItem").removeClass("show");
    $("#install-navBarItem").removeClass("show");
    $("#quickstart-navBarItem").removeClass("show");
    $("#download-navBarItem").removeClass("show");
    dimBody();
  });

  $('#documentation-navBarItem').mouseenter(function () {
    $("#documentation-navBarItem").addClass("show");
    $("#install-navBarItem").removeClass("show");
    $("#quickstart-navBarItem").removeClass("show");
    $("#learn-navBarItem").removeClass("show");
    $("#download-navBarItem").removeClass("show");
    dimBody();
  });

  $('#navbar, .drop-menu').mouseleave(function () {
    removeNavClasses();
  });

  $( ".dropdown-item" ).focus(function() {
    $(".dropdown").removeClass("show");
    var parentDropdown = $(this).closest(".dropdown")
    parentDropdown.addClass("show");
    $("#scope").addClass(parentDropdown.attr("id") + "-scope");
  });

  $( "a:not(.dropdown-item)" ).focus(function() {
    $(".dropdown").removeClass("show");
    $("#scope").removeClass();
  });

  //Header search
  $("header li .search-icon").click(function () {
    $("#search-nav").slideToggle();
    //$(this).toggleClass('close');
    $("#searchheaderform input").focus();
  });

  $("header li .search-icon").keypress(function (e) {
    if (e.which == 13) {
      $("#search-nav").slideToggle();
      $("#searchheaderform input").focus();
    }
  });

  $("#search-nav").on('keydown', function(event) {
    if (event.key == "Escape") {
      $("#search-nav").slideToggle();
    }
  });

  $(".search-hide").click(function () {
    $("#search-nav").slideToggle();
    $(this).toggleClass("close");
    $("#searchheaderform input").focus();
  });

  $(".search-hide").keypress(function () {
    $("#search-nav").slideToggle();
    $(this).toggleClass("close");
    $("#searchheaderform input").focus();
  });

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    $(".popover-dismiss").popover({
      trigger: "focus",
    });

    //Samples page filters
    $(".filters .filter").click(function () {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
      } else {
        this.classList.add("active")
        if($(this).attr("filter") === "all") {
          $(this).siblings().removeClass("active")
        } else {
          $("[filter=all]").removeClass("active")
        }
      }
      updateFilters()
    });

    //Newsletter
    $(".click-to-show").click(function () {
      $(this).hide();
      $(".hidden").slideToggle();
    });
    $(".scroll-to-bottom").click(function () {
      $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    });

    // Team Index Page
    //// Make social links works inside clickable div
    $("div.person div.card").click(function () {
      window.location = $(this).find("a").attr("href");
    });
    $("div.card a").click(function (e) {
      e.stopPropagation();
    });

    // Theme Toggle Section
    $("#theme-toggle").click(()=>{toggleTheme()})
    $("#theme-toggle").keyup((e) => {
      if (e.which == 13 || e.which == 32) {
        toggleTheme()
        $("header + .container-fluid").removeClass("dim");
      }
    });
    $("#theme-toggle").keydown(function (e) {
      if (e.which == 9) {
        if ($(".promo-nav-banner a[href]").length) {
          $(".promo-nav-banner a[href]").focus();
        } else {
          $("header").nextAll().find("a[href]:not([href*='#'])").first().focus();
        }
      }
    });

    $("#mobile-theme-toggle").click(()=>{toggleTheme()})
    $("#mobile-theme-toggle").keyup((e) => {
      if (e.which == 13 || e.which == 32) {
        toggleTheme()
        $("header + .container-fluid").removeClass("dim");
      }
    });
    $("#mobile-theme-toggle").keydown(function (e) {
      if (e.which == 9) {
        if ($(".promo-nav-banner a[href]").length) {
          $(".promo-nav-banner a[href]").focus();
        } else {
          $("header").nextAll().find("a[href]:not([href*='#'])").first().focus();
        }
      }
    });

    //Open external links/rss in new tab, tvc links in same tab
    $("a[href^='http']").attr("target", "_blank");
    $("a[href^='https://gemfire.dev']").attr("target", "_self");
    $("a[href*='rss']").attr("target", "_blank");

    //Open youtube links with class 'lightbox' in lightbox
    $("a.lightbox[href*=youtube]").click(function () {
      var href = $(this).attr("href");
      $(this).attr(
        "href",
        href + "?autoplay=1&autohide=1&showinfo=0&controls=1"
      );
      $.fancybox({
        padding: 0,
        href: this.href.replace(new RegExp("watch\\?v=", "i"), "embed/"),
        type: "iframe",
        width: 1000,
        height: 560,
        autoSize: false,
        fitToView: true,
      });
      return false;
    });

    $(".lightbox").fancybox({
      padding: 0,
    });

    //Show contact form lightbox if #contact in URL
    if (window.location.hash.indexOf("contact") > -1) {
      $("a.lightbox[href*=contact]").trigger("click");
    }

    //Adjust styles on embedded Marketo contact form on rabbmq-vs-kafka blog
    if (location.href.indexOf("rabbitmq-vs-kafka") > -1) {
      var checkContactFormExistsConsent = setInterval(function(){
        if ($('#contact .mktoForm input[id*=First]').length) {
          $('#contact .mktoForm select#Country').change(function(){
            if ($('#contact .mktoForm input[name=Phone_Consent__c]').length) {
              $("#contact .mktoForm input[type=checkbox]").parents("#contact .mktoForm .mktoFormCol").attr('style', 'width: auto');
              $(".fancybox-inner").attr('style','overflow-x: hidden');
            }
          });
          clearInterval(checkContactFormExistsConsent);
        }
      }, 100);
    }


    //Copy videos index iframe embed URLs to parent for lightbox
    $(".youtube-container").each(function () {
      var src = $(this)
        .children(".youtube-small")
        .attr("src")
        .replace("?wmode=transparent&rel=0&modestbranding=1", "");
      $(this).attr("href", src);
    });

    //Open youtube embeds in lightbox
    $(".youtube-container").click(function () {
      var href = $(this).attr("href");
      $(this).attr(
        "href",
        href + "?autoplay=1&autohide=1&showinfo=0&controls=1"
      );
      $.fancybox({
        padding: 0,
        href: this.href,
        type: "iframe",
        width: 1000,
        height: 560,
        autoSize: false,
        fitToView: true,
      });

      return false;
    });

    //Toggle mobile menu
    $("#menu-toggle").click(function () {
      $("#mobile-nav, #menu-toggle, body, nav").toggleClass("isOpen");
    });
    //Capture shift+tab from main content to menu
    if ($(".promo-nav-banner a[href]").length) {
      $(".promo-nav-banner a[href]").keydown(function(e){
        if (e.shiftKey && e.which == "9") {
          e.preventDefault();
          $("#theme-select").focus();
          $("#menu-bars").focus();
        }
      });
    } else {
      $("header").nextAll().find("a[href]:not([href*='#'])").first().keydown(function(e){
        if (e.shiftKey && e.which == "9") {
          e.preventDefault();
          $("#theme-select").focus();
          $("#menu-bars").focus();
        }
      });
    }
  });

  function bottomPos(element) {
    return element.offset().top + element.outerHeight();
  }

  // Bootstrap Fixed Header
  $(function () {
    var promo = $(".js-td-cover");
    if (!promo.length) {
      return;
    }
    var promoOffset = bottomPos(promo);
    var navbarOffset = $(".js-navbar-scroll").offset().top;

    var threshold = Math.ceil($(".js-navbar-scroll").outerHeight());
    if (promoOffset - navbarOffset < threshold) {
      $(".js-navbar-scroll").addClass("navbar-bg-onscroll");
    }

    $(window).on("scroll", function () {
      var navtop = $(".js-navbar-scroll").offset().top - $(window).scrollTop();
      var promoOffset = bottomPos($(".js-td-cover"));
      var navbarOffset = $(".js-navbar-scroll").offset().top;
      if (promoOffset - navbarOffset < threshold) {
        $(".js-navbar-scroll").addClass("navbar-bg-onscroll");
      } else {
        $(".js-navbar-scroll").removeClass("navbar-bg-onscroll");
        $(".js-navbar-scroll").addClass("navbar-bg-onscroll--fade");
      }
    });
  });



  // Featured Quickstarts
  $( ".quickstart-card" ).mouseenter(function() {
    $(".quickstart-card").removeClass("active");
    $(this).addClass("active");
  });

  // Beyond Agenda Toggle
  $( ".day" ).click(function() {
    $(".day").removeClass("active");
    $(this).addClass("active");

    if( $(this).attr('id') === 'day-1') {
      $("#day-2-agenda").hide();
      $("#day-1-agenda").show();
    }
    else {
      $("#day-1-agenda").hide();
      $("#day-2-agenda").show();
    }
  });
  
}(jQuery));