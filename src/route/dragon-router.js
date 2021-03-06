'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import Dragon from '../model/dragon';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();

const dragonRouter = new Router();

dragonRouter.post('/api/dragons', jsonParser, (request, response) => {
  logger.log(logger.INFO, 'POST - processing a request');
  if (!request.body.species || !request.body.color || !request.body.location) {
    logger.log(logger.INFO, 'Responding with a 400 error code');
    return response.sendStatus(400);
  }
  return new Dragon(request.body).save()
    .then((dragon) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      return response.json(dragon);
    })
    .catch((error) => {
      logger.log(logger.ERROR, '__POST_ERROR__');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

dragonRouter.get('/api/dragons/:_id', (request, response) => {
  logger.log(logger.INFO, 'GET - processing a request');

  return Dragon.findById(request.params._id)
    .then((dragon) => {
      if (!dragon) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code');
        return response.sendStatus(404);
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(dragon);
    })
    .catch((error) => {
      if (error.message.toLowerCase().indexOf('cast to objectid failed') > -1) {
        logger.log(logger.INFO, `GET error - could not parse the specific object id ${request.params._id}`);
        return response.sendStatus(404);
      }
      logger.log(logger.ERROR, '__GET_ERROR__Returning a 500 status code');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

dragonRouter.delete('/api/dragons/:_id', (request, response) => {
  logger.log(logger.INFO, 'DELETE - processing request');
  return Dragon.findByIdAndRemove(request.params._id)
    .then((dragon) => {
      if (!dragon) {
        logger.log(logger.INFO, 'DELETE error - no dragon found with this id');
        return response.sendStatus(404);
      }
      logger.log(logger.INFO, 'DELETE request processed - 200 status');
      return response.sendStatus(200);
    })
    .catch((error) => {
      if (error.message.toLowerCase().indexOf('objectid failed') > -1) {
        logger.log(logger.INFO, `GET error - could not parse id: ${request.params._id}`);
        return response.sendStatus(404);
      }
      logger.log(logger.ERROR, 'DELETE ERROR 500');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

export default dragonRouter;
