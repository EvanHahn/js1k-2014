// lowercases are global VALUES
// uppercases are global FUNCTIONS
// local values are t, T, i, j, k

// jshint ignore: start

// -- globals and methods and shorthands --

a = new AudioContext;

d(); // remove canvas
d = document;

HTMLElement.prototype.A = function(element) {
	this.appendChild(element);
};

function C(tagName) {
	return d.createElement(tagName);
}

function P(f, n, g, o) { // play a note with frequency
	n = a.currentTime;
	g = a.createGain();
	with (g) {
		with (gain) {
			setValueAtTime(1, n);
			linearRampToValueAtTime(1, n);
			linearRampToValueAtTime(0, n + 1);
		}
		connect(a.destination);
	}
	o = a.createOscillator();
	with (o) {
		type = 0;
		frequency.value = f;
		connect(g);
	}
	if (o.noteOn) {
		o.noteOn(n);
		o.noteOff(n + 1);
	} else {
		o.start(n);
		o.stop(n + 1);
	}
	setTimeout(function() {
		o.disconnect(g);
		g.disconnect(a.destination);
	}, 1e3);
}

l = 'table';
y = 'style';

f = '#fff';
o = '#000';

n = [
	123.47,
	196,
	246.94,
	392,
	493.88,
	783.99,
	987.77,
	1567.98
];

r = [];

// -- add the elements to the DOM --

(T = C(l)).id = 'p'; // <table id="p">
b.A(T); // add table to body
for (i = 8; i --;) {

	k = [];

	T = C('tr');

	for (j = 8; j --;) {

		// make a <td>
		(t = C('td')).f = n[i];
		t.width = t.height = 64;
		t.o = Math.random() > .2;
		t[y].transition = 'background-color .1s ease';

		// toggle background and status on click
		(t.onclick = function() {
			with (this) {
				o = !o;
				className = o ? 'o' : '';
			}
		}).call(t);

		T.A(t); // add column to row
		k.push(t);

	}

	p.A(T); // add row to table
	r.push(k);

}

// -- styles --

i = '100%';
with (d.documentElement[y]) {
	display = l;
	width = height = i;
	background = '#222';
}
with (b[y]) {
	display = l + '-cell';
	width = height = i;
	verticalAlign = 'middle';
	fontFamily = 'sans-serif';
}
with (p[y]) {
	margin = '0 auto';
	background = f;
}

// -- play that funky music --

b = -1;
k = 'background';
setInterval(function() {

	b = (b + 1) % 8;

	for (i = 8; i --;) {
		for (j = 8; j --;) {

			t = r[i][j];

			if (j == b) { // it's the current beat for this one
				if (t.o) {
					P(t.f);
					t[y][k] = '#f34';
				} else {
					t[y][k] = '#200';
				}
			} else {
				if (t.o) {
					t[y][k] = f;
				} else {
					t[y][k] = o;
				}
			}

		}
	}

}, 500);
