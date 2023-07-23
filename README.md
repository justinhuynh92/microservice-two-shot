# Wardrobify

Team:

Mitchell - Shoes Microservice
Justin - Hats Microservice

## Design

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

## Hats microservice

In the hats microservice, we built a Hat model entity that can be uniquely identified within its own database. We added locations as the foreign key since there can be many hats in one location. We built a Location value object because we're referencing its data so we want it to be immutable. Lastly, we integrated the wardrobe microservice by creating a poller that requests data from the wardrobe API to update the LocationVO database so we don't alter the wardobe API's original location data.

