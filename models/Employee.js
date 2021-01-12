const mongoose = require('mongoose');
require('mongoose-type-email');
const { Schema } = mongoose;

const AssessedSkillSchema = new Schema({
  skill: { type: String, required: [true, 'A skill name is required'] },
  'required level': { type: Number, min: 0, max: 4, get: v => Math.round(v), set: v => Math.round(v), default: 0 },
  'actual level': { type: Number, min: 0, max: 4, get: v => Math.round(v), set: v => Math.round(v), default: 0 }
});

const SkillGroupSchema = new Schema({
  group: { type: String, required: true },
  skills: [AssessedSkillSchema]
});

const AssessmentSchema = new Schema({
  'assessment timestamp': { type: Date, required: true, default: Date.now },
  role: { type: String, required: [true, 'A role is required'] },
  skills: [SkillGroupSchema]
});

const EmployeeSchema = new Schema(
  {
    name: { type: String, required: [true, 'An employee name is required'] },
    email: { type: mongoose.SchemaTypes.Email, required: [true, 'An email address is required'], unique: true },
    'job title': { type: String, required: [true, 'A job title is required'] },
    assessments: [AssessmentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', EmployeeSchema, 'employees');
