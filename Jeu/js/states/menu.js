define(['js/models/System.js', 'text!assets/json/config.json'],
	function(System, configFromFile) {
		var menu = function() {

		};

		menu.prototype = {
			preload: function() {
				this.game.load.image('background','assets/img/interface/menu_background.png');
				this.game.load.spritesheet('button', 'assets/img/interface/button_play.png');
			},

			create: function() {
				this.system = new System(this.game);
				this.system.createFullScreen();

				var actionOnClick = function() {
					this.game.state.start('Play', true, false, configFromFile);
				};

			    var background = this.game.add.tileSprite(0, 0, 1350, 750, 'background');
			    var button = this.game.add.button(this.game.world.centerX - 95, 400, 'button', actionOnClick, this);
			},

			update: function() {

			}
		};

		return menu;
	});
