const express = require("express");
const students = require("./mongodb")
require("./mongodb")
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

/*Home Page route*/

app.get("/", (req, res) => {
    res.send("Home page");
})

/*POST API*/

app.post("/postdata", async (req, res) => {
    try {
        const user = new students(req.body)
        const postdata = await user.save();
        res.status(200).send(postdata)
        console.log(req.method,", data posted");
    } catch (posterror) {
        res.status(400).send(posterror);
        console.log("data can not posted");
    }
})

/*GET API*/

app.get("/getdata", async (req, res) => {
    try {
        const getdata = await students.find();
        res.status(200).send(getdata);
        console.log(req.method , ", data geted");
    } catch (geterror) {
        res.status(400);
        console.log("data can not get");
    }
})

app.listen(port, () => {
    console.log(`connection is set up at ${port}`);
})