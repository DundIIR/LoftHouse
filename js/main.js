// Создание главного плагина 
const $ = {};



// Like Card
const likeCard = document.querySelector('.apartments__cards')
likeCard.addEventListener('click', event => {
	var btnLike = event.target.closest('.card__like');
	if (btnLike) {
			btnLike.classList.toggle('active-like');
	}
})

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
			hintContent: 'Наб. реки Фонтанки 10-15',
			// balloonContent: 'Баллун'
		}, {
			// Опции.
			// Необходимо указать данный тип макета.
			iconLayout: 'default#image',
			// Своё изображение иконки метки.
			iconImageHref: './img/map/map-icon.svg',
			// Размеры метки.
			iconImageSize: [27, 37],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-13.5, -37]
		});

		myMap.controls.remove('geolocationControl'); // удаляем геолокацию
		myMap.controls.remove('searchControl'); // удаляем поиск
		myMap.controls.remove('trafficControl'); // удаляем контроль трафика
		myMap.controls.remove('typeSelector'); // удаляем тип
	
		// myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
		// myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
		myMap.controls.remove('rulerControl'); // удаляем контрол правил
		myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
	

		myMap.geoObjects
        .add(myPlacemark);
}