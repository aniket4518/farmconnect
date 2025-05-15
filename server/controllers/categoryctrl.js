const category =require('../models/categorymodel');
const categoryctrl ={
 getCategory: async(req,res)=>{
     try{
         const categories = await category.find();
         res.json(categories);
     }catch(err){
         return res.status(500).json({msg:err.message});
     }
 },
 createCategory: async(req,res)=>{
     try{
         const {name} = req.body;
         let image = "";
         const result = await uploadImageFromImagesFolder(req.file.filename);
         image = result.imageUrl;
         const newCategory = new category({name, img: image});
         await newCategory.save();
         res.json({msg:"Category created"});
     }catch(err){
         return res.status(500).json({msg:err.message});
     }
 },
 deleteCategory: async(req,res)=>{
     try{
         await category.findByIdAndDelete(req.params.id);
         res.json({msg:"Category deleted"});
     }catch(err){
         return res.status(500).json({msg:err.message});
     }
 },
    updateCategory: async(req,res)=>{
        try{
            const {name} = req.body;
            await category.findOneAndUpdate({_id:req.params.id},{name});
            res.json({msg:"Category updated"});
        }catch(err){
            return res.status(500).json({msg:err.message});
        }
},
}
module.exports =categoryctrl;