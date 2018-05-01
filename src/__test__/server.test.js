'use strict';

import faker from 'faker';
import superagent from 'superagent';
import Dragon from '../model/dragon';
import { startServer, stopServer } from '../lib/server';

const apiURL = `http://localhost:${process.env.PORT}/api/notes`;