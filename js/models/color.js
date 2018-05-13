var colorswap = function(grey, brown, green, pollutionRate) {
	if(pollutionRate >= 75) {
		green.alpha = 0;
		grey.alpha = parseFloat((1 - pollutionRate/100 + 0.25).toFixed(2));
		brown.alpha = parseFloat((pollutionRate/100 - 0.25).toFixed(2));
	} else if(pollutionRate <= 25) {
		brown.alpha = 0;
		grey.alpha = parseFloat((1 - pollutionRate/100 + 0.25).toFixed(2));
		green.alpha = parseFloat((pollutionRate/100 - 0.25).toFixed(2));
	} else {
		if(pollutionRate >= 50) {
			green.alpha = 0;
			brown.alpha = parseFloat((1 - pollutionRate/100 + 0.25).toFixed(2));
			grey.alpha = parseFloat((pollutionRate/100 - 0.25).toFixed(2));
		} else {
			brown.alpha = 0;
			green.alpha = parseFloat((1 - pollutionRate/100 + 0.25).toFixed(2));
			grey.alpha = parseFloat((pollutionRate/100 - 0.25).toFixed(2));
		}
	}
};