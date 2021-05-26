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
                //define oModel
                oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			    //set Model into view
                this.getView().setModel(oModel);

                var that = this
                //get id of page header
                var timeLabel = this.getView().byId("page");
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

            //to zones view navigation
            onBookingPress: function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("zones");
            },

            //to detail view navigation
            onDetailPress: function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("detailView");
            },

		});
	});
