var started = false;
var mem = [];
var livres = [];

function setup() {
	createCanvas(displayWidth, displayHeight);
	background(200);
}

function draw() {
	if(started){

		settings.tamTotalMem = 8096;
		var marginX = 40;
		var marginY = 20;
		var breakLine = 16;

		drawMem();
		drawLivres();

		// for(var i = 0; i < settings.tamTotalMem / 64; i++){

		// 	if(settings.qtdeLivres > 0 && getRandom(1, 10) % 2 == 0){
		// 		drawLivre(marginX, marginY);
		// 	}else{
		// 		drawEspaco(marginX, marginY);
		// 	}

		// 	marginX += 80;

		// 	if(i + 1 == breakLine){
		// 		marginX = 40;
		// 		marginY += 80;
		// 		breakLine += 16;
		// 	}

		// }
	}
}

function start() {
	started = true;
}

function drawMem() {
	var my = 10;

	fill(150);
	noStroke();
	for(var i = 0; i < settings.tamTotalMem / 1024; i++){
		mem.push(rect(10, my, 1024, 100));
		my += 101;
	}

}

function drawLivres(marginX, marginY) {
	var my = 10;
	for(var i = 0; i < mem.length; i++){
		fill(150, 0, 0, 100);
		rect(50, my, 100, 100);
	}
}

function drawEspaco(marginX, marginY) {
	noStroke();

	fill(0, 0, 150, 80);
	rect(marginX, marginY, 64, 64);
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}