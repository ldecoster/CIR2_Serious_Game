define(['phaser'], 
	function(Phaser) {
		var System = function(game) {
			this._game = game;
		};

		System.prototype.goFull = function () {
			if (this._game.scale.isFullScreen) {
				this._game.scale.stopFullScreen();
			} else {
				this._game.scale.startFullScreen(false);
			}
		};

		System.prototype.createFullScreen = function () {
			this._game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
			this._fullscreenKey = this._game.input.keyboard.addKey(Phaser.Keyboard.F);
			this._fullscreenKey.onDown.add(this.goFull, this);
		};

		System.prototype.createTimer = function (seconds) {
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

		System.prototype.updateClock = function () {
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

		return System;
	});