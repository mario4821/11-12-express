# Lab 11 - Express API

**Author**: Mario Flores Jr.

**Version**: 1.0.0

## Overview

This lab is a server build-up using Express and MongoDB. The router makes requests to endpoints, utilizing the Dragon schema as a model for the data. The database is a MongoDB Cloud remote deployment.  

## Functionality

1. To utilize MongoDB, ensure that link to database is entered into MONGODB_URI in the .env and test.env.js files using the following link:

```mongodb://username:password@ds163769.mlab.com:63769/11-express```

*Must obtain specific username and password from author.

2. To Post a new Dragon to the database, make a POST request.  Successful posts will return a 200 status code to the logs and will send a response to the MongoDB with id.

```dragonRouter.post('/api/dragons', jsonParser, (request, response) =>```

3. To make a GET request, utilize the id endpoint to retrieve the specific dragon of your choosing. If successful, a 200 status code is logged and a response sent. If id doesn't exist, a 404 status will be sent.

```dragonRouter.get('/api/dragons/:_id', (request, response) =>```

4. To delete a Dragon, make the request with the specific id endpoint. A 200 status code is then logged, along with a response notifying of the deletion. A 404 status code is sent if the Dragon does not exist.

```dragonRouter.delete('/api/dragons/:_id', (request, response) =>```
