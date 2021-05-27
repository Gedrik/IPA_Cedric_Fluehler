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
        var inactivityTime;

		return Controller.extend("workspacebookingns.ipacedricfluehler.controller.bookingOverview", {
			onInit: function () {
                //define oModel
                oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			    //set Model into view
                this.getView().setModel(oModel);

               

                //Read data from service
                //onInit function was only called once, addEventDelegate + onBeforeShow by Deepak Raj
                //https://stackoverflow.com/questions/37757002/oninit-onafterrendering-not-being-called-when-returning-back-to-the-page
                this.getView().addEventDelegate({
                    onBeforeShow: function(evt){
                        //creates batch request so labels can read their values in JSON Model
                        oModel.read("/Club"); 
                        //start inactivity timer
                        this.detectInactivity();
                    }.bind(this)
                })

                var that = this
                var timeLabel = this.getView().byId("page");
                var time = this.getTime();
                //sets the time value and title into header
                timeLabel.setTitle("Club Orientation, " + time);

                //updates the header every second to display correct time 
                setInterval(function() {
                    var time = that.getTime();
                    //set time value and a title into header
                    timeLabel.setTitle("Club Orientation, " + time);
                }, 1000);
            },
            
            //function to get Time
            getTime: function(){
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

            //confirm booking logic
            onConfirmPress: function(){
                oModel.read("/Club");
                var zone_id = this.getView().byId("inputZone").getValue();
                var intZone = parseInt(zone_id);
                var persons = this.getView().byId("inputQuantity").getValue();

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                //Get free places from odata service           
                var totalFree = oModel.getProperty("/Club("+zone_id+")/currentlyFree");
               //calculate new total free places                   
                var calculatedFree = parseInt(totalFree) - parseInt(persons);

                var oObject ={
                    "currentlyFree": calculatedFree
                };
                
               //safety that club can not be overbooked
                if(calculatedFree >= 0){
                    oModel.update("/Club("+zone_id+")", oObject, {
					success: function () {
                        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                        oRouter.navTo("app");
                        clearTimeout(inactivityTime);
                        setTimeout(function(){ sap.m.MessageToast.show("Booking Successful"); }, 500);
					}.bind(this),
					error: function () {
						sap.m.MessageToast.show("Booking Failed");
					}
                });

                }else{
                    sap.m.MessageToast.show("There isn't enough space available");
                } 
            },

             //detect user activity source: https://www.w3schools.com/jsref/dom_obj_event.asp
            detectInactivity: function() {
                //reset timer when view is loaded
                window.onload = function(){this.resetTimer();}.bind(this);
                //detect user activity and reset the timer if so
                document.onclick = function(){this.resetTimer();}.bind(this);
                document.ontouchmove = function(){this.resetTimer();}.bind(this);
                document.onkeypress = function(){this.resetTimer();}.bind(this);
                document.onmousemove = function(){this.resetTimer();}.bind(this);
            },
            
            resetTimer: function(){
                clearTimeout(inactivityTime);
                //calls mainMenuRouting fuction after 60 seconds (1000ms = 1 sec)
                //https://www.w3schools.com/jsref/met_win_cleartimeout.asp
                inactivityTime = setTimeout(function(){ 
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("app");
                }.bind(this), 60000);
            },

            //back navigation to booking view
            onBackPress: function(){
                clearTimeout(inactivityTime);
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("booking");
            }


		});
	});
