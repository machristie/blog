
<!--
# Using Google's Places Autocomplete API to find directions
-->

I'm currently integrating Google's [Places Autocomplete
API](https://developers.google.com/places/documentation/autocomplete) into the
[FuelMyRoute](http://fuelmyroute.com) Android app.  This way as soon as a user
starts typing a destination, the location will autocomplete.

The Places Autocomplete API response is something like this:

    :::javascript
    {
    "predictions" : [
        {
            "description" : "Barnes & Noble, East 3rd Street, Bloomington, IN, United States",
            "id" : "5c94b4b6d6ffdc0402451f0ccacd65d04c92b1be",
            "matched_substrings" : [
                {
                "length" : 6,
                "offset" : 0
                }
            ],
            "reference" : "CoQBeAAAAIcYT-uv-ryTSOBQ8Cl3W313c9fuh-J5KCY8N0k-QDVPWGD65lIgs9ZpXar6eIMJ3ey5HL-3d1yMChPIwcO9uDSFdyl_NeHcOgpSFVfqsbBh-E_F0QfVviuZHGPicPRLsGvEXP5jC6NuBZ2-0jQnxVzRNN-6W9XaXxFURgW115mLEhD3vouWuAImM-yWSat1opedGhROZAG_tNmuisZo82H0DOvw-yqj5Q",
            "terms" : [
                {
                "offset" : 0,
                "value" : "Barnes & Noble"
                },
                {
                "offset" : 16,
                "value" : "East 3rd Street"
                },
                {
                "offset" : 33,
                "value" : "Bloomington"
                },
                {
                "offset" : 46,
                "value" : "IN"
                },
                {
                "offset" : 50,
                "value" : "United States"
                }
            ],
            "types" : [ "establishment", "geocode" ]
        },
        ...

I was then feeding the **description** (in the case above, *Barnes & Noble, East 3rd Street, Bloomington, IN, United States*) as the destination to Google's [Directions API](https://developers.google.com/maps/documentation/directions/).

However, this turns out to only work sometimes. The **description** returned by
the Autocomplete API is not necessarily detailed enough to resolve to a geocoded address.

What you need to do instead is take the **reference** field for a location and
pass it to yet another API, the [Place Details API](https://developers.google.com/places/documentation/details). These request URLs look like

    https://maps.googleapis.com/maps/api/place/details/json?\
        reference=CoQBeAAAAIcYT...&sensor=true&key=API_KEY_HERE

The result of which looks like this

    :::javascript
    {
    "html_attributions" : [],
    "result" : {
        "address_components" : [
            {
                "long_name" : "2813",
                "short_name" : "2813",
                "types" : [ "street_number" ]
            },
            {
                "long_name" : "E 3rd St",
                "short_name" : "E 3rd St",
                "types" : [ "route" ]
            },
            {
                "long_name" : "Bloomington",
                "short_name" : "Bloomington",
                "types" : [ "locality", "political" ]
            },
            {
                "long_name" : "IN",
                "short_name" : "IN",
                "types" : [ "administrative_area_level_1", "political" ]
            },
            {
                "long_name" : "United States",
                "short_name" : "US",
                "types" : [ "country", "political" ]
            },
            {
                "long_name" : "47408",
                "short_name" : "47408",
                "types" : [ "postal_code" ]
            }
        ],
        "adr_address" : "\u003cspan class=\"street-address\"\u003e2813 E 3rd St\u003c/span\u003e, \u003cspan class=\"locality\"\u003eBloomington\u003c/span\u003e, \u003cspan class=\"region\"\u003eIN\u003c/span\u003e \u003cspan class=\"postal-code\"\u003e47408\u003c/span\u003e, \u003cspan class=\"country-name\"\u003eUnited States\u003c/span\u003e",
        "formatted_address" : "2813 E 3rd St, Bloomington, IN, United States",
        "formatted_phone_number" : "(812) 331-0669",
        "geometry" : {
            "location" : {
                "lat" : 39.165632,
                "lng" : -86.49625899999999
            }
        },
        ...

You can get the latitude/longitude from **geometry.location** (also the
**formatted_address** would likely work as well as a destination in a Directions
API request). Now you can make a Directions API request with an exact
destination.
