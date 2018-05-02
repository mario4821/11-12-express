'use strict';

import faker from 'faker';
import superagent from 'superagent';
import Dragon from '../model/dragon';
import { startServer, stopServer } from '../lib/server';

const apiURL = `http://localhost:${process.env.PORT}/api/dragons`;

const createDragonMock = () => {
  return new Dragon({
    species: faker.lorem.words(10),
    color: faker.lorem.words(25),
  }).save();
};

describe('/api/dragons', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(() => Dragon.remove({}));
  test('POST - It should respond with a 200 status', () => {
    const dragonToPost = {
      species: faker.lorem.words(10),
      color: faker.lorem.words(50),
    };
    return superagent.post(apiURL)
      .send(dragonToPost)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.species).toEqual(dragonToPost.species);
        expect(response.body.color).toEqual(dragonToPost.color);
        expect(response.body._id).toBeTruthy();
        expect(response.body.timestamp).toBeTruthy();
      });
  });
  test('POST - should respond with a 400 status ', () => {
    const dragonToPost = {
      color: faker.lorem.words(50),
    };
    return superagent.post(apiURL)
      .send(dragonToPost)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  describe('GET /api/dragons', () => {
    test('should respond with 200 if there are no errors', () => {
      let dragonToTest = null;
      return createDragonMock()
        .then((dragon) => {
          dragonToTest = dragon;
          return superagent.get(`${apiURL}/${dragon._id}`);
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.species).toEqual(dragonToTest.species);
          expect(response.body.color).toEqual(dragonToTest.color);
        });
    });
    test('should respond with 404 if there is no dragon found', () => {
      return superagent.get(`${apiURL}/InvalidId`)
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });
  });
});
