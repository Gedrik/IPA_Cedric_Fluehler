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

                //start inactivity timer
                this.detectInactivity();

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

            //function for 1 person button
            onQuantity1Press: function(){

                //set value for quantity input field
                this.getView().byId("quantityCache").setValue("1");

                //get value from quantity input field and set value in temporary data model
                var tquantity = sap.ui.getCore().byId(this.createId("quantityCache")).getValue();
                this.getView().getModel("TempDataModel2").setProperty("/",{ "Quantity":tquantity} );
                
                //get value from zone input field and set value in temporary data model
                var tzone = sap.ui.getCore().byId(this.createId("zoneCache")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );

                //navigation to booking overview
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("bookingOverview");

            },

            //function for 2 person button
            onQuantity2Press: function(){

                //set value for quantity input field
                this.getView().byId("quantityCache").setValue("2");

                //get value from quantity input field and set value in temporary data model
                var tquantity = sap.ui.getCore().byId(this.createId("quantityCache")).getValue();
                this.getView().getModel("TempDataModel2").setProperty("/",{ "Quantity":tquantity} );
                
                //get value from zone input field and set value in temporary data model
                var tzone = sap.ui.getCore().byId(this.createId("zoneCache")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );

                //navigation to booking overview
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("bookingOverview");
            },

            //function for 3 person button
            onQuantity3Press: function(){

                //set value for quantity input field
                this.getView().byId("quantityCache").setValue("3");

                //get value from quantity input field and set value in temporary data model
                var tquantity = sap.ui.getCore().byId(this.createId("quantityCache")).getValue();
                this.getView().getModel("TempDataModel2").setProperty("/",{ "Quantity":tquantity} );
                
                //get value from zone input field and set value in temporary data model
                var tzone = sap.ui.getCore().byId(this.createId("zoneCache")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );

                //navigation to booking overview
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("bookingOverview");
            },

            //function for 4 person button
            onQuantity4Press: function(){

                //set value for quantity input field
                this.getView().byId("quantityCache").setValue("4");

                //get value from quantity input field and set value in temporary data model
                var tquantity = sap.ui.getCore().byId(this.createId("quantityCache")).getValue();
                this.getView().getModel("TempDataModel2").setProperty("/",{ "Quantity":tquantity} );
                
                //get value from zone input field and set value in temporary data model
                var tzone = sap.ui.getCore().byId(this.createId("zoneCache")).getValue();
                this.getView().getModel("TempDataModel").setProperty("/",{ "Zone":tzone} );

                //navigation to booking overview
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("bookingOverview");
            },

            //resetTimer function inspired by: https://www.kirupa.com/html5/detecting_if_the_user_is_idle_or_inactive.htm
            //detect user activity source: https://www.w3schools.com/jsref/dom_obj_event.asp
            detectInactivity: function() {
                var inactivityTime;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                
                //reset timer when view is loaded
                window.onload = resetTimer;
                //detect user activity and reset the timer if so
                document.onmousemove = resetTimer;
                document.onkeypress = resetTimer;
                document.ontouchmove = resetTimer;

                //routing to main view
                function mainMenuRouting() {
                    oRouter.navTo("app");
                }

                //resets timer after activity is detectet
                function resetTimer() {
                    //clears value in inactivityTime variable
                    clearTimeout(inactivityTime);
                    //calls mainMenuRouting fuction after 60 seconds (1000ms = 1 sec)
                    inactivityTime = setTimeout(mainMenuRouting, 60000)
                }
            },

            //back navigation to zones view
            onBackPress: function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("zones");
            },

		});
	});
