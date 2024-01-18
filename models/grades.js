import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    scores: [{
        grade_type: String,
        score: Number,
    }],
    class_id: {
        type: Number,
        required: true,
        unique: false,
    },
    learner_id: {
        type: Number,
        required: true,
    }
})

// Export schema
export default mongoose.model("Grade", gradeSchema);