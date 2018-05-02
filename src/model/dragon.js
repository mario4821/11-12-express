'use strict';

import mongoose from 'mongoose';

const dragonSchema = mongoose.Schema({
  species: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
    minlength: 10,
  },
  birth: {
    type: Date,
    default: () => new Date(),
  },
});

export default mongoose.model('dragon', dragonSchema);
