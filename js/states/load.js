define([],
	function() {
		var load = function() {
		};

		load.prototype = {
			preload: function() {
				/* Ressources communes */

				this.game.stage.backgroundColor = '#141414';


				/* Ressources de l'écran de menu */

				this.game.load.image('backgroundMenu','assets/img/interface/menu_background.png');
				this.game.load.spritesheet('buttonPlay', 'assets/img/interface/button_play.png', 183, 90, 2);


				/* Ressources de l'écran principal */

				// Images de la carte
				for(let i = 1; i <= 6; i++) {
					this.game.load.image('frZo' + i, 'assets/img/interface/france_zone' + i + '.png');
					this.game.load.image('frZo' + i + 'P', 'assets/img/interface/france_zone' + i + '_pollute.png');
					this.game.load.image('frZo' + i + 'S', 'assets/img/interface/france_zone'+ i + '_safe.png');
				}

				// Images de la barre de notifications et indication de notifications
				this.game.load.image('buttonBackground', 'assets/img/interface/button_background.png');
				this.game.load.image('buttonNotification', 'assets/img/interface/button_mission_notification.png');

				// Images des boutons cliquables
				this.game.load.spritesheet('buttonMissions', 'assets/img/interface/button_mission.png');
				this.game.load.spritesheet('buttonSkills', 'assets/img/interface/button_skills.png', 329, 79, 2);
				this.game.load.spritesheet('buttonStats', 'assets/img/interface/button_stats.png', 329, 79, 2);


				/* Ressources de l'écran de compétences */

				// Création des boutons
				this.game.load.spritesheet('buttonReturn', 'assets/img/interface/button_return.png', 329, 79, 2);

				// Création de l'anneau central
				this.game.load.image('background', 'assets/img/skills_tree/Background.png');
				this.game.load.spritesheet('transEnerg', 'assets/img/skills_tree/arc_transition_energetique.png');
				this.game.load.spritesheet('campInfl', 'assets/img/skills_tree/arc_campagne_influence.png');
				this.game.load.spritesheet('energPol', 'assets/img/skills_tree/arc_energie_polluante.png');

				// Ajout des compétences débloquables
				this.game.load.spritesheet('greenBullet', 'assets/img/skills_tree/bullet_transition_energetique.png');
				this.game.load.spritesheet('orangeBullet', 'assets/img/skills_tree/bullet_campagne_influence.png');
				this.game.load.spritesheet('redBullet', 'assets/img/skills_tree/bullet_energie_polluante.png');


				/* Ressources des écrans de fin */
				this.game.load.image('backgroundDefeat','assets/img/interface/defeat_background.png');
				this.game.load.image('backgroundWin','assets/img/interface/victory_background.png');
				this.game.load.spritesheet('buttonMenu', 'assets/img/interface/button_end_menu.png', 220, 60, 2);
				this.game.load.spritesheet('buttonReplay', 'assets/img/interface/button_end_replay.png', 220, 60, 2);

				//Missions
				this.game.load.image('policier','assets/img/others/policier.png');
				this.game.load.image('bulle','assets/img/others/bulle.png');
			},

			create: function() {
				this.game.state.start('Menu');
			}
		};

		return load;
	});