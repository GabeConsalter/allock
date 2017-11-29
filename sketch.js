var
	started = false,
	memory,
	allocks,
	uiAllocks = [],
	uiBlocks = [],
	screenPadding = 20,
	lim = 10
;

function setup() {
	if(started){
		createCanvas(displayWidth, displayHeight);
		background(255);
		makeAllock();
		makeBlock();
	}
}

function draw() {
	if(started){

		drawNomeAlgoritmo(algoritmos[settings.algoritmo]);
		drawAllocks();
		drawMemory();
		drawBlocks();
	}
}

function start(m, a) {
	started = true;
	memory = m;
	allocks = a;
	setup();
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor(){
	let colors = ['2e5266','ba3f1d','521945','912f56','02111b','5d737e','df2935','86ba90','496ddb','ee8434','550527','f44708','ee2677','297373','c6d8d3','2f4858'];
	return '#' + colors[Math.floor(Math.random() * colors.length)];
}

function drawNomeAlgoritmo(algoritmo) {
	noStroke();
	fill('#EFEFEF');
	textSize(128);
	textAlign(CENTER);
	text(algoritmo, width/2, height/2 - 25);
}

function makeAllock() {
	allocks.map((el, i) => {
		uiAllocks.push(new Allock(
				i,
				i > 0 ? uiAllocks[i-1].x + uiAllocks[i-1].w + 20 : screenPadding,
				el,
				getRandomColor()
			));
	});
}

function makeBlock() {
	memory.blocks.map((el, i) => {
		uiBlocks.push(new Block(
			i,
			i > 0 ? uiBlocks[i-1].x + uiBlocks[i-1].w : width/2 - 512,
			el.size,
			el.free
		));
	});

	console.log(uiBlocks);
}

function drawAllocks() {
	fill('#EFEFEF');
	rect(0, height - 300, width, 300, 20, 20, 20, 20);
	fill(130);
	textSize(24);
	textAlign('left');
	text('Pedidos', 20, height - 300 + 32);

	uiAllocks.map(el => {
		el.show();
	});
}

function drawBlocks() {
	uiBlocks.map(el => {
		el.show();
	});
}

function drawMemory() {
	fill('#EFEFEF');
	rect(width/2 - 512, 150, 1034, 60, 7, 7, 7, 7);
	text('Memória', width/2 - 512, 140);
}

function Allock(id, x, w, color) {
	this.id = id;
	this.x = id == lim + 1 ? screenPadding : x;
	this.y = id <= lim ? height - 300 + 50 : height - 300 + 130;
	this.w = w;
	this.h = 50;
	this.borderRadius = 3;
	this.fill = color;

	this.show = function(){
		noStroke();
		fill(this.fill);
		rect(this.x, this.y, this.w, this.h, this.borderRadius, this.borderRadius, this.borderRadius, this.borderRadius);
	}
}

function Block(id, x, w, free) {
	this.id = id;
	this.x = x;
	this.y = 155;
	this.w = w;
	this.h = 50;
	this.borderRadius = 3;
	this.fill = free ? '#EFEFEF' : '#C9442B';

	this.show = function(){
		noStroke();
		fill(this.fill);
		rect(this.x, this.y, this.w, this.h, this.borderRadius, this.borderRadius, this.borderRadius, this.borderRadius);
	}
}
