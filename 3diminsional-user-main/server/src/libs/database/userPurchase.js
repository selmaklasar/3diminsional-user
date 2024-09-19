const mongoose=require('mongoose')


const purchaseSchema = new mongoose.Schema({
  url: { type: String, required: true,trim: true, validate: {
    validator: function (v) {
      return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v); // Simple URL validation
    },
    message: (props) => `${props.value} is not a valid URL`,
  },
  default: '' },
  contentType : {type: String,trim: true},
 
  name: { type: String, required:true,trim: true },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true ,
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
  });

const UserPurchase = mongoose.model('Userpurchase',purchaseSchema);  

module.exports=UserPurchase