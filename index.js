const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/',{
    dbName: 'onitoTech',
    useNewUrlParser: true,
    useUnifiedTopology: true
},err => err ? console.log(err) : console.log('Connected to onitoTech database'));

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: Date,
        require: true
    },
    sex:{
        type: String,
        require: true
    },
    mobile:{
        type: Number
    },
    id: {
        type: String
    },
    idValue: {
        type: String
    },
    guardian: {
        type: String
    },
    guardianName: {
        type: String
    },
    email: {
        type: String
    },
    contact: {
        type: Number
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    pincode: {
        type: Number
    },
    occupation: {
        type: String
    },
    religion: {
        type: String
    },
    marital: {
        type: String
    },
    bloodGroup: {
        type: String
    },
    nationality: {
        type: String
    }
});
const User = mongoose.model('users',UserSchema);
User.createIndexes();

const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listening");
app.use(express.json());
app.use(cors());
app.get("/",(req,resp) => {
    resp.send("App is working");
});

app.post("/register",async(req,resp) => {
    try{
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if(result){
            delete result.password;
            resp.send(req.body);
            console.log(result);
        }
        else{
            console.log("User already registered.");
        }
    }
    catch(e){
        resp.send("Something went wrong.");
    }
});
app.listen(5000);