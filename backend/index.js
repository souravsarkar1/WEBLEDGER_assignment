const express = require('express');
const { connection } = require('./db');
var cors = require('cors');
const { userRouter } = require('./Route/user.route');
const { recipeRouter } = require('./Route/recipe.routes');


require('dotenv').config();
const app = express();


app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use("/recipe", recipeRouter);

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log('Connected to db');
        console.log('server running at port no 4500');
    } catch (error) {
        console.log(`Something went to Wrong`);
        console.log(error);
    }
})