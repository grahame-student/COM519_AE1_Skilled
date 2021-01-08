const mongoose = require('mongoose');
const { Schema } = mongoose;

const skillSetsSchema = new Schema(
  {
    group: { type: String, required: [true, 'skill group is required'], unique: true },
    skills: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('SkillSets', skillSetsSchema);
