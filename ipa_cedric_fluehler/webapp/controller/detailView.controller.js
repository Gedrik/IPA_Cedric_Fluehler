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

		return Controller.extend("workspacebookingns.ipacedricfluehler.controller.detailView", {
			onInit: function () {
                //define oModel
                oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			    //set Model into view
                this.getView().setModel(oModel);

                //onInit function was only called once, addEventDelegate + onBeforeShow by Deepak Raj
                //https://stackoverflow.com/questions/37757002/oninit-onafterrendering-not-being-called-when-returning-back-to-the-page
                this.getView().addEventDelegate({
                    onBeforeShow: function(evt){
                        //start inactivity timer
                        this.detectInactivity();
                    }.bind(this)
                });

                var that = this
                var timeLabel = this.getView().byId("page");
                //get value from getTime function
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

            //detect user activity source: https://www.w3schools.com/jsref/dom_obj_event.asp
            detectInactivity: function() {
                //reset timer when view is loaded
                window.onload = this.resetTimer();
                //detect user activity and reset the timer if so
                document.onmousemove = this.resetTimer();
                document.onkeypress = this.resetTimer();
                document.ontouchmove = this.resetTimer();
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
            
            //back navigation to main view
            onBackPress: function (){
                clearTimeout(inactivityTime);
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("app");
            },
		});
	});
