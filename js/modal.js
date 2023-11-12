function _createModal(options) {
	const modal = document.createElement('div')
	modal.classList.add('modal')
	modal.insertAdjacentHTML('afterbegin', `
	<div class="modal-overlay" data-close="true">
			<div class="modal-window">
				<div class="modal__header">
					<p class="modal__header-title title-2">Обратная связь</p>
					<div class="modal__header-close" data-close="true">&times;</div>
				</div>
				<form class="modal__form form">
					<p class="form__privacy form__privacy--bottom">*Мы никому не передаем ваши данные. <br>И не сохраняем ваш номер в базу.</p>
					<input id="name" type="text" class="form__input" placeholder="Ваше имя" autocomplete="off">
					<input id="phone" type="tel" class="form__input tel" placeholder="Ваш телефон" autocomplete="off" maxlength="18">
					<button type="submit" class="form__btn">Посмотреть район</button>
				</form>
			</div>
		</div>
	`)
	document.body.appendChild(modal)
	return modal
}

$.modal = function(options) {
	const $modal = _createModal(options)
	const ANIMATION_SPEED = 200
	let closing = false
	let destroyed = false

	const modal = {
		open() {
			if(destroyed){
				return console.log('Modal is destroyed')
			}
			!closing && $modal.classList.add('open')
			!closing && $modal.addEventListener('submit', $.submitForm)
		},
		close() {
			closing = true
			$modal.classList.remove('open')
			$modal.classList.add('hide')
			$modal.removeEventListener('submit', $.submitForm)
			setTimeout(() => {
				$modal.classList.remove('hide')
				closing = false
			}, ANIMATION_SPEED)
		}
	}

	const listener = event => {
		if(event.target.dataset.close) {
			modal.close()
		}
	}

	$modal.addEventListener('click', listener)

	return Object.assign(modal, {
			destroy() {
				$modal.parentNode.removeChild($modal)
				$modal.removeEventListener('click', listener)
				destroyed = true
			}
		})
}

const modal = $.modal()

const modalBtns = document.querySelectorAll('#btn-open')
modalBtns.forEach(btn => {
	btn.addEventListener('click', () => {
	modal.open() })
})
	

