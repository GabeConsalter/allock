var settings = {
	tamTotalMem: 1024,
	qtdePedidos: 5,
	qtdeLivres: 15,
	tamPedidos: {
		max: 0,
		min: 0
	},
	tamLivres: {
		max: 0,
		min: 0
	},
	algoritmo: 'bf'
}

$('.ui.button.toggle.gb1')
	.on('click', e => {
		$('.ui.button.toggle.gb1').removeClass('blue');
		$(this).addClass('blue');
		settings.tamTotalMem = Number($(this).text().substring(0, 4));
	})
;

$('.ui.button.toggle.gb2')
	.on('click', e => {
		$('.ui.button.toggle.gb2').removeClass('blue');
		$(this).addClass('blue');
	})
;

$('.ui.range > input[type="range"]')
	.on('input', e => {
		$(this).next('.ui.label').text($(this).val());
		settings[$(this).attr('data-toSetting')] = Number($(this).val());
	})
;

$('#go')
	.on('click', e => {
		settings.tamPedidos.min = Number($('#minTamPedidos').val());
		settings.tamPedidos.max = Number($('#maxTamPedidos').val());
		settings.tamLivres.min = Number($('#minTamLivres').val());
		settings.tamLivres.max = Number($('#maxTamLivres').val());
		settings.algoritmo = $('.ui.button.gb2.blue').attr('data-id');

		$('#settingsPanel').hide();

		let free = getFree();
		let busy = getBusy(free);

		let memory = {
			size: settings.tamTotalMem,
			blocks: makeBlocks(free.arr, busy.arr)
		}

		console.log(memory);
	})
	.ready( e => {
		$('#go').click();
	})
;

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function getFree() {
	let arr = [];
	let size = 0;

	while(settings.qtdeLivres--){
		let s = getRandom(settings.tamLivres.min, settings.tamLivres.max);
		size += s;
		arr.push(s);
	}

	return {
		size: size,
		arr: arr
	};
}

function getBusy(free) {
	let arr = [];
	let space = settings.tamTotalMem - free.size;
	let size = 0;

	while(space > 0){
		let s = getRandom(settings.tamLivres.min, settings.tamLivres.max);

		if(space - s < 0)
			s = space;

		space -= s;
		size += s;
		arr.push(s);
	}

	return {
		size: size,
		arr: arr
	}
}

function makeBlocks(free, busy) {
	let arr = [];
	let ff = false;

	if(Number(new Date().getSeconds()) % 2 == 0){
		arr.push({
			free: true,
			size: free[0]
		});
		free[0] = null;
		ff = true;
	}

	let i = 0;
	let freeLength = free.length;
	let busyLength = busy.length;

	while(freeLength >= busyLength ? freeLength-- : busyLength--){

		if(free[i])
			arr.push({
				free: true,
				size: free[i]
			});

		if(busy[i])
			arr.push({
				free: false,
				size: busy[i]
			});

		i++;
	}

	return arr;
}