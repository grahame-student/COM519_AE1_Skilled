const mongoose = require('mongoose');
const { Schema } = mongoose;

const skillSetSchema = new Schema(
  {
    group: { type: String, required: [true, 'A group name is required'], unique: true },
    skills: [{ type: String, unique: true }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('SkillSet', skillSetSchema);
