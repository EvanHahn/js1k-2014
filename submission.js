// lowercases are global VALUES
// uppercases are global FUNCTIONS
// local values are t, T, i, j, k

// jshint ignore: start

// -- globals and methods and shorthands --

a = new AudioContext;

d(); // remove canvas
d = document;

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

c = 'background';
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

(T = d.createElement(l)).id = 'p'; // <table id="p">
b.appendChild(T); // add table to body
for (i = 8; i --;) {

	k = [];

	T = d.createElement('tr');

	for (j = 8; j --;) {

		// make a <td>
		(t = d.createElement('td')).f = n[i];
		t.width = t.height = 64;
		t.o = Math.random() < .2;
		t[y].transition = 'background-color .2s ease';

		// toggle background and status on click
		t.onclick = function() {
			this.o = !this.o;
		}

		T.appendChild(t); // add column to row
		k.push(t);

	}

	p.appendChild(T); // add row to table
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
	cursor = 'pointer';
	background = f;
}

// -- play that funky music --

b = -1;
setInterval(function() {

	b = (b + 1) % 8;

	for (i = 8; i --;) {
		for (j = 8; j --;) {

			t = r[i][j];

			if (j == b) { // it's the current beat for this one
				if (t.o) {
					P(t.f);
					t[y][c] = '#3b3';
				} else {
					t[y][c] = '#020';
				}
			} else {
				if (t.o) {
					t[y][c] = f;
				} else {
					t[y][c] = o;
				}
			}

		}
	}

}, 500);
