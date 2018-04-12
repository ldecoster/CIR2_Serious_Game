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
				var button_menu = this.game.add.button(300, 620, 'buttonMenu', menuClick, this);
				var button_replay = this.game.add.button(830, 620, 'buttonReplay', replayClick, this);
			}
		};

		return defeat;
	});