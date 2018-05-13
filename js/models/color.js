var colorswap = function(grey, brown, green, pollutionRate) {
	if(pollutionRate >= 0 && pollutionRate < 50){
		brown.alpha = 0;
		grey.alpha = parseFloat((pollutionRate/100).toFixed(2));
		green.alpha = 1 - grey.alpha;
	} else if(pollutionRate >= 50 && pollutionRate <= 100){
		grey.alpha = parseFloat(((100 - pollutionRate)/100).toFixed(2));
		brown.alpha = 1 - grey.alpha;
		green.alpha = 0;
	}
	console.log('---------------------');
	console.log('brown : ' + brown.alpha);
	console.log('grey : ' + grey.alpha);
	console.log('green : ' + green.alpha);
};