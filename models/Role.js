/**
 * Each named job role requires a specified level in each skill.
 * Over time the required skills may change.
 * Skills are grouped into related categories.
 *
 * Role                   Role object
 *   Title                Job title
 *   RequireSkills[]      Instances of Role requirements
 *     TimeStamp          Timestamp that requirements instance was created
 *     Skills[]           Instances of grouped skill category
 *       Group            Name of the Skill Category
 *       Skills[]         List of Skills within the Category
 *         Skill          Name of the Skill within the Category
 *         Level          Required level of expertise for the Skill
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const skillRequirementSchema = new Schema({
  dateDefined: { type: Date, required: [true, 'A time stamp is required'], unique: true, default: Date.now },
  skills: [
    {
      group: { type: String, required: [true, 'A skill group is required'], unique: true },
      skills: [
        {
          skill: { type: String, unique: true },
          level: { type: Number, min: 0, max: 4, get: v => Math.round(v), set: v => Math.round(v) }
        }
      ]
    }
  ]
});

const roleSchema = new Schema(
  {
    title: { type: String, required: [true, 'A job title is required'], unique: true },
    'required skills': [skillRequirementSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Role', roleSchema, 'roles');
