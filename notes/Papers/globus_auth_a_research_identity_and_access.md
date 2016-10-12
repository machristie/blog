# Globus Auth: A Research Identity and Access Management Platform

Rachana Ananthakrishnan, Kyle Chard, Ian Foster, Mattias Lidman, Brendan McCollam, Stephen Rosen, and Steven Tuecke Computation Institute

## Synopsis

Globus Auth leverages OAuth2 and OpenID Connect protocols to build a general authorization service to be used by grid middleware.  The general process of how Globus Auth works is

1. A client is trying to access a protected resource
2. The resource redirects the client to Globus Auth
3. Globus Auth redirects to an identity provider of the user's choosing.
4. Once authenticated, Globus Auth is able to generate an access token.
5. The client is now able to use the access token to gain access to the resource.

I have some questions about how the resource servers interact with Globus Auth. It seems that they call RESTful API to verify the token and get some information. But I'm not clear on where the authorization information resides. I'm guessing that it must reside in Globus Auth. The resource servers must publish to Globus Auth what resources a user has access to so that the user can actually grant access to those things.

One unique feature of Globus Auth is that it has a mechanism for delegated authorization. Question: how is delegated authorization normally handled in OAuth2?

Paper mentions Airavata and Agave and their authorization models.

OAuth2 terminology
* a *resource* is addressable via URL
* a *client* requests access to a protected resource. For example, a web browser.
* a *resource owner* is the entity that can grant access. For example, a user.
* a *resource server* provides access to resources if given a valid authorization access token.