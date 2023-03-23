const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/user.routes')
const movieRoutes = require("./routes/movie.routes");


const app = express();

app.use(express.json());
app.use(cors())
// user main routes
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);



app.get('/', async(req,res)=>{
    res.status(200).send("Welcome to PropVr movie app");
});

connectDB();
app.listen(8080, () => {
    console.log("listening on port 8080");
})