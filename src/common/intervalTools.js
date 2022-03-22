class IntervalTools {
	constructor(callback, stepTime = 1000) {
		this.stepTime = stepTime;

		this.timer = null;
		this.startTime = 0;
		this.endTime = 0;
		this.count = 0;
		this._addCallback(callback);
	}

	_getLocalTime() {
		return new Date().getTime();
	}

	clear() {
		console.log("【intervalTools】清空计时器");

		clearTimeout(this.timer);
	}

	_addCallback(callback) {
		if (callback && typeof callback === "function") {
			this.callback = callback;
		}
	}

	run(ms) {
		this.clear();
		if (ms >= 0) {
			this.startTime = this._getLocalTime();

			this.endTime = this.startTime + ms;
			let count = ms / this.stepTime;

			this.count = Math.ceil(count);

			this.callback(this.count);

			if (count) {
				let nextTime = this.stepTime;

				if (this.count !== count) {
					nextTime = ms - Math.floor(count) * this.stepTime;
				}

				this.startTime += nextTime;
				this._loop(nextTime);
			}
		}
	}

	_loop(time) {
		this.timer = setTimeout(() => {
			let stepTime = this.stepTime,
				localTime;

			localTime = this.localTime = this._getLocalTime();

			if (localTime > this.endTime) {
				localTime = this.endTime;
			}

			this.callback(--this.count);

			if (this.startTime < this.endTime) {
				let nextTime = this.startTime + stepTime - localTime;

				if (nextTime >= 0) {
					this.startTime += stepTime;
					this._loop(nextTime);
				} else {
					let count = Math.floor(-nextTime / stepTime) + 1;

					while (count--) {
						this.callback(--this.count);
						this.startTime += stepTime;
					}

					this.startTime += stepTime;

					if (this.count > 0) {
						this._loop(this.startTime - localTime);
					}
				}
			}
		}, time);
	}
}

export default IntervalTools;
