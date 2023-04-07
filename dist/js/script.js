$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 1200,
    adaptiveHeight: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="icons/feedback/slider_left.svg"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icons/feedback/slider_right.svg"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: false,
          arrows: false,
        },
      },
    ],
  });

  window.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".promo__menu"),
      menuItem = document.querySelectorAll(".menu_item"),
      hamburger = document.querySelector(".hamburger");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("hamburger_active");
      menu.classList.toggle("promo__menu_active");
    });

    menuItem.forEach((item) => {
      item.addEventListener("click", () => {
        hamburger.classList.toggle("hamburger_active");
        menu.classList.toggle("promo__menu_active");
      });
      /* window.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
          hamburger.classList.remove("hamburger_active");
          menu.classList.remove("promo__menu_active");
        }
      }); */
    });
  });

  /* $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  ); */

  /* $(".catalog-item__link").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog-item__content")
        .eq(i)
        .toggleClass("catalog-item__content_active");
      $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
    });
  });

  $(".catalog-item__back").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog-item__content")
        .eq(i)
        .toggleClass("catalog-item__content_active");
      $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
    });
  }); */

  /* function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }

  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });

  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  }); */

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("*Введите мин {0} символа!"),
        },
        phone: "*Пожалуйста, введите свой телефон",
        email: {
          required: "Введите адрес почты ",
          email: "*Должен быть в формате name@domain.com",
        },
      },
    });
  }

  validateForms("#consultation-form");
  validateForms("#consultation-request");
  /* validateForms("#order form"); */

  $("input[name=phone]").mask("+3 (999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation-form, #consultation-request").fadeOut(fast);
      $("#thanks").fadeIn("slow");

      $("form").trigger("reset");
    });
    return false;
  });

  //Smooth scroll and pageup.

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });
  $("a[href=#up]").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
  });
  new WOW().init();
});
