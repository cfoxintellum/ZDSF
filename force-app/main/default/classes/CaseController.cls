public with sharing class CaseController {

    @AuraEnabled
        public static List<Case> getCases() {
            List<Case> cases = [SELECT CaseNumber, AccountId, ContactId, CreatedDate, Status, Subject, Account.Name, Contact.Name FROM Case WHERE Status != 'closed' AND Status != 'merged' ORDER BY CreatedDate DESC];
            List<Case> closedCases = [SELECT CaseNumber, AccountId, ContactId, CreatedDate, Status, Subject, Account.Name, Contact.Name FROM Case WHERE Status = 'closed' OR Status = 'merged' ORDER BY CreatedDate DESC LIMIT 25];
            cases.addAll(closedCases);
                    
            return cases;
        }
    
    @AuraEnabled
        public static List<Case> getLoggedInCases() {
            String userid = userinfo.getUserId();
            return getUserCases(userid);
        }
    
    @AuraEnabled
        public static List<User> getUsers() {
            String userid = userinfo.getUserId();
            List<User> users = [select Id, Name from User where UserRoleId IN ('00EVX000002wUnl2AE', '00EVX000002wUpN2AU', '00EVX000002wEPe2AM', '00EVX000002wUcT2AU', '00EVX000002wUe52AE') and Id != :userid];				
            return users;
        }
    
    @AuraEnabled
    public static List<Case> getUserCases(String idd) {
        String userid = idd;
    
        List<Case> cases = [SELECT CaseNumber, AccountId, ContactId, CreatedDate, Status, Subject, Account.Name, Contact.Name FROM Case WHERE Status != 'closed' AND Status != 'merged' AND OwnerId = :userid ORDER BY CreatedDate DESC];
        List<Case> closedCases = [SELECT CaseNumber, AccountId, ContactId, CreatedDate, Status, Subject, Account.Name, Contact.Name FROM Case WHERE (Status = 'closed' OR Status = 'merged') AND OwnerId = :userid ORDER BY CreatedDate DESC LIMIT 25 ];
        cases.addAll(closedCases);
                
        return cases;
        }
    
    @AuraEnabled
      public static String getLoggedIn() {
    
        Map<String, String> result = new Map<String, String> {
            'id' => userinfo.getUserId(),
            'name' => userinfo.getName()
         };
         return JSON.serialize(result);
      }
    
    }
    
    
    
    
    
    /*
    public with sharing class CaseController {
    @AuraEnabled
        public static List<Case> getCases() {
            List<Case> cases = 
                    [SELECT CaseNumber, AccountId, ContactId, CreatedDate, Status, Subject, Account.Name, Contact.Name FROM Case ORDER BY CreatedDate DESC LIMIT 100];
                    //SELECT CaseNumber, AccountId, CreatedDate, Status, Subject, ContactId FROM Case
            return cases;
        }
    }
    
    */
    
    //get current logged in user
    //OwnerId=:UserInfo.getUserID()