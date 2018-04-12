define(['js/models/System.js', 'text!assets/json/config.json', 'text!assets/json/maps.json', 'text!assets/json/skills.json'],
	function(System, configFromFile, mapsFromFile, skillsFromFile) {
		var menu = function() {

		};

		menu.prototype = {
			create: function() {
				this.system = new System(this.game);
				this.system.createFullScreen();

				var actionOnClick = function() {
					this.game.state.start('Play', true, false, configFromFile, mapsFromFile, skillsFromFile);
				};

			    var background = this.game.add.tileSprite(0, 0, 1350, 750, 'backgroundMenu');
			    var button = this.game.add.button(this.game.world.centerX - 95, 400, 'buttonPlay', actionOnClick, this);
			}
		};

		return menu;
	});
