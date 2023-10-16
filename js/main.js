// Header nav

const navBtn = document.querySelector('.nav-icon-btn'),
			navIcon = document.querySelector('.nav-icon'),
			nav = document.querySelector('.header__top-row');

navBtn.onclick = function() {
	navIcon.classList.toggle('nav-icon--active');
	nav.classList.toggle('header__top-row--mobile');
	document.body.classList.toggle('no-scroll');
}

// var scroll_position = 0;
// var scroll_top = 0;

// $(window).on("mousewheel DOMMouseScroll", function(e) {

// 	var target = $(this).scrollTop();

// 	if(parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail) >= 0) {

// 		if((scroll_position - target) > 200) {

// 			$(".activereadsettings").removeClass("displaynone");

// 			scroll_position = 0;

// 		}

// 	} else {

// 		$(".activereadsettings").addClass("displaynone");

// 		scroll_position = target;

// 	}

// });