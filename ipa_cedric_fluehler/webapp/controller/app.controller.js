sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
        "use strict";
        var sServiceUrl = "/v2/catalog/";
        var oModel;

		return Controller.extend("workspacebookingns.ipacedricfluehler.controller.app", {
			onInit: function () {
                oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			    //Model der View setzen
                this.getView().setModel(oModel);
			}
		});
	});
