/**
 * Switch Themes
 */
let switches = document.getElementsByClassName('theme-switch')[0].getElementsByTagName('input');
for (let i = 0; i<switches.length; i++) {
	switches[i].onclick = function() {
		document.body.classList = '';
		let theme = this.value;
		switch (theme) {
			case 'one':
				document.body.classList.add('theme1');
				break;
			case 'two':
				document.body.classList.add('theme2');
				break;
			case 'three':
				document.body.classList.add('theme3');
				break;
			default:
				document.body.classList.add('theme1');
		}
	}
}

/**	
 * Calculation
 */
const keys = document.querySelector('.keypad');
const display = document.getElementById('display');

keys.addEventListener('click', e => {
	if (e.target.matches('button')) {
		const key = e.target;
		const action = key.dataset.action;
		const keyContent = key.textContent
		let displayedNum = display.textContent;
		const previousKeyType = keys.dataset.previousKeyType;
		const operator = keys.dataset.operator;
		const firstValue = keys.dataset.firstValue;
		const secondValue = displayedNum;
		
		if (!action) {
			if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
				display.textContent = keyContent;
			} else {
				display.textContent = displayedNum + keyContent;
			}
			
			keys.dataset.previousKeyType = 'number';
		}

		if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
			keys.dataset.previousKeyType = 'operator';
			keys.dataset.operator = action;

			// Click order: number -> operator -> number -> operator -> *show the previous 2 number's result*
			if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
				const calcValue = calculate(firstValue, operator, secondValue);
				display.textContent = calcValue;

				// Update calculated value as firstValue
				keys.dataset.firstValue = calcValue;
			} else {
				// If there are no calculations, set displayedNumber as the firstValue
				keys.dataset.firstValue = displayedNum;
			}
		}

		if (action === 'delete') {
			displayedNum = displayedNum.substring(0, displayedNum.length - 1);
			display.textContent = displayedNum;
			keys.dataset.previousKeyType = 'delete';
		}

		if (action === 'decimal') {
			// check if the display already has a dot
			if (!displayedNum.includes('.')) { 
				display.textContent = displayedNum + '.';
			} else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
				display.textContent = '0.';
			}

			keys.dataset.previousKeyType = 'decimal';
		}

		if (action === 'clear') {
			keys.dataset.firstValue = '';
			keys.dataset.modValue = '';
			keys.dataset.operator = '';
			keys.dataset.previousKeyType = '';
			display.textContent = 0;
			keys.dataset.previousKeyType = 'clear';
		}

		if (action === 'calculate') {
			if(firstValue) {
				if(previousKeyType === 'calculate') {
					firstValue = displayedNum;
					secondValue = keys.dataset.modValue;
				}
				display.textContent = calculate(firstValue, operator, secondValue);
			}
			
			keys.dataset.modValue = secondValue;
			keys.dataset.previousKeyType = 'calculate';
		}
	}
});

const calculate = (n1, operator, n2) => {
	let result = '';

	switch (operator) {
		case 'add':
			result = parseFloat(n1) + parseFloat(n2);
			break;
		case 'subtract':
			result = parseFloat(n1) - parseFloat(n2);
			break;
		case 'multiply':
			result = parseFloat(n1) * parseFloat(n2);
			break;
		case 'divide':
			result = parseFloat(n1) / parseFloat(n2);
			break;
		default:
			result = result;
	}

	return result;
};