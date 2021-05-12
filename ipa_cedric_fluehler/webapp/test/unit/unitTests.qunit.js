/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"workspacebookingns/ipa_cedric_fluehler/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
