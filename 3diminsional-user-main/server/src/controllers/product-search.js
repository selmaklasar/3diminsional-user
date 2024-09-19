const searchServices=require('../services/product-search')
const createHttpError = require('http-errors');
const productSearch=async(req,res,next)=>{
try{
const search=req.query.name
console.log("search",search)

const result=await searchServices.serachUser(search)

if (!result)
    throw createHttpError.Unauthorized('search not found');

res.formatResponse(result);
}
catch(error){
next(error)
}
}
module.exports={

    productSearch
}