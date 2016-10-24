
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

Let's assume [CILogon OpenID-Connect](http://www.cilogon.org/oidc).

## Setup steps

1. Register with https://cilogon.org/oauth2/register
    * need the WSO2 IS callback URL: https://idp.scigap.org:9443/commonauth
2. Register CILogon as an inbound authentication provider with WSO2 IS
    * In WSO2 IS, under *Identity Providers*, click *Add* and follow the instructions for OpenID-Connect.

## Process flow

1. PGA needs to log in the user.
2. PGA redirects to WSO2 IS.
3. WSO2 IS redirects to 
https://cilogon.org/authorize?response_type=code&client_id=myproxy:oa4mp,2012:/client_id/6e8fdae3459dac6c685c6b6de37c188c&redirect_uri=https://idp.scigap.org:9443/commonauth&scope=openid+profile+email+org.cilogon.userinfo
4. User authenticates with his/her institution.
5. CILogon redirects to callback URL (WSO2 IS): https://idp.scigap.org:9443/commonauth?code=https%3A%2F%2Fcilogon.org%2Foauth2%2FauthzGrant%2F331685b3f0a1b02590e9c36e19d3381%2F1454019750150
