var game = new Phaser.Game(1350, 750, Phaser.AUTO, '', { preload:preload, create:create, upload:upload });

function preload() {

	game.load.image('frZo1', 'assets/img/france_zone1.png');
	game.load.image('frZo1P', 'assets/img/france_zone1_pollute.png');
	game.load.image('frZo1S', 'assets/img/france_zone1_safe.png');
	game.load.image('frZo2', 'assets/img/france_zone2.png');
	game.load.image('frZo2P', 'assets/img/france_zone2_pollute.png');
	game.load.image('frZo2S', 'assets/img/france_zone2_safe.png');
	game.load.image('frZo3', 'assets/img/france_zone3.png');
	game.load.image('frZo3P', 'assets/img/france_zone3_pollute.png');
	game.load.image('frZo3S', 'assets/img/france_zone3_safe.png');
	game.load.image('frZo4', 'assets/img/france_zone4.png');
	game.load.image('frZo4P', 'assets/img/france_zone4_pollute.png');
	game.load.image('frZo4S', 'assets/img/france_zone4_safe.png');
	game.load.image('frZo5', 'assets/img/france_zone5.png');
	game.load.image('frZo5P', 'assets/img/france_zone5_pollute.png');
	game.load.image('frZo5S', 'assets/img/france_zone5_safe.png');
	game.load.image('frZo6', 'assets/img/france_zone6.png');
	game.load.image('frZo6P', 'assets/img/france_zone6_pollute.png');
	game.load.image('frZo6S', 'assets/img/france_zone6_safe.png');
	
	game.load.image('buBa', 'assets/img/button_background.png');

	game.load.spritesheet('buMi', 'assets/img/button_mission.png');
	game.load.spritesheet('buSk', 'assets/img/button_skills.png');
	game.load.spritesheet('buSt', 'assets/img/button_stats.png');

	game.load.image('buMiNo', 'assets/img/button_mission_notification.png');

	game.load.image('frZo21', 'assets/img/france_zone2_1.png');
}

function create() {
	game.stage.backgroundColor = '#141414';
	var frZo1 = game.add.image(0, 0, 'frZo1');
	var frZo1P = game.add.image(0, 0, 'frZo1P');
	var frZo1S = game.add.image(0, 0, 'frZo1S');
	var frZo2 = game.add.image(0, 0, 'frZo2');
	var frZo2P = game.add.image(0, 0, 'frZo2P');
	var frZo2S = game.add.image(0, 0, 'frZo2S');
	var frZo3 = game.add.image(0, 0, 'frZo3');
	var frZo3P = game.add.image(0, 0, 'frZo3P');
	var frZo3S = game.add.image(0, 0, 'frZo3S');
	var frZo4 = game.add.image(0, 0, 'frZo4');
	var frZo4P = game.add.image(0, 0, 'frZo4P');
	var frZo4S = game.add.image(0, 0, 'frZo4S');
	var frZo5 = game.add.image(0, 0, 'frZo5');
	var frZo5P = game.add.image(0, 0, 'frZo5P');
	var frZo5S = game.add.image(0, 0, 'frZo5S');
	var frZo6 = game.add.image(0, 0, 'frZo6');
	var frZo6P = game.add.image(0, 0, 'frZo6P');
	var frZo6S = game.add.image(0, 0, 'frZo6S');

	var buBa = game.add.sprite(28, 653, 'buBa');
	var buMi = game.add.button(579, 620, 'buMi');
	var buSk = game.add.button(1006, 653, 'buSk', function() {
		colorswap(frZo1, frZo1P, frZo1S, true);
		colorswap(frZo2, frZo2P, frZo2S, true);
		colorswap(frZo3, frZo3P, frZo3S, true);
		colorswap(frZo4, frZo4P, frZo4S, true);
		colorswap(frZo5, frZo5P, frZo5S, true);
		colorswap(frZo6, frZo6P, frZo6S, true);
	}, this);
	var buSt = game.add.button(10, 653, 'buSt', function() {
		colorswap(frZo1, frZo1P, frZo1S, false);
		colorswap(frZo2, frZo2P, frZo2S, false);
		colorswap(frZo3, frZo3P, frZo3S, false);
		colorswap(frZo4, frZo4P, frZo4S, false);
		colorswap(frZo5, frZo5P, frZo5S, false);
		colorswap(frZo6, frZo6P, frZo6S, false);
	}, this);

	// À rajouter après les autres boutons pour être par-dessus
	var buMiNo = game.add.sprite(795, 608, 'buMiNo');

}

function upload() {

}

var colorswap = function(grey, brown, green, upgrade) {
	// On améliore la map
	if(upgrade === true) {
		// Cas où la map est soit grise soit verte
		if(brown.alpha === 0) {
			// Cas où la map est déjà verte
			if(green.alpha === 1) {
				return 0;
			}
			// Cas où la map est grise et devient verte
			else {
				grey.alpha = parseFloat((grey.alpha - 0.1).toFixed(1));
				green.alpha = parseFloat((green.alpha + 0.1).toFixed(1));
			}
		}
		// Cas où la map est marron et devient grise
		else {
			brown.alpha = parseFloat((brown.alpha - 0.1).toFixed(1));
			grey.alpha = parseFloat((grey.alpha + 0.1).toFixed(1));
		}
		
	}
	// On altère la map
	else if(upgrade === false) {
		// Cas où la map est soit grise soit marron
		if(green.alpha === 0) {
			// Cas où la map est déjà marron
			if(brown.alpha === 1) {
				return 0;
			}
			// Cas où la map est grise et devient marron
			else {
				grey.alpha = parseFloat((grey.alpha - 0.1).toFixed(1));
				brown.alpha = parseFloat((brown.alpha + 0.1).toFixed(1));
			}
		}
		// Cas où la map est verte et devient grise
		else {
			green.alpha = parseFloat((green.alpha - 0.1).toFixed(1));
			grey.alpha = parseFloat((grey.alpha + 0.1).toFixed(1));	
		}
	}
};