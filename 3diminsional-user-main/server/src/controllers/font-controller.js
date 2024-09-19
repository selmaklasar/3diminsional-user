const fontService=require('../services/font-service')

module.exports={

async getFont(req,res,next){
try{
    const fontName=req.query.name
    console.log("name",fontName)
const font=await fontService.getfont(fontName)
console.log("font",font)
res.formatResponse(font)
}
catch(error){
next(error);
}
},


}