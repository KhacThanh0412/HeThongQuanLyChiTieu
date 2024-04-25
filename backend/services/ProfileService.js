const Profile = require("../models/ProfileModel");

exports.getUserProfile = async (userId) => {
  return await Profile.findOne({ userId });
};

exports.updateUserProfile = async (userId, profileData) => {
  return await Profile.findOneAndUpdate(
    { userId },
    { ...profileData },
    { new: true }
  );
};
