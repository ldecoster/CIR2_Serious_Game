define(['phaser', 'js/models/System.js'],
	function (Phaser, System) {
		var skills = function () {
			
		};

		skills.prototype = {
			init: function (configFromStates) {
				this.gameObject = JSON.parse(configFromStates);

			},

			preload: function () {
				// Création de l'anneau central
				this.game.load.image('TE', 'assets/img/skills_tree/1.png');
				this.game.load.image('CI', 'assets/img/skills_tree/2.png');
				this.game.load.image('EP', 'assets/img/skills_tree/3.png');
				this.game.load.image('BG', 'assets/img/skills_tree/Background.png');

				// Ajout des compétences débloquables
				this.game.load.spritesheet('TEComp', 'assets/img/skills_tree/1_1.png');
				this.game.load.spritesheet('CIComp', 'assets/img/skills_tree/2_1.png');
				this.game.load.spritesheet('EPComp', 'assets/img/skills_tree/3_1.png');
			},

			create: function () {				
				this.system = new System(this.game);
				this.system.createFullScreen();

				this.game.stage.backgroundColor = '#141414';

				var BG = this.game.add.sprite(330, 20, 'BG');
				var TE = this.game.add.sprite(655, 220, 'TE');
				var CI = this.game.add.sprite(536, 220, 'CI');
				var EP = this.game.add.sprite(530, 317, 'EP');

				var TE_hydrau_centr = this.game.add.button(660, 80, 'TEComp');
				TE_hydrau_centr.alpha = 0;
				var TE_hydrau_barr = this.game.add.button(740, 100, 'TEComp');
				TE_hydrau_barr.alpha = 0;
				var TE_hydrau_hydro = this.game.add.button(810, 140, 'TEComp');
				TE_hydrau_hydro.alpha = 0;
				var TE_hydrau = this.game.add.button(720, 160, 'TEComp', function() {
					TE_hydrau_centr.alpha = 1;
					TE_hydrau_barr.alpha = 1;
					TE_hydrau_hydro.alpha = 1;
				});
				var TE_thermo_geoTherm = this.game.add.button(870, 190, 'TEComp');
				TE_thermo_geoTherm.alpha = 0;
				var TE_thermo_geoThermMers = this.game.add.button(900, 260, 'TEComp');
				TE_thermo_geoThermMers.alpha = 0;
				var TE_thermo = this.game.add.button(820, 250, 'TEComp', function() {
					TE_thermo_geoTherm.alpha = 1;
					TE_thermo_geoThermMers.alpha = 1;
				});
				var TE_gaz_biomasse = this.game.add.button(910, 350, 'TEComp');
				TE_gaz_biomasse.alpha = 0;
				var TE_gaz_biogaz = this.game.add.button(890, 420, 'TEComp');
				TE_gaz_biogaz.alpha = 0;
				var TE_gaz = this.game.add.button(840, 370, 'TEComp', function() {
					TE_gaz_biomasse.alpha = 1;
					TE_gaz_biogaz.alpha = 1;
				});
				var TE_sol = this.game.add.button(780, 470, 'TEComp');
				var TE_eol = this.game.add.button(690, 510, 'TEComp');

				var CI_entr = this.game.add.button(600, 160, 'CIComp');
				var CI_transCom_tram = this.game.add.button(500, 130, 'CIComp');
				CI_transCom_tram.alpha = 0;
				var CI_transCom_busEco = this.game.add.button(440, 190, 'CIComp');
				CI_transCom_busEco.alpha = 0;
				var CI_transCom = this.game.add.button(520, 200, 'CIComp', function() {
					CI_transCom_tram.alpha = 1;
					CI_transCom_busEco.alpha = 1;
				});

				var EP_centrNucl_recycl = this.game.add.button(420, 460, 'EPComp');
				EP_centrNucl_recycl.alpha = 0;
				var EP_centrNucl_entretien = this.game.add.button(460, 510, 'EPComp');
				EP_centrNucl_entretien.alpha = 0;
				var EP_centrNucl_destruct = this.game.add.button(530, 560, 'EPComp');
				EP_centrNucl_destruct.alpha = 0;
				var EP_centrNucl_reconv = this.game.add.button(600, 580, 'EPComp');
				EP_centrNucl_reconv.alpha = 0;
				var EP_centrNucl = this.game.add.button(530, 480, 'EPComp', function() {
					EP_centrNucl_recycl.alpha = 1;
					EP_centrNucl_entretien.alpha = 1;
					EP_centrNucl_destruct.alpha = 1;
					EP_centrNucl_reconv.alpha = 1;
				});
				var EP_pest = this.game.add.button(460, 340, 'EPComp');

			},

			update: function () {
				//this.game.state.start('Play', true, false, JSON.stringify(this.gameObject));
			}
		};

		return skills;
	});