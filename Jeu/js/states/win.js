define(['js/models/System.js', 'text!assets/json/config.json'],
	function(System, configFromFile) {
		var win = function() {

		};

		win.prototype = {
			preload: function() {
				this.game.load.image('background','assets/img/interface/victory_background.png');
				this.game.load.spritesheet('button_menu', 'assets/img/interface/button_end_menu.png');
				this.game.load.spritesheet('button_replay', 'assets/img/interface/button_end_replay.png');
			},

			create: function() {
				this.system = new System(this.game);
				this.system.createFullScreen();
				
				var menuClick = function() {
					this.game.state.start('Menu');
				};

				var replayClick = function() {
					this.game.state.start('Play', true, false, configFromFile);
				};

			    var background = this.game.add.tileSprite(0, 0, 1350, 750, 'background');
			    var button_menu = this.game.add.button(300, 620, 'button_menu', menuClick, this);
			    var button_replay = this.game.add.button(830, 620, 'button_replay', replayClick, this);
			},

			update: function() {

			}
		};

		return win;
	});