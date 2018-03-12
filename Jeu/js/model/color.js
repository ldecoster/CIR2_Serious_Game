var colorswap = function(grey, brown, green, upgrade) {
	// On améliore la map
	if(upgrade === true) {
		// Cas où la map est soit grise soit verte
		if(brown.alpha === 0) {
			// Cas où la map est déjà verte
			if(green.alpha === 1) {
				return 0;
			}
			// Cas où la map est grise et devient verte
			else {
				grey.alpha = parseFloat((grey.alpha - 0.1).toFixed(1));
				green.alpha = parseFloat((green.alpha + 0.1).toFixed(1));
			}
		}
		// Cas où la map est marron et devient grise
		else {
			brown.alpha = parseFloat((brown.alpha - 0.1).toFixed(1));
			grey.alpha = parseFloat((grey.alpha + 0.1).toFixed(1));
		}
		
	}
	// On altère la map
	else if(upgrade === false) {
		// Cas où la map est soit grise soit marron
		if(green.alpha === 0) {
			// Cas où la map est déjà marron
			if(brown.alpha === 1) {
				return 0;
			}
			// Cas où la map est grise et devient marron
			else {
				grey.alpha = parseFloat((grey.alpha - 0.1).toFixed(1));
				brown.alpha = parseFloat((brown.alpha + 0.1).toFixed(1));
			}
		}
		// Cas où la map est verte et devient grise
		else {
			green.alpha = parseFloat((green.alpha - 0.1).toFixed(1));
			grey.alpha = parseFloat((grey.alpha + 0.1).toFixed(1));	
		}
	}
};