({
    doInit : function(component, event, helper) {
        console.log("innit triggered");
        helper.loadCurrentUserCases(component);
        helper.handleButtons(component, "open");
    },

    handleUserSelect : function(component, event, helper) {
        var value = event.getSource().get("v.value");
        if (value == "all") {
            helper.loadCases(component);
        } else {
            helper.loadusersCases(component, value);
        }
        
        helper.handleButtons(component, "open");
    },
    
    handleSelect : function(component, event, helper) {
        var cases = component.get("v.cases");
        var caseList = component.get("v.caseList");
        var selected = event.getSource().get("v.name");
    
        var filter = [];
        var k = 0;
        for (var i=0; i<caseList.length; i++){
            var c = caseList[i];
            
            if (selected == "open") {
                if(c.Status == "New" || c.Status == "Customer Awaiting Response" || c.Status == "In Progress") {
                    filter[k] = c;
                    k++; 
                }
            }

            if (selected == "pending") {
                if(c.Status == "Waiting for Customer") {
                    filter[k] = c;
                    k++; 
                }
            }

            if (selected == "onhold") {
                if(c.Status == "Engineering Review") {
                    filter[k] = c;
                    k++; 
                }
            }

            if (selected == "closed") {
                if(c.Status == "Closed" || c.Status == "Merged") {
                    filter[k] = c;
                    k++; 
                }
            }
                
        }

        helper.handleButtons(component, selected);
        component.set("v.cases", filter);
        //component.set("v.currentNumTickets", filter.length);
    }
})