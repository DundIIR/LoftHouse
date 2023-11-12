function selectedApartmentsRow() {
	const apartmentsCards = document.querySelector('.apartments__cards'),
				activeLikeElements = apartmentsCards.querySelectorAll('.card__like.active-like')
	const titles = []

	activeLikeElements.forEach(likeElement => {
			const cardElement = likeElement.closest('.card');
			const titleElement = cardElement.querySelector('.card__title');
			titles.push(titleElement.textContent)
	});

	return titles.join(', ');
}


$.submitForm = async event => {
			event.preventDefault()

			const data = {
					name: document.querySelector('#name').value,
					phone: document.querySelector('#phone').value,
					likeApartments: selectedApartmentsRow()
			};
			console.log(data.name, data.phone)
				
			try {
					const result = await sendForm(data);
					if (result.success) {
							// Если все было корректно, очищаем поля
							document.querySelector('#name').value = ''
							document.querySelector('#phone').value = ''

							alert(`Спасибо за доверие!\nС нами уже связались ${result.message} человек`)
					} else {
							// Если есть ошибки, выводим сообщение в виде alert
							alert(result.message)
					}
			} catch (error) {
					console.error('Произошла ошибка:', error);
			}
}

async function sendForm(data) {
	try {
			const res = await fetch('./php/main.php', {
					method: 'POST',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify(data)
			})
			
			if (!res.ok) {
				throw new Error()
			}
			
			const result = await res.json()

			if (res.status === 201) {
					return { success: true, message: result.message }
			} else {
					return { success: false, message: result.message }
			}
	} catch (error) {
			return { success: false, message: result.message }
	}
}
