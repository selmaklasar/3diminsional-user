const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model3dSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
      unique: true,
    },
   
    description: {
      type: String,
      trim: true,
      default: '',
    },
    imageUrl: {
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
        enum: ['gltf','model/gltf+json','model/gltf-binary'], 
      },
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
model3dSchema.index({ name: 'text', description: 'text' });
module.exports = mongoose.model('3dModel', model3dSchema);
