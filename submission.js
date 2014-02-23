// jshint ignore: start

S = 64; // how big is the dragon?
W = a.width / 2;
H = a.height / 2;

(function t() {

	c.beginPath();
	c.arc(W, H, 64, 0, 7);
	c.fill();

	requestAnimationFrame(t);

})();
