 const asyncHandler = require('express-async-handler');
 // @desc Get Goals
// @route GET /api/goals
// @access Public
// This is the goalController.js file that handles the logic for the goal routes.
const Goal = require('../models/goalModel');
// @desc Get Goals
// @route GET /api/goals
// @access Public
 const getGoals = asyncHandler (async(req, res) => {
    if(!req.body.text) {
        return res.status(400)
        throw new Error('Please add a text field');
    }
    
  console.log(req.body);
  const goals = await Goal.find();
  res.status(200).json({ message: 'Get Goals' });
});
// @desc Set Goals
const setGoals = asyncHandler(async(req, res) => {
  console.log(req.body);
  res.status(201).json({ message: 'Set Goals' });

  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(201).json(goal); 
});
// @desc Update Goal
const updateGoal = asyncHandler(async(req, res) => {        
    console.log(req.body);
  console.log(`Update Goal with ID: ${req.params.id}`);
    // Here you would typically update the goal in the database
  res.status(200).json({ message: `Update Goal with ID: ${req.params.id}` });
});

const deleteGoal = asyncHandler(async(req, res) => {    
    console.log(`Delete Goal with ID: ${req.params.id}`);
  // Here you would typically delete the goal from the database
  // For now, we will just return a success message
  res.status(200).json({ message: `Delete Goal with ID: ${req.params.id}` });
}); 
// This is the goalController.js file that handles the logic for the goal routes.
// It exports functions to get, set, update, and delete goals.
// These functions will be used in the goalRoutes.js file to handle the respective HTTP requests.
module.exports = {
  getGoals,
  setGoals,
    updateGoal,
    deleteGoal
};