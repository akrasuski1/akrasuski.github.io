
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function fmt(arr) {
// [["promo", "nazwa"], ...] -> "promo\tnazwa\n..."
	res = ""
	for (elem of arr) {
		line = "<b>" + elem[1] + "</b>";
		while (line.length < 30) { line = " " + line }
		line += " (" + elem[0] + ")\n"
		res += line
	}
	return res;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rng() {
	maxrng = parseInt(document.getElementById('rng_max').value);
	r = getRandomInt(1, maxrng)
	document.getElementById("rng").innerHTML = r;
}

function randomize() {
	maxsets = parseInt(document.getElementById('maxsets').value);
	allsets = ["Dominion", "Intryga", "Przysta\u0144", "Z\u0142oty wiek",
		"W g\u0142\u0105b l\u0105du/Hinterlands", "Pie\u015b\u0144 nocy/Nocturne",
"W nieznane!/Adventures", "Imperium", "Renesans", "Menagerie", "Zdobycze"]
	landscapes = ["Zdarzenie", "Krajobraz", "Projekt", "Droga", "Cecha"]

	chosen_cards = []
	for (const elem of cardjson["Promo"]) {
		if (Math.random() < 1.0/500) {
			chosen_cards.push(["Promo", elem]);
		}
	}

	
	shuffle(allsets)
	possible_cards = []
	for (i = 0; i < Math.min(maxsets, allsets.length); i++) {
		for (elem of cardjson[allsets[i]]) {
			possible_cards.push([allsets[i], elem])
		}
		v2 = cardjson[allsets[i] + " v2"]
		if (v2 != undefined){
			for (elem of v2) {
				possible_cards.push([allsets[i] + " v2", elem])
			}
		}
	}

	shuffle(possible_cards);
	for (i = 0; chosen_cards.length < 10; i++) {
		chosen_cards.push(possible_cards[i]);
	}
	chosen_cards.sort();

	chosen_horiz = [];
	for (i = 0; i < 2; i++) {
		shuffle(landscapes);
		shuffle(cardjson[landscapes[0]]);
		chosen_horiz.push([landscapes[0], cardjson[landscapes[0]][0]]);
	}

	zloty = 0
	for (elem of chosen_cards) {
		if (elem[0] == "Z\u0142oty wiek" || elem[0] == "Z\u0142oty wiek v2") {
			zloty++;
		}
	}
	console.log("zloty", zloty)
	if (Math.random() < zloty/10.0) {
		chosen_horiz.push(["Skarb", "Platyna"])
		chosen_horiz.push(["Zwyciestwo", "Kolonia"])
	}

	cardlist=fmt(chosen_cards);
	console.log(chosen_cards);
	console.log(cardlist);
	horizlist=fmt(chosen_horiz);
	
	document.getElementById("cardlist").innerHTML=cardlist;
	document.getElementById("horizlist").innerHTML=horizlist;
}
// v2
// platyna/kolonia
//
// promo (1/500 chance?)
	
