const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobPostSkillSchema = new Schema({
    jobPostId: { type: Schema.Types.ObjectId, ref: "JobPost", required: true },
    skillId: { type: Schema.Types.ObjectId, ref: "Skill", required: true },
    isDeleted: {
      type: Boolean,
      default: false
    },
}, { _id: false }); 

const JobPostSkill = mongoose.model("JobPostSkill", jobPostSkillSchema);

module.exports = JobPostSkill;