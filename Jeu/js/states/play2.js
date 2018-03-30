define(['phaser', 'js/models/Bar.js', 'js/models/Timer.js', 'js/models/color.js', 'text!assets/json/config.json'],
	function (Phaser, Bar, Timer, color, config) {
		var play2 = function () {
			
		};

		play2.prototype = {
			init: function (configFromStates) {
				if(configFromStates) {
					console.log('Transfert réussi');
					this.gameObject = JSON.parse(configFromStates);
					console.log(this.gameObject);
				} else {
					console.log('Transfert échoué');
				}
			},

			preload: function () {
				
			},

			create: function () {				
				

			},

			update: function () {
				this.game.state.start('Play', true, false, JSON.stringify(this.gameObject));
					//this.game.state.start('Win');
				}
			};


			return play2;
		});