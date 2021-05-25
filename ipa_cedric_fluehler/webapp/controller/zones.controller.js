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

                //start inactivity timer
                this.detectInactivity();

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

                //sets 0 infront of nubers 0-9 (fixes 10:3 to 10:03 and 9:30 to 09:30)
                if (minute <= 9){
                    minute = "0" + minute
                };

                if (hour <= 9){
                    hour = "0" + hour
                }; 

                //seperate hour and minute with a :
                var time = hour + ":" + minute;
                return time;
            },

            //logic for change of button color 
            buttonColor: function(){
                var zone1 = oModel.getProperty("/Club(1)/currentlyFree");
                var zone2 = oModel.getProperty("/Club(2)/currentlyFree");
                var zone3 = oModel.getProperty("/Club(3)/currentlyFree");
                var zone4 = oModel.getProperty("/Club(4)/currentlyFree");
                var zone5 = oModel.getProperty("/Club(5)/currentlyFree");
                var zone6 = oModel.getProperty("/Club(6)/currentlyFree");
                var zone7 = oModel.getProperty("/Club(7)/currentlyFree");
                var zone8 = oModel.getProperty("/Club(8)/currentlyFree");
                

                    switch(zone1){
                        //deactivate button
                        case 0:
                            this.getView().byId("button1").setVisible(false);
                            this.getView().byId("button2").setVisible(false);
                            this.getView().byId("button3").setVisible(true);
                            this.getView().byId("button3").setBlocked(true);
                            this.getView().byId("button3").setEnabled(false);
                            break;
                        //red button
                        case 1: case 2: case 3:  
                            this.getView().byId("button1").setVisible(false);
                            this.getView().byId("button2").setVisible(false);
                            this.getView().byId("button3").setVisible(true);
                            this.getView().byId("button3").setBlocked(false);
                            this.getView().byId("button3").setEnabled(true);
                            break;
                        //orange button
                        case 4: case 5: case 6: case 7:
                            this.getView().byId("button1").setVisible(false);
                            this.getView().byId("button2").setVisible(true);
                            this.getView().byId("button3").setVisible(false);
                            this.getView().byId("button3").setBlocked(false);
                            this.getView().byId("button3").setEnabled(true);
                            break;
                        //green button
                        case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
                            this.getView().byId("button1").setVisible(true);
                            this.getView().byId("button2").setVisible(false);
                            this.getView().byId("button3").setVisible(false);
                            this.getView().byId("button3").setBlocked(false);
                            this.getView().byId("button3").setEnabled(true);
                            break;
                    }

                    switch(zone2){
                        //Knopf deaktivieren (kein freier Platz mehr)
                        case 0:
                            this.getView().byId("button4").setVisible(false);
                            this.getView().byId("button5").setVisible(false);
                            this.getView().byId("button6").setVisible(true);
                            this.getView().byId("button6").setBlocked(true);
                            this.getView().byId("button6").setEnabled(false);
                            break;
                        case 1: case 2:
                            //Roter Knopf (80-100% Ausgebucht)                               
                            this.getView().byId("button4").setVisible(false);
                            this.getView().byId("button5").setVisible(false);
                            this.getView().byId("button6").setVisible(true);
                            this.getView().byId("button6").setBlocked(false);
                            this.getView().byId("button6").setEnabled(true);
                            break;
                        case 3: case 4: case 5:
                            //Oranger Knopf (50-80% Ausgebucht)
                            this.getView().byId("button4").setVisible(false);
                            this.getView().byId("button5").setVisible(true);
                            this.getView().byId("button6").setVisible(false);
                            this.getView().byId("button6").setBlocked(false);
                            this.getView().byId("button6").setEnabled(true);
                            break;
                        case 6: case 7: case 8: case 9: case 10:
                            //Grüner Knopf (0-50% Ausgebucht)
                            this.getView().byId("button4").setVisible(true);
                            this.getView().byId("button5").setVisible(false);
                            this.getView().byId("button6").setVisible(false);
                            this.getView().byId("button6").setBlocked(false);
                            this.getView().byId("button6").setEnabled(true);
                            break;
                    }

                    switch(zone3){
                        case 0:
                            this.getView().byId("button7").setVisible(false);
                            this.getView().byId("button8").setVisible(false);
                            this.getView().byId("button9").setVisible(true);
                            this.getView().byId("button9").setBlocked(true);
                            this.getView().byId("button9").setEnabled(false);
                            break;
                        case 1: case 2: case 3:   
                            this.getView().byId("button7").setVisible(false);
                            this.getView().byId("button8").setVisible(false);
                            this.getView().byId("button9").setVisible(true);
                            this.getView().byId("button9").setBlocked(false);
                            this.getView().byId("button9").setEnabled(true);
                            break;
                        case 4: case 5: case 6: case 7:
                            this.getView().byId("button7").setVisible(false);
                            this.getView().byId("button8").setVisible(true);
                            this.getView().byId("button9").setVisible(false);
                            this.getView().byId("button9").setBlocked(false);
                            this.getView().byId("button9").setEnabled(true);
                            break;
                        case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
                            this.getView().byId("button7").setVisible(true);
                            this.getView().byId("button8").setVisible(false);
                            this.getView().byId("button9").setVisible(false);
                            this.getView().byId("button9").setBlocked(false);
                            this.getView().byId("button9").setEnabled(true);
                            break;
                    }

                    switch(zone4){
                        case 0:
                            this.getView().byId("button10").setVisible(false);
                            this.getView().byId("button11").setVisible(false);
                            this.getView().byId("button12").setVisible(true);
                            this.getView().byId("button12").setBlocked(true);
                            this.getView().byId("button12").setEnabled(false);
                            break;
                        case 1: case 2: case 3:   
                            this.getView().byId("button10").setVisible(false);
                            this.getView().byId("button11").setVisible(false);
                            this.getView().byId("button12").setVisible(true);
                            this.getView().byId("button12").setBlocked(false);
                            this.getView().byId("button12").setEnabled(true);
                            break;
                        case 4: case 5: case 6: case 7:
                            this.getView().byId("button10").setVisible(false);
                            this.getView().byId("button11").setVisible(true);
                            this.getView().byId("button12").setVisible(false);
                            this.getView().byId("button12").setBlocked(false);
                            this.getView().byId("button12").setEnabled(true);
                            break;
                        case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
                            this.getView().byId("button10").setVisible(true);
                            this.getView().byId("button11").setVisible(false);
                            this.getView().byId("button12").setVisible(false);
                            this.getView().byId("button12").setBlocked(false);
                            this.getView().byId("button12").setEnabled(true);
                            break;
                    }

                    switch(zone5){
                        case 0:
                            this.getView().byId("button13").setVisible(false);
                            this.getView().byId("button14").setVisible(false);
                            this.getView().byId("button15").setVisible(true);
                            this.getView().byId("button15").setBlocked(true);
                            this.getView().byId("button15").setEnabled(false);
                            break;
                        case 1: case 2:   
                            this.getView().byId("button13").setVisible(false);
                            this.getView().byId("button14").setVisible(false);
                            this.getView().byId("button15").setVisible(true);
                            this.getView().byId("button15").setBlocked(false);
                            this.getView().byId("button15").setEnabled(true);
                            break;
                        case 3: case 4: case 5: case 6:
                            this.getView().byId("button13").setVisible(false);
                            this.getView().byId("button14").setVisible(true);
                            this.getView().byId("button15").setVisible(false);
                            this.getView().byId("button15").setBlocked(false);
                            this.getView().byId("button15").setEnabled(true);
                            break;
                         case 7: case 8: case 9: case 10: case 11: case 12:
                            this.getView().byId("button13").setVisible(true);
                            this.getView().byId("button14").setVisible(false);
                            this.getView().byId("button15").setVisible(false);
                            this.getView().byId("button15").setBlocked(false);
                            this.getView().byId("button15").setEnabled(true);
                            break;
                    }

                    switch(zone6){
                        case 0:
                            this.getView().byId("button16").setVisible(false);
                            this.getView().byId("button17").setVisible(false);
                            this.getView().byId("button18").setVisible(true);
                            this.getView().byId("button18").setBlocked(true);
                            this.getView().byId("button18").setEnabled(false);
                            break;
                        case 1: case 2: case 3:    
                            this.getView().byId("button16").setVisible(false);
                            this.getView().byId("button17").setVisible(false);
                            this.getView().byId("button18").setVisible(true);
                            this.getView().byId("button18").setBlocked(false);
                            this.getView().byId("button18").setEnabled(true);
                            break;
                        case 4: case 5: case 6: case 7:
                            this.getView().byId("button16").setVisible(false);
                            this.getView().byId("button17").setVisible(true);
                            this.getView().byId("button18").setVisible(false);
                            this.getView().byId("button18").setBlocked(false);
                            this.getView().byId("button18").setEnabled(true);
                            break;
                        case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
                            this.getView().byId("button16").setVisible(true);
                            this.getView().byId("button17").setVisible(false);
                            this.getView().byId("button18").setVisible(false);
                            this.getView().byId("button18").setBlocked(false);
                            this.getView().byId("button18").setEnabled(true);
                            break;
                    }

                    switch(zone7){
                        case 0:
                            this.getView().byId("button19").setVisible(false);
                            this.getView().byId("button20").setVisible(false);
                            this.getView().byId("button21").setVisible(true);
                            this.getView().byId("button21").setBlocked(true);
                            this.getView().byId("button21").setEnabled(false);
                            break;
                        case 1: case 2: case 3:   
                            this.getView().byId("button19").setVisible(false);
                            this.getView().byId("button20").setVisible(false);
                            this.getView().byId("button21").setVisible(true);
                            this.getView().byId("button21").setBlocked(false);
                            this.getView().byId("button21").setEnabled(true);
                            break;
                        case 4: case 5: case 6: case 7:
                            this.getView().byId("button19").setVisible(false);
                            this.getView().byId("button20").setVisible(true);
                            this.getView().byId("button21").setVisible(false);
                            this.getView().byId("button21").setBlocked(false);
                            this.getView().byId("button21").setEnabled(true);
                            break;
                        case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
                            this.getView().byId("button19").setVisible(true);
                            this.getView().byId("button20").setVisible(false);
                            this.getView().byId("button21").setVisible(false);
                            this.getView().byId("button21").setBlocked(false);
                            this.getView().byId("button21").setEnabled(true);
                            break;
                    }

                    switch(zone8){
                        case 0:
                            this.getView().byId("button22").setVisible(false);
                            this.getView().byId("button23").setVisible(false);
                            this.getView().byId("button24").setVisible(true);
                            this.getView().byId("button24").setBlocked(true);
                            this.getView().byId("button24").setEnabled(false);
                            break;
                        case 1: case 2:  
                            this.getView().byId("button22").setVisible(false);
                            this.getView().byId("button23").setVisible(false);
                            this.getView().byId("button24").setVisible(true);
                            this.getView().byId("button24").setBlocked(false);
                            this.getView().byId("button24").setEnabled(true);
                            break;
                        case 3: case 4: case 5: case 6:
                            this.getView().byId("button22").setVisible(false);
                            this.getView().byId("button23").setVisible(true);
                            this.getView().byId("button24").setVisible(false);
                            this.getView().byId("button24").setBlocked(false);
                            this.getView().byId("button24").setEnabled(true);
                            break;
                        case 7: case 8: case 9: case 10: case 11: case 12:
                            this.getView().byId("button22").setVisible(true);
                            this.getView().byId("button23").setVisible(false);
                            this.getView().byId("button24").setVisible(false);
                            this.getView().byId("button24").setBlocked(false);
                            this.getView().byId("button24").setEnabled(true);
                            break;
                    }
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

            startState: function(){
                this.getView().byId("button1").setVisible(false);
                this.getView().byId("button2").setVisible(false);
                this.getView().byId("button3").setVisible(false);
                this.getView().byId("button4").setVisible(false);
                this.getView().byId("button5").setVisible(false);
                this.getView().byId("button6").setVisible(false);
                this.getView().byId("button7").setVisible(false);
                this.getView().byId("button8").setVisible(false);
                this.getView().byId("button9").setVisible(false);
                this.getView().byId("button10").setVisible(false);
                this.getView().byId("button11").setVisible(false);
                this.getView().byId("button12").setVisible(false);
                this.getView().byId("button13").setVisible(false);
                this.getView().byId("button14").setVisible(false);
                this.getView().byId("button15").setVisible(false);
                this.getView().byId("button16").setVisible(false);
                this.getView().byId("button17").setVisible(false);
                this.getView().byId("button18").setVisible(false);
                this.getView().byId("button19").setVisible(false);
                this.getView().byId("button20").setVisible(false);
                this.getView().byId("button21").setVisible(false);
                this.getView().byId("button22").setVisible(false);
                this.getView().byId("button23").setVisible(false);
                this.getView().byId("button24").setVisible(false);
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
            
            //navigate back to main view
            onBackPress: function(){
                this.startState();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("app");
            },

            

		});
	});
