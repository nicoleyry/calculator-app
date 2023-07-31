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