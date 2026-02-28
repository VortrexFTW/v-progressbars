"use strict";

// ===========================================================================

class ProgressBar {
	constructor(name) {
		this.name = name;
	}

	update(name, duration, position, size, foregroundColours, backgroundColours) {
		this.name = name;
		this.position = new Vec2(position.x/100, position.y/100);
		this.size = (size instanceof Vec2) ? size : parseSize(size);
		this.foregroundColour = foregroundColours;
		this.backgroundColour = backgroundColours;
		this.duration = duration;
		this.startTick = 0;
		this.percent = 0;
	}

	start() {
		this.startTick = sdl.ticks;
		this.enabled = true;
	}

	stop() {
		this.enabled = false;
	}

	percent(percent) {
		if(this.duration == 0) {
			this.percent = percent;
		}
	}

	render() {
		if (this.percent >= 100) {
			//triggerNetworkEvent("v.progressBar", this.name);
			destroy(this.name);
		} else {
			if(this.duration > 0) {
				let currentTick = sdl.ticks - this.startTick;
				this.percent = Math.ceil(currentTick * 100 / this.duration);
			}

			let width = Math.ceil((this.size.x / 100) * this.percent);

			let zeroPosition = new Vec2(0, 0);
			let screenWidth = new Vec2(game.width, 0.0);
			let screenHeight = new Vec2(0.0, game.height);
			
			let x = new Vec2(zeroPosition.x + (screenWidth.x - zeroPosition.x) * this.position.x, zeroPosition.y + (screenWidth.y - zeroPosition.y) * this.position.x);
			let y = new Vec2(zeroPosition.y + (screenHeight.y - zeroPosition.y) * this.position.y, zeroPosition.y + (screenHeight.y - zeroPosition.y) * this.position.y);

			let position = new Vec2(x.x, y.y);

			graphics.drawRectangle(null, [position.x - (this.size.x / 2), position.y - (this.size.y / 2) - 1], [this.size.x, this.size.y], this.backgroundColour, this.backgroundColour, this.backgroundColour, this.backgroundColour);
			graphics.drawRectangle(null, [position.x - (this.size.x / 2), position.y - (this.size.y / 2) - 2], [width, this.size.y], this.foregroundColour, this.foregroundColour, this.foregroundColour, this.foregroundColour);
		}
	}
}

// ===========================================================================

let progressBars = [];

exportFunction("create", create);
exportFunction("destroy", destroy);
exportFunction("percent", percent);

// ===========================================================================

addEventHandler("OnDrawnHUD", (event) => {
	progressBars.forEach((progressBar) => {
		progressBar.render();
	});
});

// ===========================================================================

addNetworkHandler("v.progressBar.create", (name, duration, position, size, foregroundColours, backgroundColours) => {
	create(name, duration, position, size, foregroundColours, backgroundColours)
});

// ===========================================================================

addNetworkHandler("v.progressBar.destroy", (name) => {
	destroy(name);
});

// ===========================================================================

addNetworkHandler("v.progressBar.percent", (name, percent) => {
	percent(name, percent);
});

// ===========================================================================

function create(name, duration, position, size, foregroundColours, backgroundColours) {
	let progressBar = new ProgressBar(name);
	progressBar.update(name, duration, position, size, foregroundColours, backgroundColours);
	progressBars.push(progressBar);
	progressBar.start();
	console.log(`${thisResource.name}: Created progress bar ${name}`);
}

// ===========================================================================

function destroy(name) {
	let existing = progressBars.findIndex(pb => pb.name.toLowerCase().indexOf(name.toLowerCase()) != -1);

	if(existing != -1) {
		progressBars.splice(existing, 1);
	}
	console.log(`${thisResource.name}: Destroyed progress bar ${name}`);
}

// ===========================================================================

function percent(name, percent) {
	let existing = progressBars.find(pb => pb.name.toLowerCase().indexOf(name.toLowerCase()) != -1);
	
	if(existing != undefined) {
		existing.percent = percent;
		console.log(`${thisResource.name}: Set progress ${name} percent to ${percent}%`);
	}
}

// ===========================================================================