"use strict";

// ===========================================================================

class ProgressBar {
	constructor(name) {
		this.name = name;
	}

	update(name, duration, position, size, foregroundColour, backgroundColour) {
		position = (position instanceof Vec2) ? position : new Vec2(position[0], position[1]);
		size = (size instanceof Vec2) ? size : new Vec2(size[0], size[1]);

		this.name = name;
		this.position = new Vec2(position.x/100, position.y/100);
		this.size = new Vec2(size.x/100, size.y/100);
		this.foregroundColour = foregroundColour;
		this.backgroundColour = backgroundColour;
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

			

			let zeroPosition = new Vec2(0, 0);
			let screenWidth = new Vec2(game.width, 0.0);
			let screenHeight = new Vec2(0.0, game.height);

			let size = new Vec2(
				new Vec2(zeroPosition.x + (screenWidth.x - zeroPosition.x) * this.size.x, zeroPosition.y + (screenWidth.y - zeroPosition.y) * this.size.x).x,
				new Vec2(zeroPosition.y + (screenHeight.y - zeroPosition.y) * this.size.y, zeroPosition.y + (screenHeight.y - zeroPosition.y) * this.size.y).y
			);

			let position = new Vec2(
				new Vec2(zeroPosition.x + (screenWidth.x - zeroPosition.x) * this.position.x, zeroPosition.y + (screenWidth.y - zeroPosition.y) * this.position.x).x,
				new Vec2(zeroPosition.y + (screenHeight.y - zeroPosition.y) * this.position.y, zeroPosition.y + (screenHeight.y - zeroPosition.y) * this.position.y).y
			);

			let width = Math.ceil((size.x / 100) * this.percent);

			graphics.drawRectangle(null, [position.x - (size.x / 2), position.y - (size.y / 2) - 1], [size.x, size.y], this.backgroundColour, this.backgroundColour, this.backgroundColour, this.backgroundColour);
			graphics.drawRectangle(null, [position.x - (size.x / 2), position.y - (size.y / 2) - 2], [width, size.y], this.foregroundColour, this.foregroundColour, this.foregroundColour, this.foregroundColour);
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

addNetworkHandler("v.progressBar.create", (name, duration, position, size, foregroundColour, backgroundColour) => {
	create(name, duration, position, size, foregroundColour, backgroundColour)
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

function create(name, duration, position, size, foregroundColour, backgroundColour) {
	let progressBar = new ProgressBar(name);
	progressBar.update(name, duration, position, size, foregroundColour, backgroundColour);
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