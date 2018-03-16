var TimerController = (function() {
	var Timer = function(game, seconds) {
		this._game = game;
		this.createTimer(seconds);
	};

	Timer.prototype.createTimer = function (seconds) {
		var smoothDisplay = function (value) {
			return (value < 10 ? '0' : '') + value;
		};
		this._time = seconds;
		this._timer = this._game.time.create(false);
		this._timer.loop(1000, this.updateClock, this);


		this._timer.start();

		this._timer_text = this._game.add.text(16, 16, 'Time : ' + smoothDisplay(Math.floor(seconds / 60)) + ':' + smoothDisplay(seconds % 60), {
			fontSize: '32px',
			fill: '#555'
		});

		this._timer_text.fixedToCamera = true;
	};

	Timer.prototype.updateClock = function () {
		var smoothDisplay = function (value) {
			return (value < 10 ? '0' : '') + value;
		};
		this._time--;
		if (this._time >= 0) {
			let minutes = 0;
			let seconds = 0;

			seconds = this._time % 60;
			minutes = Math.floor(this._time / 60);
			this._timer_text.text = 'Time : ' + smoothDisplay(minutes) + ':' + smoothDisplay(seconds);
		} else {
			this._timer_text.text = 'Time : 00:00';
		}
	};

	return Timer;
})();