require('dotenv').config();

const mongoose = require('mongoose');

main().then(()=>{console.log("connected to database");}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.CONNECTION_STRING);
    // await mongoose.connect('mongodb+srv://fruitkha:fruitkha@fruitkha.hbmfw.mongodb.net/Fruitkha?retryWrites=true&w=majority');
    // await mongoose.connect('mongodb://localhost:27017/Fruitkha');
}