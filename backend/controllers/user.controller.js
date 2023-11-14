const User = require("../models/User.model");
const Interview = require("../models/Interview.model");
const Feedback = require("../models/Feedback.model");

exports.getUserInterviews = async (req, res, next) => {
  const userId = req.userId;

  try {
    // Find the user's past interviews using the userId
    const user = await User.findById(userId).populate({
      path: "pastInterviews", // Populate the user's pastInterviews (array of Interview IDs)
      populate: {
        path: "feedback", // Populate the feedback for each interview
        model: "Feedback", // Model to use for populating feedback
      },
    });

    // Access the populated interviews with feedback
    const userInterviews = user.pastInterviews;
    // console.log(userInterviews);
    res.status(200).json({ userInterviews });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: "Could not retrieve user interviews" });
  }
};
