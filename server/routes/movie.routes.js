const express = require('express');
const auth = require('../middleware/auth');
const routes = express.Router();
const movieModel = require("../models/movies.model");


routes.post("/create", async (req, res) => {
    try {        
        const movie = await movieModel.create({ ...req.body });
        return res.status(201).json(movie);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

routes.get("/", async (req, res) => {
  try {        
      const movie = await movieModel.find();
      return res.status(201).json(movie);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
})

routes.put("/rating", auth, async (req, res) => {
    try {
        console.log(req.body);
        const {rating, id} = req.body;
        const userId = req.userId;
        const movie = await movieModel.findOne({_id: id});
        
        // Check if the user has already rated the movie
        const existingRatingIndex = movie.ratings.findIndex((ratingObj) => ratingObj.userId.equals(userId));
        if (existingRatingIndex !== -1) {
          return res.status(400).json({ message: "You have already rated this movie." });
        }
      
        // Add the new rating to the ratings array
        movie.ratings.push({ userId, rating });
      
        // Calculate the new average rating and total ratings
        const newTotalRatings = movie.totalRatings + 1;
        const newAverageRating = ((movie.averageRating * movie.totalRatings) + rating) / newTotalRatings;
      
        // Update the movie document in the database
        await movieModel.updateOne({_id: id}, {
          $set: {
            ratings: movie.ratings,
            averageRating:newAverageRating,
            totalRatings:newTotalRatings
          }
        });
      
        // Fetch the updated movie document
        const updatedMovie = await movieModel.findOne({_id: id});
      
        // Format the average rating to one decimal point
        updatedMovie.averageRating = updatedMovie.averageRating.toFixed(1);
      
        return res.status(201).json(updatedMovie);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
})

routes.delete("/removeRating", async (req, res) => {
  console.log(req.body)
    try {
        const { id,userId } = req.body;
        const movie = await movieModel.findOne({ _id: id });

        const existingRatingIndex = movie.ratings.findIndex(
            (ratingObj) => ratingObj.userId.equals(userId)
          );

        if (existingRatingIndex === -1) {
        return res
            .status(400)
            .json({ message: "You have not rated this movie." });
        }

        
        const newTotalRatings = movie.totalRatings - 1;
        const newAverageRating =((movie.averageRating * movie.totalRatings) -movie.ratings[existingRatingIndex].rating) /newTotalRatings;

        
        // Remove the user's rating from the ratings array
        movie.ratings.splice(existingRatingIndex, 1);
        await movieModel.updateOne({_id: id}, {
            $set: {
              ratings: movie.ratings,
              averageRating:newAverageRating,
              totalRatings:newTotalRatings
            }
          });

        // Fetch the updated movie document
        const updatedMovie = await movieModel.findOne({_id: id});

        // Format the average rating to one decimal point
        updatedMovie.averageRating = updatedMovie.averageRating.toFixed(1);

        return res.status(201).json(updatedMovie);
    
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
      









module.exports=routes;