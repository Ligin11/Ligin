const mongoose =require('mongoose')

const recipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    cuisine:{
        type:String,
    },
});

const Recipe = mongoose.model("Recipe", recipeSchema)

module.exports = Recipe;
