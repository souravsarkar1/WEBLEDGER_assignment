// Importing required modules
const mongoose = require('mongoose');

// Defining the recipe schema
const recipeSchema = mongoose.Schema({
    img1: String,
    img2: String,
    recipiName: String,
    recipiDescription: String,
    chefeName : String,
    chefeId : String,
}, {
    versionKey: false,
    timestamps: true,
});


const RecipeModel = mongoose.model('Recipe', recipeSchema);

// Exporting the Recipe model
module.exports = {RecipeModel};
