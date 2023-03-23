const mongoose = require('mongoose');

require('dotenv').config()

mongoose.set('strictQuery', true);


const connectDB=()=>{


mongoose.connect(process.env.DB)
.then(()=>{
    console.log("Connected to propvr-assignment-backend Database")
})
.catch((error)=>{
    console.log("Error connecting to propvr-assignment-backend Database",error.message)
})
}
module.exports=connectDB;