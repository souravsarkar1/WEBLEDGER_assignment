const express = require('express');
const { auth } = require('../Middleware/auth.middleware');
const { RecipeModel } = require('../Model/recipes.model');

const recipeRouter = express.Router();

recipeRouter.post('/addrecipe', auth, async (req, res) => {
    try {
        const { img1, img2, recipiName, recipiDescription, chefeName, chefeId } = req.body;
        if (!img1 || !img2 || !recipiName || !recipiDescription || !chefeName || !chefeId) {
            return res.status(400).json({ msg: "add all the fields" });
        }
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
        const data = await RecipeModel.find(req.body.uerId);
        res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

recipeRouter.get("/allrecipe/sort/:order",async(req,res)=>{
    try {
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = { recipeRouter };
