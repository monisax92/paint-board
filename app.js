const board = document.querySelector('.board');
const speedBtns = document.querySelectorAll('[data-setting="speed"]');
const rangeBtns = document.querySelectorAll('[data-setting="hue"]');
const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('.slider-value');

let squaresNr;

let saturationValue = slider.value;
slider.addEventListener('mousemove', () => {
	saturationValue = slider.value;
	sliderValue.textContent = saturationValue;
});

let hue = 360;
let speed = 5; //spead of color disappearing

const setSpeed = e => {
	speedBtns.forEach(btn => btn.classList.remove('btn-active'));
	e.target.classList.add('btn-active');
	speed = e.target.dataset.speed + 's';
	createSquares(speed);
};

const setHue = e => {
	rangeBtns.forEach(btn => btn.classList.remove('btn-active'));
	e.target.classList.add('btn-active');
	hue = Number(e.target.dataset.hue);
};

speedBtns.forEach(btn => {
	btn.addEventListener('click', setSpeed);
});

rangeBtns.forEach(btn => {
	btn.addEventListener('click', setHue);
});

const createSquares = () => {
	board.innerHTML = '';

	for (let i = 0; i < squaresNr; i++) {
		const square = document.createElement('div');
		square.classList.add('square');
		square.style.transitionDuration = speed;
		square.addEventListener('mouseover', () => addColor(square));
		square.addEventListener('mouseout', () => removeColor(square));
		board.appendChild(square);
	}
};

const addColor = square => {
	let h, s;
	if (hue === 360) {
		h = Math.floor(Math.random() * 360);
	} else {
		h = Math.floor(Math.random() * 60) + hue;
	}

	s = saturationValue + '%';

	square.style.backgroundColor = `hsl(${h},${s},50%)`;
};

const removeColor = square => {
	square.style.backgroundColor = 'transparent';
};

const checkSize = () => {
	if (document.body.clientWidth < 570) {
		board.style.width = '400px';
		squaresNr = 225;
	} else {
		board.style.width = '520px';
		squaresNr = 400;
	}
	createSquares();
};

checkSize();
window.addEventListener('resize', checkSize);
// createSquares();
