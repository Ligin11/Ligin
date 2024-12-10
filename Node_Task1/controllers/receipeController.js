const Recipe = require("../models/receipe")

const createRecipe = async (req,res) => {
    try{
        const recipe = new Recipe(req.body)
        await recipe.save();
        res.status(201).json(recipe)
    }catch (error){
        res.status(400).json({error:error.message})
    }
}

const getAllRecipes = async (req,res) =>{
    try{
        const recipes = await Recipe.find();
        res.json(recipes);
    }catch (error){
        res.status(500).json({error:error.message})
    }
}

const getRecipeById = async (req,res) =>{
    try{
        const recipe = await Recipe.findById(req.params.id);
        if(!recipe) return res.status(404).json({error: 'Recipe not found'})
        res.json(recipe);
    }catch (error){
        res.status(500).json({error:error.message})
    }
}

const updateRecipe = async (req,res) =>{
    try{
        const recipe = await Recipe.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!recipe) return res.status(404).json({error: 'Recipe not found'})
        res.json(recipe);
    }catch (error){
        res.status(500).json({error:error.message})
    }
}

const deleteRecipe = async (req,res) =>{
    try{
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if(!recipe) return res.status(404).json({error: 'Recipe not found'})
        res.json({message:"Recipe Deleted successfully"});
    }catch (error){
        res.status(500).json({error:error.message})
    }
}

module.exports ={
    createRecipe,
    getAllRecipes,
    updateRecipe,
    getRecipeById,
    deleteRecipe
}