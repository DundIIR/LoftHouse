// Header nav

const navBtn = document.querySelector('.nav-icon-btn'),
			navIcon = document.querySelector('.nav-icon'),
			nav = document.querySelector('.header__top-row');

navBtn.onclick = function() {
	navIcon.classList.toggle('nav-icon--active');
	nav.classList.toggle('header__top-row--mobile');
	document.body.classList.toggle('no-scroll');
}

// Yandex Map

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
		// Создание карты.
		var myMap = new ymaps.Map("map", {
				// Координаты центра карты.
				// Порядок по умолчанию: «широта, долгота».
				// Чтобы не определять координаты центра карты вручную,
				// воспользуйтесь инструментом Определение координат.
				center: [59.94356453020145,30.338917271163496],
				// Уровень масштабирования. Допустимые значения:
				// от 0 (весь мир) до 19.
				zoom: 16
		}),
		myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
			hintContent: 'Собственный значок метки',
			balloonContent: 'Это красивая метка'
		}, {
			// Опции.
			// Необходимо указать данный тип макета.
			iconLayout: 'default#image',
			// Своё изображение иконки метки.
			iconImageHref: './img/socials/vk.svg',
			// Размеры метки.
			iconImageSize: [50, 50],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-5, -38]
		});

		myMap.geoObjects
        .add(myPlacemark);
}