
# How PGA works with IS today

* when logging in, the user's username and password are passed to 
  WSO2 IS to log in directly
* authzToken is put into the session

# How does Airavata use IS today

* AuthzToken passed as first parameter to Airavata API methods
* Secured methods are annotated with `@SecurityCheck`
* `SecurityModule` adds the `SecurityInteceptor` to all methods that are annotated with `@SecurityCheck`
* `SecurityInteceptor` calls AiravataSecurityManager (DefaultAiravataSecurityManager), `isUserAuthorized`, passing the token and the method to be invoked
* DefaultAiravataSecurityManager checks with IS
    * first to see if the access token is valid
    * second to see if the user is authorized for the method
* Looks like IS checks the XACML policy
    * the XACML policy file is here: https://github.com/apache/airavata/blob/eaf20ccf26819132d17aed02aed8601383298d54/modules/configuration/server/src/main/resources/airavata-default-xacml-policy.xml
    * you can also view it in IS Management Console by logging in and going to the PDP Policy View

# How would PGA/IS work with an external identity server?