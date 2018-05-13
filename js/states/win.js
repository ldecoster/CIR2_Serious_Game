define(['js/models/System.js', 'text!assets/json/config.json', 'text!assets/json/maps.json', 'text!assets/json/skills.json'],
	function(System, configFromFile, mapsFromFile, skillsFromFile) {
		var win = function() {

		};

		win.prototype = {
			init: function(pollutionRate) {
				this.pollutionRate = pollutionRate;
				console.log(pollutionRate);
			},

			create: function() {
				this.system = new System(this.game);
				this.system.createFullScreen();
				
				var menuClick = function() {
					this.game.state.start('Menu');
				};

				var replayClick = function() {
					this.game.state.start('Play', true, false, configFromFile, mapsFromFile, skillsFromFile);
				};

			    var background = this.game.add.tileSprite(0, 0, 1350, 750, 'backgroundWin');
			    var button_menu = this.game.add.button(300, 620, 'buttonMenu', menuClick, this, 0, 1);
			    var button_replay = this.game.add.button(830, 620, 'buttonReplay', replayClick, this, 0, 1);

			    this.winDisplay = this.game.add.text(180, 230, 'Félicitations ! Grâce à vous la France a atteint       % de pollution.', {fontSize: '25px', fill: '#f3cd35', stroke: '#000000', strokeThickness: 2})+
			    				  this.game.add.text(740, 230, this.pollutionRate, {fontSize: '25px', fill: '#ffffff', stroke: '#000000', strokeThickness: 2})+
			    				  this.game.add.text(180, 260, 'Ce niveau raisonnable ne la met plus en danger !', {fontSize: '25px', fill: '#f3cd35', stroke: '#000000', strokeThickness: 2});
			}
		};

		return win;
	});