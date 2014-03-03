// lowercases are global VALUES
// uppercases are global FUNCTIONS
// local values are t, T, i, j, k

// jshint ignore: start

// -- globals and methods and shorthands --

a = new AudioContext;

d(); // remove canvas

function P(f) { // play a note with frequency

	t = a.currentTime;

	g = a.createGain();
	with (g) {
		with (gain) {
			setValueAtTime(1, t);
			linearRampToValueAtTime(0, t + 1);
		}
		connect(a.destination);
	}

	o = a.createOscillator();
	o.frequency.value = f;
	o.connect(g);
	if (o.noteOn) {
		o.noteOn(t);
		o.noteOff(t + 1);
	} else {
		o.start(t);
		o.stop(t + 1);
	}

	setTimeout(function() {
		o.disconnect(g);
		g.disconnect(a.destination);
	}, 1e3);

}

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

T = document.createElement('table');
T.id = 'p';
b.appendChild(T); // add table to body
for (i = 8; i --;) {

	T = document.createElement('tr');

	for (j = 8; j --;) {

		// make a <td>
		t = document.createElement('td');
		t.f = n[i];
		t.width = t.height = 64;
		t.style.transition = 'background-color .2s ease';

		// toggle background and status on click
		t.onclick = function() {
			this.o = !this.o;
		};

		T.appendChild(t); // add column to row
		r.push(t);

	}

	p.appendChild(T); // add row to table

}

// -- styles --

with (document.documentElement.style) {
	display = 'table';
	width = height = '100%';
	background = '#222';
}
with (b.style) {
	display = 'table-cell';
	width = height = '100%';
	verticalAlign = 'middle';
	textAlign = 'center';
	fontFamily = 'sans-serif';
	color = '#fff';
}
with (p.style) {
	margin = '1em auto';
	cursor = 'pointer';
	background = '#fff';
}

// -- play that funky music --

b = 7;
setInterval(function() {

	b = (++b) % 8;

	for (i = 64; i --;) {

		if ((i % 8) == b) { // it's the current beat for this one
			if (r[i].o) {
				P(r[i].f);
				r[i].style.background = '#3b3';
			} else {
				r[i].style.background = '#020';
			}
		} else {
			if (r[i].o) {
				r[i].style.background = '#fff';
			} else {
				r[i].style.background = '#000';
			}
		}

	}

}, 500);

// -- reset stuff --

(function R() {
	for (i = 64; i --;) {
		r[i].o = Math.random() < .3;
	}
})();
