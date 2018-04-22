(function() {
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
