var game = new Phaser.Game(1350, 750, Phaser.AUTO, '', { preload:preload, create:create, upload:upload });

function preload() {

	game.load.image('frZo1', 'assets/img/france_zone1.png');
	game.load.image('frZo2', 'assets/img/france_zone2.png');
	game.load.image('frZo3', 'assets/img/france_zone3.png');
	game.load.image('frZo4', 'assets/img/france_zone4.png');
	game.load.image('frZo5', 'assets/img/france_zone5.png');
	game.load.image('frZo6', 'assets/img/france_zone6.png');
	
	game.load.image('buBa', 'assets/img/button_background.png');

	game.load.spritesheet('buMi', 'assets/img/button_mission.png');
	game.load.spritesheet('buSk', 'assets/img/button_skills.png');
	game.load.spritesheet('buSt', 'assets/img/button_stats.png');

	game.load.image('buMiNo', 'assets/img/button_mission_notification.png');

};

function create() {
	game.stage.backgroundColor = '#accde6'
	var frZo1 = game.add.sprite(0, 0, 'frZo1');
	var frZo2 = game.add.sprite(0, 0, 'frZo2');
	var frZo3 = game.add.sprite(0, 0, 'frZo3');
	var frZo4 = game.add.sprite(0, 0, 'frZo4');
	var frZo5 = game.add.sprite(0, 0, 'frZo5');
	var frZo6 = game.add.sprite(0, 0, 'frZo6');

	var buBa = game.add.sprite(28, 653, 'buBa');

	var buMi = game.add.button(579, 620, 'buMi', function(){console.log('click');}, this);
	var buSk = game.add.button(1006, 653, 'buSk', function(){console.log('click');}, this);
	var buSt = game.add.button(10, 653, 'buSt', function(){console.log('click');}, this);

	// À rajouter après les autres boutons pour être par-dessus
	var buMiNo = game.add.sprite(795, 608, 'buMiNo');
};

function upload() {

};