define(['phaser', 'jquery'],
	function(Phaser, $) {
		var SkillsHandler = function(game, gameObject, skillsObject) {
			this._game = game;
			this._gameObject = gameObject;
			this._skillsObject = skillsObject;
			this.skillsContainer = [];
			this.addButton(this._skillsObject);
			this.skillsContainerReadOnly = [];
			this.skillsContainerReadOnly = this.getAllSkills(this._skillsObject);
		};

		/**
		 * PARTIE BOUTON
		 */

		// Nettoyage de skillsContainer
		SkillsHandler.prototype.clearSkillsContainer = function() {
			for(let child in this.skillsContainer) {
				this.skillsContainer[child].destroy();
			}
		};

		//Affiche le nom de la compétence quan on passe la souris dessus
		SkillsHandler.prototype.overName = function(element){
			if(element.alpha){
			    var style = {font: "23px Arial", fill: "#ffffff"};
			    text = this._game.add.text(this._game.world.centerX, this._game.world.centerY, element.realName, style);
			    text.anchor.set(0.5);
			    console.log(text);
			}
		};

		//Efface le nom de la compétence quand la souris ne la survole pas
		SkillsHandler.prototype.cleanText = function(element){
			    text.destroy();
		};

		// Ajout récursif des boutons issus du JSON
		SkillsHandler.prototype.addButton = function(skillsObject){
			for(let child of skillsObject) {
				if(child.hasOwnProperty('category')) {
					this.skillsContainer[child.name] = this._game.add.button(child.x, child.y, child.category);
					this.skillsContainer[child.name].alpha = child.alpha;
					this.skillsContainer[child.name].input.pixelPerfectOver = true;
					this.skillsContainer[child.name].input.pixelPerfectClick = true;
					this.skillsContainer[child.name].events.onInputDown.add(this.discovery.bind(this, child));
					this.skillsContainer[child.name].events.onInputOver.add(this.overName.bind(this, child));
					this.skillsContainer[child.name].events.onInputOut.add(this.cleanText.bind(this, child));
				}
				if(child.hasOwnProperty('children')) {
					this.addButton(child.children);
				}
			}
		};

		// Fonction de découverte de la compétence et affichage partiel de ses sous-compétences
		SkillsHandler.prototype.discovery = function(skillClickTarget) {
			var search = (values) => {
				$.each(values, (i, v) => {
					if (v.name === skillClickTarget.name && v.debloque === 0) {
						// Diminution du taux de pollution
						this._gameObject.barParam.PV -= 3.5;

						// Ajout des points
						this.addPoints(skillClickTarget);

						// Découverte de la compétence
						v.debloque = 1;
						v.alpha = 1;
						if(v.hasOwnProperty('children')) {
							for(let child of v.children) {
								child.alpha = 0.7;
							}
						}
					}
					if (v.children) {
						search(v.children);
					}
				});
			};

			search(this._skillsObject);
			this.clearSkillsContainer(); // Destructinon de l'arbre de compétences
			this.addButton(this._skillsObject); // Reconstruction de l'arbre

			text.destroy();
		};

		/**
		 * PARTIE CALCUL (TAUX DE POLLUTION / POINS)
		 */

		// On récupère tous les skills présents dans le JSON afin de faciliter l'accès aux propriétés des skills
		SkillsHandler.prototype.getAllSkills = function(skillsObject) {
			var skillsContainerReadOnly = [];
			// Parcours récursif du JSON
			var readJSON = object => {
				for(let child of object) {
					skillsContainerReadOnly.push(child);
					if(child.hasOwnProperty('children')) {
						readJSON(child.children);
					}
				}
			};
			readJSON(skillsObject);
			return skillsContainerReadOnly;
		};

		// Renvoie le skill qui correspond au nom passé en paramètre
		SkillsHandler.prototype.searchSkill = function(skillName) {
			return this.skillsContainerReadOnly.find(x => x.name === skillName);
		};

		// Renvoie la valeur d'un skill s'il est débloqué ou 0 sinon
		SkillsHandler.prototype.valueSkill = function(skillName) {
			var skill = this.searchSkill(skillName);
			if(skill.debloque === 0) {
				return 0;
			} else {
				return skill.valeur;
			}
		};

		// Renvoie un certain nombre de points à attribuer lors du déblocage d'une compétence de TransEnerg 
		SkillsHandler.prototype.getPointsTransEnerg = function() {
			var gaz = this.valueSkill('gaz') * (this.valueSkill('biomasse')  + this.valueSkill('biogaz')) ;
			var thermique = this.valueSkill('thermique') * (this.valueSkill('geothermie')  + this.valueSkill('geothermieMers'));
			var hydraulique = this.valueSkill('hydraulique') * (this.valueSkill('centrale') + this.valueSkill('barrage') + this.valueSkill('hydrolienne'));
			var eolienne = this.valueSkill('eolienne');
			var solaire = this.valueSkill('solaire');

			var total = gaz + thermique + hydraulique + eolienne + solaire;
			return total;
		};

		// Renvoie un certain nombre de points à attribuer lors du déblocage d'une compétence de EnergiePolluante 
		SkillsHandler.prototype.getPointsEnergiePolluante = function() {
			var nucleaire = this.valueSkill('nucleaire') * (this.valueSkill('recyclDechet') + this.valueSkill('entretien') + this.valueSkill('destruction') + this.valueSkill('reconversion'));
			var pesticide = this.valueSkill('pesticide');

			var total = nucleaire + pesticide;
			return total;
		};

		// Renvoie un certain nombre de points à attribuer lors du déblocage d'une compétence de Campagne 
		SkillsHandler.prototype.getPointsCampagne = function() {
			var transport = this.valueSkill('transport') * (this.valueSkill('tramway') + this.valueSkill('busEco'));
			var entreprise = this.valueSkill('entreprise');
			var total = transport + entreprise;
			return total;
		};

		// Ajoute un certain nombre de points en fonction de l'achat d'une compétence
		SkillsHandler.prototype.addPoints = function(skill){
			var points;
			switch (skill.category) {
				case 'greenBullet':
				points = this.getPointsTransEnerg();
				break;
				case 'orangeBullet':
				points = this.getPointsCampagne();
				break;
				case 'redBullet':
				points = this.getPointsEnergiePolluante();
				break;
			}
			if(points !== undefined) {
				if (points === 0){
					this._gameObject.point += 1;
				}
				else {
					this._gameObject.point += points;
				}
			}
		};

		return SkillsHandler;
	});