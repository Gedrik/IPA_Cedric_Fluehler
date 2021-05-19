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

		return Controller.extend("workspacebookingns.ipacedricfluehler.controller.booking", {
			onInit: function () {
                //define oModel
                oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			    //set Model into view
                this.getView().setModel(oModel);

                var that = this
                //get id of page header
                var timeLabel = this.getView().byId("page");
                //get value from getTime function
                var time = this.getTime();
                //sets the time value and title into header
                timeLabel.setTitle("Club Orientation, " + time);

                //updates the header every second to display correct time 
                setInterval(function() {
                    //get value from getTime function
                    var time = that.getTime();
                    //set time value and a title into header
                    timeLabel.setTitle("Club Orientation, " + time);
                }, 1000);
            },
            
            //function to get Time
            getTime: function(){
                //create new variable with current time value
                var today = new Date();

                //pick hour and minute values
                var hour = today.getHours();
                var minute = today.getMinutes(); 

                //seperate hour and minute with a :
                var time = hour + ":" + minute;
                return time;
            },

            onQuantity1Press: function(){
                this.getView().byId("quantityCache").setValue("1");

                var tquantity = sap.ui.getCore().byId(this.createId("quantityCache")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Quantity":tquantity} );
                
                var tzone = sap.ui.getCore().byId(this.createId("zoneCache")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );

            },

            onQuantity2Press: function(){
                this.getView().byId("quantityCache").setValue("2");

                var tquantity = sap.ui.getCore().byId(this.createId("quantityCache")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Quantity":tquantity} );
                
                var tzone = sap.ui.getCore().byId(this.createId("zoneCache")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );
            },

            onQuantity3Press: function(){
                this.getView().byId("quantityCache").setValue("3");

                var tquantity = sap.ui.getCore().byId(this.createId("quantityCache")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Quantity":tquantity} );
                
                var tzone = sap.ui.getCore().byId(this.createId("zoneCache")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );
            },

            onQuantity4Press: function(){
                this.getView().byId("quantityCache").setValue("4");

                var tquantity = sap.ui.getCore().byId(this.createId("quantityCache")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Quantity":tquantity} );
                
                var tzone = sap.ui.getCore().byId(this.createId("zoneCache")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );
            },

		});
	});