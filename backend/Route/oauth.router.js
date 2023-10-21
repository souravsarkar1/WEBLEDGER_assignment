const express = require('express');
const oAuthRouter = express();
oAuthRouter.get("/", (req, res) => {
    res.send("base endpoint");
})
oAuthRouter.get("/login", (req, res) => {
    res.send('<a  href="https://foodapp-souravsarkar1.vercel.app/login">Click here to log in with github</a>');
})

oAuthRouter.get("/auth/github", async (req, res) => {
    const { code } = req.query;
    const access_token = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client_id: clint_id,
            client_secret: client_secret,
            code
        })
    }).then((res) => {
        return res.json();
    })
    // console.log(access_token);
    const useremail = await fetch("https://api.github.com/user/emails", {
        headers: {
            Authorization: "Bearer " + access_token.access_token
        }
    }).then(res => res.json()).catch(err => console.log(err));
    const user = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: "Bearer " + access_token.access_token
        }
    }).then(res => res.json()).catch(err => console.log(err));
    console.log(user);
    console.log(useremail);
    //res.send("signin with github successfully");
    res.send('<a href="https://foodapp-souravsarkar1.vercel.app/">Click here to log in</a>');
})


module.exports = { oAuthRouter }