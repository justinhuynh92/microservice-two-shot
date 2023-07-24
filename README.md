# Wardrobify

Team:

Mitchell - Shoes Microservice
Justin - Hats Microservice

## Design

## Shoes microservice

I made a shoe detail model, bin model/enconder. The shoe detail model passes information to the warddrobe api to render a list of created Shoes, create shoes after the form is filled out. And the location encoder has bins in the drop down menu of my shoes form as it communicates with the wardrobe api.

## Hats microservice

In the hats microservice, we built a Hat model entity that can be uniquely identified within its own database. We added locations as the foreign key since there can be many hats in one location. We built a Location value object because we're referencing its data so we want it to be immutable. Lastly, we integrated the wardrobe microservice by creating a poller that requests data from the wardrobe API to update the LocationVO database so we don't alter the wardobe API's original location data.

