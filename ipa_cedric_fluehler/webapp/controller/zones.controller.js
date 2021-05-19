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

		return Controller.extend("workspacebookingns.ipacedricfluehler.controller.zones", {
			onInit: function () {
                //define oModel
                oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			    //set Model into view
                this.getView().setModel(oModel);

                //creates batch request so labels can read their values
                //calls button color color change function if successful
                 oModel.read("/Club", {success: function() {
                    this.buttonColor();
                    }.bind(this)
                });

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

            buttonColor: function(){

            },

            onZone1Press: function(){
                this.getView().byId("zoneInput").setValue("1");

                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );
            },

            onZone2Press: function(){
                this.getView().byId("zoneInput").setValue("2");

                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );
            },

            onZone3Press: function(){
                this.getView().byId("zoneInput").setValue("3");

                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );
            },

            onZone4Press: function(){
                this.getView().byId("zoneInput").setValue("4");

                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );
            },

            onZone5Press: function(){
                this.getView().byId("zoneInput").setValue("5");

                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );
            },

            onZone6Press: function(){
                this.getView().byId("zoneInput").setValue("6");

                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );
            },

            onZone7Press: function(){
                this.getView().byId("zoneInput").setValue("7");

                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );
            },

            onZone8Press: function(){
                this.getView().byId("zoneInput").setValue("8");

                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );
            },

            onBackPress: function(){

            },

            

		});
	});
