const profileService = require("../services/ProfileService");

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy id của người dùng từ token
    const userProfile = await profileService.getUserProfile(userId);
    res.status(200).json({ userProfile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy id của người dùng từ token
    const profileData = req.body;
    const updatedProfile = await profileService.updateUserProfile(
      userId,
      profileData
    );
    res.status(200).json({
      message: "User profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
