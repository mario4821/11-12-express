'use strict';

import mongoose from 'mongoose';

const dragonSchema = mongoose.Schema({
  species: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

export default mongoose.model('dragon', dragonSchema);
