const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    Title: { type: String, required: true},
    Year: { type: String, required: true},
    Poster: { type: String, required: true},
    ratings: [{ 
        userId: { type: Schema.Types.ObjectId, ref: "User" }, 
        rating: { type: Number, required: true }
      }],
    averageRating: { type: Number,required: true},
    totalRatings: { type: Number, default: 5 }

}, { timestamps: true })



const movieModel = mongoose.model('Movie', movieSchema);
module.exports = movieModel;