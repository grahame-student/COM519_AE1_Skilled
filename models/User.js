const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    email: { type: String, required: [true, 'email is required'], unique: true },
    password: { type: String, required: [true, 'password is required'] },
    saved_tastings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tasting' }]
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  console.log(this.password);
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (e) {
    throw Error('could not hash password');
  }
});

module.exports = mongoose.model('User', userSchema);
