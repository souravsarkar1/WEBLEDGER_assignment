const express = require('express');
const { auth } = require('../Middleware/auth.middleware');
const { RecipeModel } = require('../Model/recipes.model');

const recipeRouter = express.Router();

recipeRouter.post('/addrecipe', auth, async (req, res) => {
    try {
        const newRecipi = new RecipeModel(req.body)
        await newRecipi.save();
        res.status(200).json({ msg: "new recipe is added successfully", newRecipi })
    } catch (error) {
        // console.log(error);
        return res.status(400).json({ error: error })
    }
})

recipeRouter.get('/allrecipe', async (req, res) => {
    try {
        const recipe = await RecipeModel.find();
        return res.status(200).json({ recipe });
    } catch (error) {
        // console.log(error);
        return res.status(400).json({ error: error })
    }
})

recipeRouter.get("/myrecipe", auth, async (req, res) => {

    try {
        const { chefeId } = req.body;
        const data = await RecipeModel.find({ chefeId });
        res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// recipeRouter.get("/myrecipe/sort/:order", auth, async (req, res) => {
//     try {

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// })

recipeRouter.delete("/myrecipe/delete/:dataId", auth, async (req, res) => {
    const { dataId } = req.params;
    try {
        const isExistRecipe = await RecipeModel.findOne({ _id: dataId });
        if (isExistRecipe) {
            await RecipeModel.findByIdAndDelete(dataId);
            res.status(200).json({ msg: 'The data has been deleted' });
        } else {
            res.status(400).json({ msg: "Invalid id" })
        }

    } catch (err) {
        console.log(err);
        res.status(400).json({ err: err.message });
    }
})
module.exports = { recipeRouter };
