const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://localhost:27017/students-api")
    .then(() => { console.log("mongodb connection is successful"); })
    .catch((err) => { console.log(err, "mongodb is not connected"); })

const studentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
},{ versionKey: false })

const studentsData = new mongoose.model("studentData", studentsSchema);
module.exports = studentsData;