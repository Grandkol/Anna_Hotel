$(function() {
    "use strict";

    //------- video popup -------//
    $(".play-btn").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });


    //------- Lightbox  js --------//  
    $('.img-gal').magnificPopup({
      type: 'image',
      gallery: {
          enabled: true
      }
    });

    //------- testimonial carousel --------//  
    if($('.owl-carousel').length > 0){
      $('.testi-carousel').owlCarousel({
        loop:true,
        autoplay: true,
        margin:30,
        smartSpeed: 600,
        nav:false,
        dots: true,
        responsive:{
          0:{
            items:1
          },
          800:{
            items:2
          },
          1000:{
            items:3
          }
        }
      })
    }


  //------- initialize menu --------//    
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  //* Navbar Fixed
  var window_width = $(window).width(),
		window_height = window.innerHeight,
		header_height = $('.default-header').height(),
		header_height_static = $('.site-header.static').outerHeight(),
		fitscreen = window_height - header_height;

	$('.fullscreen').css('height', window_height);
	$('.fitscreen').css('height', fitscreen);
	var nav_offset_top = $('header').height() + 50;
	function navbarFixed() {
		if ($('.header_area').length) {
			$(window).scroll(function() {
				var scroll = $(window).scrollTop();
				if (scroll >= nav_offset_top) {
					$('.header_area').addClass('navbar_fixed');
				} else {
					$('.header_area').removeClass('navbar_fixed');
				}
			});
		}
	}
	navbarFixed();

  
  //------- mobile navigation --------//  
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="lnr lnr-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  //------- Active Nice Select --------//
  $('select').niceSelect();

  //------- mailchimp --------//  
	function mailChimp() {
		$('#mc_embed_signup').find('form').ajaxChimp();
	}
	mailChimp();
	function mailChimp2() {
		$('#mc_embed_signup2').find('form').ajaxChimp();
	}
	mailChimp2();
  
});




/*============ Carousel  =============*/

const handleImageChange = (offset) =>{
    const activeSlide = document.querySelector("[data-active]")
    const slides = [...document.querySelectorAll(".slide")]
    const currentIndex = slides.indexOf(activeSlide)
    let newIndex = currentIndex + offset;

    if(newIndex < 0) newIndex = slides.length - 1
    if(newIndex >= slides.length) newIndex = newIndex = 0

    slides[newIndex].dataset.active = true;
    delete activeSlide.dataset.active
}

const handleImageChange2 = (offset) =>{
    const activeSlide = document.querySelector(".slide2[data-active]")
    const slides = [...document.querySelectorAll(".slide2")]
    const currentIndex = slides.indexOf(activeSlide)
    let newIndex = currentIndex + offset;

    if(newIndex < 0) newIndex = slides.length - 1
    if(newIndex >= slides.length) newIndex = newIndex = 0

    slides[newIndex].dataset.active = true;
    delete activeSlide.dataset.active
}


const onNext = () => handleImageChange(1)
const onPrev = () => handleImageChange(-1)

const onNext2 = () => handleImageChange2(1)
const onPrev2 = () => handleImageChange2(-1)

/*============ End of Carousel  =============*/

/*============ Start of POPUP  =============*/

document.getElementById('submitForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = this;
  var popup = document.getElementById('popup');
  var overlay = document.getElementById('booking-overlay');

  overlay.style.display = 'block';
  popup.style.display = 'block';
  setTimeout(function() {
    overlay.classList.add('show');
    popup.classList.add('show');
  }, 10);

  setTimeout(function() {
    overlay.classList.remove('show');
    popup.classList.remove('show');
    setTimeout(function() {
      overlay.style.display = 'none';
      popup.style.display = 'none';
      form.submit();
    }, 400);
  }, 3000);
});

/*============ End of POPUP  =============*/

function calculateCost() {
    // Periods: [startMD, endMD, rate2, rate3]
    // MD = getMonth()*100 + getDate()  (getMonth is 0-indexed: Apr=3, May=4, Jun=5, Jul=6, Aug=7, Sep=8, Oct=9)
    var periods = [
        [301, 431, 3000, 4000],   // Apr 1 – May 31
        [501, 514, 4000, 5000],   // Jun 1 – Jun 14
        [515, 529, 5000, 6000],   // Jun 15 – Jun 29
        [530, 630, 6000, 7500],   // Jun 30 – Jul 30
        [631, 730, 6500, 8000],   // Jul 31 – Aug 30
        [731, 829, 6000, 7500],   // Aug 31 – Sep 29
        [830, 930, 4000, 5500],   // Sep 30 – Oct 30
    ];

    function rateForNight(date, roomType) {
        var md = date.getMonth() * 100 + date.getDate();
        for (var i = 0; i < periods.length; i++) {
            if (md >= periods[i][0] && md <= periods[i][1]) {
                return roomType === 2 ? periods[i][2] : periods[i][3];
            }
        }
        return null;
    }

    var roomType = parseInt(document.querySelector('input[name="calc-room"]:checked').value);
    var checkinVal = document.getElementById('calc-checkin').value;
    var checkoutVal = document.getElementById('calc-checkout').value;
    var extraBed = document.getElementById('calc-extra-bed').checked;
    var resultEl = document.getElementById('calc-result');

    if (!checkinVal || !checkoutVal) {
        resultEl.innerHTML = '<p class="calc-error">Пожалуйста, выберите даты заезда и отъезда.</p>';
        return;
    }

    var checkin = new Date(checkinVal);
    var checkout = new Date(checkoutVal);

    if (checkout <= checkin) {
        resultEl.innerHTML = '<p class="calc-error">Дата отъезда должна быть позже даты заезда.</p>';
        return;
    }

    var total = 0;
    var current = new Date(checkin);

    while (current < checkout) {
        var rate = rateForNight(current, roomType);
        if (rate === null) {
            resultEl.innerHTML = '<p class="calc-error">Отель не работает в выбранный период. Бронирование доступно с апреля по октябрь.</p>';
            return;
        }
        total += rate + (extraBed ? 1000 : 0);
        current.setDate(current.getDate() + 1);
    }

    var nights = Math.round((checkout - checkin) / 86400000);
    var roomName = roomType === 2 ? '2х местный' : '3х местный';
    var extraText = extraBed ? ' + доп. место' : '';

    resultEl.innerHTML =
        '<div class="calc-success">' +
        '<p><strong>Номер:</strong> ' + roomName + extraText + '</p>' +
        '<p><strong>Количество ночей:</strong> ' + nights + '</p>' +
        '<p class="calc-total"><strong>Итого: ' + total.toLocaleString('ru-RU') + ' ₽</strong></p>' +
        '</div>';
}