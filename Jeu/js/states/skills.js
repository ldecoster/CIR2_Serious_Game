define(['phaser', 'js/models/System.js', 'jquery'],
	function (Phaser, System, $) {
		var skills = function () {
		};

		skills.prototype = {
			init: function (configFromStates, mapsFromStates, skillsFromStates) {
				// On récupère les informations depuis le JSON
				this.gameObject = JSON.parse(configFromStates);
				this.mapsObject = JSON.parse(mapsFromStates);
				this.skillsObject = JSON.parse(skillsFromStates);
			},

			create: function () {
				this.buttonReturn = this.game.add.button(10, 653, 'buttonReturn', () => {
					this.game.state.start('Play', true, false, JSON.stringify(this.gameObject), JSON.stringify(this.mapsObject), JSON.stringify(this.skillsObject));
				});

				// Texte affichant les Points
				this.pointDisplay = this.game.add.text(1145, 16, 'Points : ' + this.gameObject.point, {
					fontSize: '32px',
					fill: '#555'
				});

				this.system = new System(this.game);
				this.system.createFullScreen();

				var background = this.game.add.sprite(330, 20, 'background');

				this.skillsContainer = [];

				// Nettoyage de skillsContainer
				var clearSkillsContainer = () => {
					for(let child in this.skillsContainer) {
						this.skillsContainer[child].destroy();
					}
				};

				// Fonction de découverte de la compétence et affichage partiel de ses sous-compétences
				var discovery = function(skillClickTarget) {
					var search = (values) => {
						$.each(values, (i, v) => {
							if (v.name === skillClickTarget.name && v.debloque === 0) {
								// Diminution du taux de pollution
								this.gameObject.barParam.PV -= 3.5;

								// Ajout des points
								switch (skillClickTarget.category) {
									case 'greenBullet':
									getPointTransEnerg();
									break;
									case 'orangeBullet':
									getPointCampagne();
									break;
									case 'redBullet':
									getPointEnergiePolluante();
									break;
								}

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

					search(this.skillsObject);
					clearSkillsContainer();
					readJSON(this.skillsObject);
				};

				// Parcours récursif du JSON
				var readJSON = object => {
					for(let child of object) {
						if(child.hasOwnProperty('category')) {
							this.skillsContainer[child.name] = this.game.add.button(child.x, child.y, child.category);
							this.skillsContainer[child.name].alpha = child.alpha;
							this.skillsContainer[child.name].input.pixelPerfectOver = true;
							this.skillsContainer[child.name].input.pixelPerfectClick = true;
							this.skillsContainer[child.name].events.onInputDown.add(discovery.bind(this, child));
						}
						
						if(child.hasOwnProperty('children')) {
							readJSON(child.children);
						}
					}
				};
				readJSON(this.skillsObject);


				// On récupère tous les skills présents dans le JSON afin de faciliter les calculs
				var getAllSkills = () => {
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
					readJSON(this.skillsObject);
					return skillsContainerReadOnly;
				};
				this.skillsContainerReadOnly = getAllSkills();

				// Renvoie le skill qui correspond au nom passé en paramètre
				var searchSkill = (skillName) => {
					return this.skillsContainerReadOnly.find(x => x.name === skillName);
				};

				// Renvoie la valeur d'un skill s'il est débloqué ou 0 sinon
				var valueSkill = (skillName) => {
					var skill = searchSkill(skillName);
					if(skill.debloque === 0) {
						return 0;
					} else {
						return skill.valeur;
					}
				};

				// Fonction qui ajoute de(s) Point(s) lors du (futur) déblocage d'une compétence de TransEnerg 
				var getPointTransEnerg = () => {
					var gaz = valueSkill('gaz') * (valueSkill('biomasse')  + valueSkill('biogaz')) ;
					var thermique = valueSkill('thermique') * (valueSkill('geothermie')  + valueSkill('geothermieMers'));
					var hydraulique = valueSkill('hydraulique') * (valueSkill('centrale') + valueSkill('barrage') + valueSkill('hydrolienne'));
					var eolienne = valueSkill('eolienne');
					var solaire = valueSkill('solaire');

					var total = gaz + thermique + hydraulique + eolienne + solaire;
					if (total === 0){
						this.gameObject.point += 1;
					}
					else {
						this.gameObject.point += total;
					}
				};

				// Fonction qui ajoute de(s) Point(s) lors du (futur) déblocage d'une compétence de EnergiePolluante 
				var getPointEnergiePolluante = () => {
					var nucleaire = valueSkill('nucleaire') * (valueSkill('recyclDechet') + valueSkill('entretien') + valueSkill('destruction') + valueSkill('reconversion'));
					var pesticide = valueSkill('pesticide');

					var total = nucleaire + pesticide;
					if (total === 0){
						this.gameObject.point +=1;
					}
					else {
						this.gameObject.point += total;
					}
				};

				// Fonction qui ajoute de(s) Point(s) lors du (futur) déblocage d'une compétence de Campagne 
				var getPointCampagne = () => {
					var transport = valueSkill('transport') * (valueSkill('tramway') + valueSkill('busEco'));
					var entreprise = valueSkill('entreprise');

					var total = transport + entreprise;
					if (total === 0){
						this.gameObject.point += 1;
					}
					else {
						this.gameObject.point += total;
					}
				};
			},

			update: function () {
				this.pointDisplay.text = 'Points : ' + this.gameObject.point;
			}
		};

		return skills;
	});