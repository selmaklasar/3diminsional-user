const model3D=require('../models/3dmodel-search')

module.exports = {
  async serachUser(serachquery) {
   
    const result = await  model3D.find({
        name: { $regex: serachquery, $options: 'i' } 
  }).limit(10);
      return result.map(doc => doc.name);
  }, catch (error) {
    console.error('Autocomplete error:', error);
    throw error;
  }

};

