const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    userType: {
      type: String,
      enum: ['Admin', 'Customer'],
      required: true,
      default: 'Customer',
    },
    registrationType: {
      type: String,
      enum: ['Google', 'Traditional'],
      required: true,
      default: 'Traditional',
    },
    password: {
      type: String,
      validate: {
        validator(value) {
          if (this.registrationType === 'Traditional') {
            return value && value.trim().length > 0;
          }
          return true; 
        },
        message: 'Password cannot be an empty string.',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('User', userSchema);
