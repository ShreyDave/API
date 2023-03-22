const express = require("express");
const students = require("./mongodb")
require("./mongodb")
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/" , (req,res) => {
    res.send("Home page");
})

app.post("/postdata" , (req,res) => {
    const users = new students(req.body);
    users.save().then(() => {
        res.status(201).send(users);
    }).catch((mongoerror) => {
        res.status(400).send(mongoerror);
        console.log(mongoerror , "data not stored");
    })
    console.log(req.body);
})

app.listen(port , () => {
    console.log(`connection is set up at ${port}`);
})