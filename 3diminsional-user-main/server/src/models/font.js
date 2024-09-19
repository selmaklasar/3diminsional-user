const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fontSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
      unique: true,
    },
      fontUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v); 
        },
        message: (props) => `${props.value} is not a valid URL`,
      },
      default: '',
    }, contentType: {
        type: String,
        required: true,
        trim: true,
        enum: ['application/json'], 
      },
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('font', fontSchema);
