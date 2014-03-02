// jshint ignore: start

P = (M = Math).PI; // M = Math, P = PI

S = 64; // how big is the dragon?

w = (W = a.width) / 2;
h = (H = a.height) / 2;

l = 0.1; // wing curl amount

(function t() {

	with (c) {

		clearRect(0, 0, W, H);

		fillStyle = '#090';

		beginPath();
		moveTo(w, h);
		quadraticCurveTo(w - S, h + S, w - S * 2, h - S);
		arc(w, h - S, S, P * (1 - l), P * l, true);
		lineTo(w + S * 2, h - S);
		quadraticCurveTo(w + S, h + S, w, h);
		fill();

		save();
		translate(w, h);
		scale(1, 2);
		beginPath();
		arc(w, h, S, 0, 7);
		restore();
		fillStyle = '#000000';
		fill();

	}

	requestAnimationFrame(t);

})();
