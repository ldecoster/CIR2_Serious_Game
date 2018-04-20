(function() {

    var getPointTransEnerg = function() {
        var gaz = gaz.valeur * ( biomasse.valeur  + biogaz.valeur) ;
        var thermique = thermique.valeur * ( geothermie.valeur  + geothermieMers.valeur);
        var hydraulique = hydraulique.valeur * ( centrale.valeur + barrage.valeur + hydrolienne.valeur);
        var eolienne =  eolienne.valeur;
        var solaire = solaire.valeur;

        var total = gaz + thermique + hydraulique + eolienne + solaire;
        if (total === 0){
            point += 1;
        }
        else {
            point += total;
        }
    };

    var getPointEnergiePolluante = function() {
        var nucleaire = nuleaire.valeur * ( recyclDechet.valeur + entretien.valeur + destruction.valeur + reconversion.valeur);
        var pesticide = pesticide.valeur;

        var total = pesticide + nuclaire;
        if (total === 0){
            point +=1;
        }
        else {
            point += total;
        }
    };

    var getPointCampagne = function() {
        var transport = transport.valeur * ( tramway.valeur + busEco.valeur);
        var entreprise = entreprise.valeur;

        var total = transport + entreprise;
        if (total === 0){
            point += 1;
        }
        else {
            point += total;
        }
    };

    var taux = 95;
    var TauxDePollution = function(){
        intervalID = setInterval(function() {
            if (nuclaire.debloque === 0) {
                taux += 0.5;
            }
            if( (nucleaire.debloque === 1) && (entretien.debloque + destruction.debloque + recyclDechet.debloque ===0) ){
                taux += 0.7;
            }
        }, 10000);
        if( "".debloque === 1 ){ //Quand on achete une competence on diminue le taux de pollution de la bar de 3.5
            taux -= 3.5;
        }
    };

    var premierBranche = function() {
        if(transEnerg.debloque === 1){
            energPol.cout += 2;
            campInfl.cout += 2;
            transEnerg.children.alpha = 0.7;
        }

        if(campInfl.debloque === 1 ){
            energPol.cout += 1;
            transEnerg.cout += 1;
            campInfl.children.alpha = 0.7;
        }

        if(energPol.debloque === 1){
            campInfl.cout += 1;
            transEnerg.cout += 1;
            energPol.children.alpha = 0.7;
        }
    };

    var SecondeBrancheTransEnerg = function(){
        if(hydraulique.debloque === 1){
            thermique.cout += 2;
            gaz.cout += 2;
            solaire.cout += 2;
            eolienne.cout += 2;
            hydraulique.children.alpha = 0.7;
        }

        if(gaz.debloque === 1){
            hydraulique.cout += 2;
            thermique.cout += 2;
            solaire.cout += 2;
            eolienne.cout += 2;
            gaz.children.alpha = 0.7;
        }

        if(thermique.debloque === 1){
            hydraulique.cout += 2;
            gaz.cout += 2;
            solaire.cout += 2;
            eolienne.cout += 2;
            thermique.children.alpha = 0.7;
        }

        if(eolienne.debloque === 1){
            hydraulique.cout += 2;
            gaz.cout += 2;
            solaire.cout += 2;
            thermique.cout += 2;
        }

        if(solaire.debloque === 1){
            hydraulique.cout += 2;
            gaz.cout += 2;
            eolienne.cout += 2;
            thermique.cout += 2;
        }
    };

    var SecondeBrancheCamplnfl = function(){
        if(transport.debloque === 1){
            entreprise.cout += 2;
            transport.children.alpha = 0.7;
        }

        if(entreprise.debloque === 1){
            transport.cout += 1;
        }
    };

    var SecondeBrancheEnerPol = function(){
        if(nucleaire.debloque === 1){
            pesticide.cout += 2;
            nucleaire.children.alpha = 0.7;
        }

        if(pesticide.debloque === 1){
            nucleaire.cout += 2;
        }
    };

    var TroisiemeBrancheHydraulique = function(){
        if(centrale.debloque === 1){
            barrage.cout += 3;
            hydrolienne.cout += 3;
        }

        if(barrage.debloque === 1){
            centrale.cout += 3;
            hydrolienne.cout += 3;
        }

        if(hydrolienne.debloque === 1){
            centrale.cout += 3;
            barrage.cout += 3;
        }
    };

    var TrosiemeBrancheThermique = function(){
        if(geothermie.debloque === 1 ){
            geothermieMers.cout += 3;
        }

        if(geothermieMers.debloque === 1){
            geothermie.cout += 3;
        }
    };

    var TrosiemeBrancheGaz = function(){
        if(biomasse.debloque === 1){
            biogaz.cout += 3;
        }

        if(biogaz.debloque === 1){
            biomasse.cout += 3;
        }
    };

    var TrosiemeBrancheTransport = function(){
        if(tramway.debloque === 1){
            busEco.cout += 3;
        }

        if(busEco.debloque === 1){
            tramway.cout += 3;
        }
    };

    var TrosiemeBrancheNucleaire = function(){
        if(recyclDechet.debloque === 1){
            entretien.cout += 3;
            destruction.cout += 3;
            reconversion.cout += 3;
        }

        if(entretien.debloque === 1){
            recyclDechet.cout += 3;
            destruction.cout += 3;
            reconversion.cout += 3;
        }

        if(destruction.debloque === 1){
            recyclDechet.cout += 3;
            reconversion.cout += 3;
            entretien.cout += 3;
        }

        if(reconversion.debloque === 1){
            recyclDechet.cout += 3;
            destruction.cout += 3;
            entretien.cout += 3;
        }
    };

})();
