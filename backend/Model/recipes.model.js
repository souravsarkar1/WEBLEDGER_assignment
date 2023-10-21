

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    chefeId: {
        type: String,
        required: true,
    },
    chefeName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    imageType: {
        type: String,
        required: true,
    },
    nutrition: {
        nutrients: [
            {
                name: {
                    type: String,
                    required: true,
                },
                amount: {
                    type: Number,
                    required: true,
                },
                unit: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
}, {
    versionKey: false,
    timestamps: true,
});

const RecipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = { RecipeModel };


// // Importing required modules
// const mongoose = require('mongoose');

// // Defining the recipe schema
// const recipeSchema = mongoose.Schema({
//     img1: String,
//     img2: String,
//     recipiName: String,
//     recipiDescription: String,
//     chefeName : String,
//     chefeId : String,
// }, {
//
//
// });


// const RecipeModel = mongoose.model('Recipe', recipeSchema);

// // Exporting the Recipe model
// module.exports = {RecipeModel};
