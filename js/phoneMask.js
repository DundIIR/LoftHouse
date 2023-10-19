document.addEventListener("DOMContentLoaded", function() {
	let phoneInputs = document.querySelectorAll('.tel');

	let getInputNumbersValue = function(input) {
		return input.value.replace(/\D/g, "");
	}

	let onPhoneInput = function(e) {
		let input = e.target,
				inputNumbersValue = getInputNumbersValue(input),
				formattedInputValue = "",
				selectionStart = input.selectionStart;

		if(!inputNumbersValue) {
			return input.value = "";
		}

		if(input.value.length != selectionStart) {
			console.log(e)
			if(e.data && /\D/g.test(e.data)){
				console.log(inputNumbersValue);
				input.value = inputNumbersValue;
			}
			return;
		}

		if(["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1){
			if(inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
			let firstSymobls = (inputNumbersValue[0] == "8") ? "8" : "+7";
			formattedInputValue = firstSymobls + " ";
			if(inputNumbersValue.length > 1) {
				formattedInputValue += "(" + inputNumbersValue.substring(1, 4)
			}
			if(inputNumbersValue.length >= 5) {
				formattedInputValue += ") " + inputNumbersValue.substring(4, 7)
			}
			if(inputNumbersValue.length >= 8) {
				formattedInputValue += " " + inputNumbersValue.substring(7, 9)
			}
			if(inputNumbersValue.length >= 10) {
				formattedInputValue += "-" + inputNumbersValue.substring(9, 11)
			}
		} else {
			formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
		}
		input.value = formattedInputValue;
	}
	
	let onPhoneKeyDown = function(e) {
		let input = e.target;
		if(e.keyCode == 8 && getInputNumbersValue(input).length == 1){
			e.target.value = "";
		}
	}

	let onPhonePaste = function(e) {
		let pasted = e.clipboardData || window.clipboardData,
				input = e.target,
				inputNumbersValue = getInputNumbersValue(input);
		if(pasted) {
			let pastedText = pasted.getData("Text");
			if(/\D/g.test(pastedText)) {
				input.value = inputNumbersValue;
			}
		}
	}

	for(i=0; i < phoneInputs.length; i++) {
		let input = phoneInputs[i];
		input.addEventListener("input", onPhoneInput);
		input.addEventListener("keydown", onPhoneKeyDown);
		input.addEventListener("paste", onPhonePaste);
	}


})