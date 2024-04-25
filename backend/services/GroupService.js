const Group = require("../models/GroupModel");

exports.createGroup = async (name, lead, members) => {
  const newGroup = new Group({ name, lead, members });
  return await newGroup.save();
};

exports.addMemberToGroup = async (groupId, memberId) => {
  const group = await Group.findById(groupId);
  group.members.push(memberId);
  return await group.save();
};

exports.setLead = async (groupId, leadId) => {
  const group = await Group.findById(groupId);
  group.lead = leadId;
  return await group.save();
};

exports.addGoalToGroup = async (groupId, goalId) => {
  const group = await Group.findById(groupId);
  group.goals.push(goalId);
  return await group.save();
};
