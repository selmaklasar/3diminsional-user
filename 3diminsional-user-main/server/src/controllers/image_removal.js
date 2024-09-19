const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');
const background_image_removal=async(req,res)=>{

    try {
       
        const imgSource = req.file.path;

   
        const blob = await removeBackground(imgSource);


        const buffer = Buffer.from(await blob.arrayBuffer());

    
        const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;
        
        console.log('Image processed, sending response...');

        fs.unlinkSync(imgSource);


        res.json({ image: dataURL });
    } catch (error) {
      
        console.error('Error removing background:', error);
        res.status(500).json({ error: 'Failed to process image' });
    }


}

module.exports={

    background_image_removal
}