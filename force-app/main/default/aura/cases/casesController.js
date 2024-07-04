({ 
    goToRecord : function(component, event, helper) {
        /*
        var recordId = component.get("v.case.Id")
        sforce.one.navigateToSObject(recordId, 'detail')
        */
        var sObjectEvent = $A.get("e.force:navigateToSObject");
        sObjectEvent.setParams({
            "recordId": component.get("v.case.Id")
        })
        sObjectEvent.fire();
        
    }
})