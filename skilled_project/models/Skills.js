const mongoose = require('mongoose');
const { Schema } = mongoose;

const skillsSchema = new Schema(
  {
    group: { type: String, required: [true, 'skill group is required'], unique: true },
  },
  { timestamps: true }
);
