const fontmodal=require('../models/font')

module.exports = {
  async getfont(font) {
   
    const result = await  fontmodal.find({name: font })
console.log("result",result)
    return result;
  }, catch (error) {
    console.error('Autocomplete error:', error);
    throw error;
  }

};

