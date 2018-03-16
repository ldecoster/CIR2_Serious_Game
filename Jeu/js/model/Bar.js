var BarController = (function () {
    var Bar = function (game, config) {
        this.game = game;
        this.create(config);
        this.drawBackground();
        this.drawBar();
        this.drawText();
    };
    /*
    Utilisation :
        
    myBar = new Bar(this.game, {
        coordX: ...,
        coordY: ...,
        barWidth: ...,
        barHeight: ...,
        PVMax: ...,
        PV: ...,
    });
    */

    Bar.prototype.constructor = Bar;

    /*Extrait les données entrées en paramètres à l'appel de la fonction*/

    Bar.prototype.create = function (config) {
        this.name = (undefined === config.name ? 'bar' : config.name);
        this.speedDecrease = (undefined === config.speedDecrease ? 700 : config.speedDecrease);
        this.x = (undefined === config.coordX ? 0 : config.coordX);
        this.y = (undefined === config.coordY ? 0 : config.coordY);
        this.pvmax = (undefined === config.PVMax ? 100 : config.PVMax);
        this.PV = ((undefined === config.PV || config.PV > config.PVMax) ? this.pvmax : (config.PV < 0 ? 0 : config.PV));
        this.width = (undefined === config.barWidth ? 100 : config.barWidth);
        this.height = (undefined === config.barHeight ? 20 : config.barHeight);
    };

    /*Crée la jauge initiale*/

    Bar.prototype.drawBackground = function () {
        //Crée un rectangle bitmap gris qui formera le fond de la barre de vie
        var bar_backg = this.game.add.bitmapData(this.width, this.height);
        bar_backg.context.fillStyle = "#808580";
        bar_backg.context.fillRect(0, 0, this.width, this.height);
        this.backgSprite = this.game.add.sprite(this.x, this.y, bar_backg);
    };
    Bar.prototype.createbmpdata = function () {
        //Création d'un rectangle bitmap dont la longueur changera selon la vie restante
        var bar_life = this.game.add.bitmapData(this.width, this.height);

        //Création du dégradé de fond de la jauge
        var grad = bar_life.context.createLinearGradient(0, 0, 0, 50);
        grad = this.changeGradient(grad);
        bar_life.ctx.fillStyle = grad;
        bar_life.ctx.fillRect(0, 0, this.width, this.height);

        //Enregistrement du bitmap dans le cache du jeu
        this.game.cache.addBitmapData(this.name, bar_life);
        return bar_life;
    };
    Bar.prototype.drawBar = function () {
        this.barSprite = this.game.add.sprite(this.x, this.y, this.createbmpdata());
        this.barSprite.width = this.width * this.PV / this.pvmax;
    };

    /*Modifie l'image bitmap*/

    Bar.prototype.changeGradient = function (grad) {
        if (this.PV >= this.pvmax / 2) {
            //Vert si plus de la moitié des PV restants
            grad.addColorStop(0, '#3f9645');
            grad.addColorStop(0.5, '#127017');
            grad.addColorStop(1, '#3f9645');
        } else {
            if (this.PV < this.pvmax / 4) {
                //Rouge si moins du quart des PV restants
                grad.addColorStop(0, '#ff5454');
                grad.addColorStop(0.5, '#ff0000');
                grad.addColorStop(1, '#ff5454');
            } else {
                //Orange sinon
                grad.addColorStop(0, '#ff9b59');
                grad.addColorStop(0.5, '#ff6600');
                grad.addColorStop(1, '#ff9b59');
            }
        }
        return grad;
    };
    Bar.prototype.updatebmpdatacolor = function () {
        //Retrouve dans le cache l'image bitmap de la jauge
        var bar_life = this.game.cache.getBitmapData(this.name);

        //Met à jour sa couleur
        var grad = bar_life.context.createLinearGradient(0, 0, 0, this.height);
        grad = this.changeGradient(grad);
        bar_life.ctx.fillStyle = grad;
        bar_life.ctx.fillRect(0, 0, this.width, this.height);

        //La jauge doit changer à l'update suivant
        bar_life.dirty = true;
    };

    /*Modification de l'état de la jauge*/

    Bar.prototype.addPV = function (addPV) {
        //Rajoute les PV et met à jour l'affichage
        this.PV = (addPV + this.PV > this.pvmax ? this.pvmax : this.PV + addPV);
        this.actualizeBar();
    };
    Bar.prototype.removePV = function (removePV) {
        //Diminue les PV et met à jour l'affichage
        this.PV = (removePV > this.PV ? 0 : this.PV - removePV);
        this.actualizeBar();
    };
    Bar.prototype.setPV = function (pv) {
        this.PV = (pv < 0 ? 0 : (pv > this.pvmax ? this.pvmax : pv));
        this.actualizeBar();
    };
    Bar.prototype.actualizeBar = function (newWidth) {
        if (this.barSprite.width !== this.width * this.PV / this.pvmax && (this.tween === undefined || !this.tween.isRunning)) {
            //Diminue progressivement la taille du rectangle pour atteinte la taille correspondant au nouveau nombre de PV
            this.tween = this.game.add.tween(this.barSprite).to({
                width: this.width * this.PV / this.pvmax,
            }, this.speedDecrease, Phaser.Easing.Linear.None, true);
            //Met à jour l'affichage à chaque update du tween
            this.tween.onUpdateCallback(function () {
                this.majText();
                this.updatebmpdatacolor();
            }, this);
        }
    };

    /*Crée les possibilités d'affichage des données de la jauge*/

    Bar.prototype.drawText = function () {
        //Initialise les données texte de la jauge
        this.textPercentage = this.game.add.text(this.x + this.width / 2, this.y + this.height / 2, '');
        this.textPercentage.anchor.setTo(0.5, 0.6);
        this.textPercentage.fill = "white";
        this.textPercentage.fontSize = this.height * 2 / 3;
        this.textPercentage.visible = false;

        //Met à jour les données
        this.majText();
    };

    Bar.prototype.majText = function () {
        this.textPercentage.setText(Math.round(this.barSprite.width / this.width * 100) + " %");
    };
    
    Bar.prototype.printPercentage = function () {
        this.majText();
        this.textPercentage.visible = !this.textPercentage.visible;
    };

    return Bar;
})();