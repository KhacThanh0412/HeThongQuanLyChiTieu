const groupService = require("../services/GroupService");

exports.createGroup = async (req, res) => {
  try {
    const { name, lead, members } = req.body;
    const newGroup = await groupService.createGroup(name, lead, members);
    res
      .status(201)
      .json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addMemberToGroup = async (req, res) => {
  try {
    const { groupId, memberId } = req.body;
    const updatedGroup = await groupService.addMemberToGroup(groupId, memberId);
    res.status(200).json({
      message: "Member added to group successfully",
      group: updatedGroup,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.setLead = async (req, res) => {
  try {
    const { groupId, leadId } = req.body;
    const updatedGroup = await groupService.setLead(groupId, leadId);
    res
      .status(200)
      .json({ message: "Lead set successfully", group: updatedGroup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addGoalToGroup = async (req, res) => {
  try {
    const { groupId, goalId } = req.body;
    const updatedGroup = await groupService.addGoalToGroup(groupId, goalId);
    res.status(200).json({
      message: "Goal added to group successfully",
      group: updatedGroup,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
