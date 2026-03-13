"use strict";

// ===========================================================================

exportFunction("create", create);
exportFunction("destroy", destroy);
exportFunction("percent", destroy);

// ===========================================================================

function create(client, name, duration, position, size, foregroundColour, backgroundColour) {
	triggerNetworkEvent("v.progressBar.create", client, name, duration, position, size, foregroundColour, backgroundColour);
}

// ===========================================================================

function destroy(client, name) {
    triggerNetworkEvent("v.progressBar.destroy", client, name);
}

// ===========================================================================

function percent(client, name, percent) {
	triggerNetworkEvent("v.progressBar.percent", client, name, percent);
}

// ===========================================================================