({


    loadCurrentUserCases : function(cmp) {
        var action = cmp.get("c.getLoggedInCases");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.cases", this.renderOpen(response.getReturnValue()));
                cmp.set("v.caseList", response.getReturnValue());
                this.updateTotal(cmp);
            }

        });
         $A.enqueueAction(action);
         this.loadUsers(cmp);
         this.loadCurrentUser(cmp);
    },



   loadCases : function(cmp) {
        var action = cmp.get("c.getCases");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.cases", this.renderOpen(response.getReturnValue()));
                cmp.set("v.caseList", response.getReturnValue());
                this.updateTotal(cmp);
            }

        });
         $A.enqueueAction(action);
         //this.loadUsers(cmp);
         //this.loadCurrentUser(cmp);
    },

    loadUsers : function(cmp) {
        var action = cmp.get("c.getUsers");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var all = {}
                all.Id = "all";
                all.Name = "All";
                result.splice(0, 0, all);
                cmp.set("v.users", result);
            }

        });
         $A.enqueueAction(action);
    },

    loadCurrentUser : function(cmp) {
        var action = cmp.get("c.getLoggedIn");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = JSON.parse(response.getReturnValue());
                cmp.set("v.loggedInID", res.id);
                cmp.set("v.loggedInName", res.name);
            }

        });
         $A.enqueueAction(action);
    },

    loadusersCases : function (cmp, value) {
        var action = cmp.get("c.getUserCases");
        action.setParams({ idd : value });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.cases", this.renderOpen(response.getReturnValue()));
                cmp.set("v.caseList", response.getReturnValue());
                this.updateTotal(cmp);
            }

        });
         $A.enqueueAction(action);
    },
     

    renderOpen: function(casearry) {
        var filter = [];
        var k = 0;
        for (var i=0; i<casearry.length; i++){
            var c = casearry[i];
            
            if(c.Status == "New" || c.Status == "Customer Awaiting Response" || c.Status == "In Progress") {
                filter[k] = c;
                k++; 
            }
        }
        return filter;
    },


    updateTotal: function(cmp) {
      var cases = cmp.get("v.caseList");
      
      var n = 0;
      var p = 0;
      var o = 0;
      var cl = 0;
      for (var i=0; i<cases.length; i++){
          var c = cases[i];

        if(c.Status == "New" || c.Status == "Customer Awaiting Response" || c.Status == "In Progress") {
            n++;
        }

        if(c.Status == "Waiting for Customer") {
            p ++; 
        }

        if(c.Status == "Engineering Review") {
            o++; 
        }

        if(c.Status == "Closed" || c.Status == "Merged") {
            cl++; 
        }

      }

      cmp.set("v.totalCases", cases.length);
      cmp.set("v.totalNewCases", n);
      cmp.set("v.totalPendingCases", p);
      cmp.set("v.totalOnHoldCases", o);
      cmp.set("v.totalClosedCases", cl);
    },

    handleUserList: function(component) {
        let sel = component.find("select").getElement();
        sel.selectedIndex = 0;
    },

    handleButtons: function(component, val1) {
        var selected = val1;
        if (selected == "open") {
            component.set("v.currentSelection", "Open");
            var elem = component.find("btnopen");
            var present = $A.util.hasClass(elem, "active");
            if (!present) {
                $A.util.addClass(elem, "active");
            }  
        } else {
            var elem = component.find("btnopen");
            var present = $A.util.hasClass(elem, "active");
            if (present) {
                $A.util.removeClass(elem, "active");
            }
        }


        if (selected == "pending") {
            component.set("v.currentSelection", "Pending");
            var elem = component.find("btnpending");
            var present = $A.util.hasClass(elem, "active");
            if (!present) {
                $A.util.addClass(elem, "active");
            }  
        } else {
            var elem = component.find("btnpending");
            var present = $A.util.hasClass(elem, "active");
            if (present) {
                $A.util.removeClass(elem, "active");
            }
        }

        if (selected == "onhold") {
            component.set("v.currentSelection", "On Hold");
            var elem = component.find("btnonhold");
            var present = $A.util.hasClass(elem, "active");
            if (!present) {
                $A.util.addClass(elem, "active");
            }  
        } else {
            var elem = component.find("btnonhold");
            var present = $A.util.hasClass(elem, "active");
            if (present) {
                $A.util.removeClass(elem, "active");
            }
        }

        if (selected == "closed") {
            component.set("v.currentSelection", "Closed");
            var elem = component.find("btnclosed");
            var present = $A.util.hasClass(elem, "active");
            if (!present) {
                $A.util.addClass(elem, "active");
            }  
        } else {
            var elem = component.find("btnclosed");
            var present = $A.util.hasClass(elem, "active");
            if (present) {
                $A.util.removeClass(elem, "active");
            }
        }
    }


})