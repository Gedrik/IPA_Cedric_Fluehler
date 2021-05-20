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

                //onInit function was only called once, addEventDelegate + onBeforeShow by Deepak Raj
                //https://stackoverflow.com/questions/37757002/oninit-onafterrendering-not-being-called-when-returning-back-to-the-page
                this.getView().addEventDelegate({
                    onBeforeShow: function(evt){
                        //creates batch request so labels can read their values in JSON Model
                        oModel.read("/Club",{
                            //calls button color color change function if successful
                            success: function() {
                                this.buttonColor();
                            }.bind(this)
                        });
                    }.bind(this)
                })

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

                //sets 0 infront of nubers 0-9 (fixes 10:3 to 10:03)
                if (minute <= 9){
                    minute = "0" + minute
                } 

                //seperate hour and minute with a :
                var time = hour + ":" + minute;
                return time;
            },

            //logic for change of button color 
            buttonColor: function(){

            },

            //logic when club 1 button is pressed
            onZone1Press: function(){
                //set value for zoneInput field
                this.getView().byId("zoneInput").setValue("1");

                //get value from zone input field and set value in temporary data model
                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );

                //navigate to booking view
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("booking");
            },

            //logic when club 2 button is pressed
            onZone2Press: function(){
                //set value for zoneInput field
                this.getView().byId("zoneInput").setValue("2");

                //get value from zone input field and set value in temporary data model
                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );

                //navigate to booking view
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("booking");
            },

            //logic when club 3 button is pressed
            onZone3Press: function(){
                //set value for zoneInput field
                this.getView().byId("zoneInput").setValue("3");

                //get value from zone input field and set value in temporary data model
                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );

                //navigate to booking view
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("booking");
            },

            //logic when club 4 button is pressed
            onZone4Press: function(){
                //set value for zoneInput field
                this.getView().byId("zoneInput").setValue("4");

                //get value from zone input field and set value in temporary data model
                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );

                //navigate to booking view
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("booking");
            },

            //logic when club 5 button is pressed
            onZone5Press: function(){
                //set value for zoneInput field
                this.getView().byId("zoneInput").setValue("5");

                //get value from zone input field and set value in temporary data model
                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );

                //navigate to booking view
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("booking");
            },

            //logic when club 6 button is pressed
            onZone6Press: function(){
                //set value for zoneInput field
                this.getView().byId("zoneInput").setValue("6");

                //get value from zone input field and set value in temporary data model
                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );
                
                //navigate to booking view
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("booking");
            },

            //logic when club 7 button is pressed
            onZone7Press: function(){
                //set value for zoneInput field
                this.getView().byId("zoneInput").setValue("7");

                //get value from zone input field and set value in temporary data model
                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );

                //navigate to booking view
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("booking");
            },

            //logic when club 8 button is pressed
            onZone8Press: function(){
                //set value for zoneInput field
                this.getView().byId("zoneInput").setValue("8");

                //get value from zone input field and set value in temporary data model
                var tzone = sap.ui.getCore().byId(this.createId("zoneInput")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );

                //navigate to booking view
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("booking");
            },

            //navigate back to main view
            onBackPress: function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("app");
            },

            

		});
	});
