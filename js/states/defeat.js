define(['js/models/System.js', 'text!assets/json/config.json', 'text!assets/json/maps.json', 'text!assets/json/skills.json'],
	function(System, configFromFile, mapsFromFile, skillsFromFile) {
		var defeat = function() {

		};

		defeat.prototype = {
			create: function() {
				this.system = new System(this.game);
				this.system.createFullScreen();
				
				var menuClick = function() {
					this.game.state.start('Menu');
				};

				var replayClick = function() {
					this.game.state.start('Play', true, false, configFromFile, mapsFromFile, skillsFromFile);
				};

				var background = this.game.add.tileSprite(0, 0, 1350, 750, 'backgroundDefeat');
				var button_menu = this.game.add.button(300, 620, 'buttonMenu', menuClick, this, 0, 1);
				var button_replay = this.game.add.button(830, 620, 'buttonReplay', replayClick, this, 0, 1);

				this.defeatDisplay = this.game.add.text(400, 400, 'La France n\'a pas pu être sauvée de la pollution...', {fontSize: '25px', fill: '#f65050', stroke: '#000000', strokeThickness: 4});
			}
		};

		return defeat;
	});