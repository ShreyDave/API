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

app.post("/postapi", async (req, res) => {
    try {
        const user = new students(req.body)
        const postdata = await user.save();
        res.status(200).send(postdata)
        console.log(req.method,", data posted");
    }catch (posterror) {
        res.status(400).send(posterror);
        console.log("data can not posted");
    }
})

/*GET API*/

app.get("/getapi", async (req, res) => {
    try {
        const getdata = await students.find();
        res.status(200).send(getdata);
        console.log(req.method , ", data geted");
    } catch (geterror) {
        res.status(400);
        console.log("data can not get");
    }
})

/*Patch API*/

app.patch("/postapi/:id" , async(req,res) => {
    try {
        const _id = req.params.id;
        const updatedata = await students.findByIdAndUpdate(_id , req.body ,{
            new : true
        });
        res.status(200).send(updatedata);
        console.log(req.method,", Data Updated");
    } catch (patcherror) {
        res.status(400).send(patcherror);
        console.log("Data can not Updated");
    }
})

/*DELETE API*/

app.delete("/postapi/:id" , async(req,res) => {
    try {
        const deletedata = await students.findByIdAndDelete(req.params.id)
        if (!req.params.id) {
            res.status(400).send()
            console.log("**");
        } else {
            res.status(200).send(deletedata)
            console.log("//");
        }
    } catch (deleteerror) {
        res.status(400).send(deleteerror);
        console.log("00");
    }
})

/*Port Listen*/

app.listen(port, () => {
    console.log(`connection is set up at ${port}`);
})