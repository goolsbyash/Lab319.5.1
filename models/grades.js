import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    scores: {
        type: Array,
        required: true,
    },
    class_id: {
        type: Number,
        unique: false,
    },
    learner_id: {
        type: Number,
        required: true,
    }
})

// Export schema
export default mongoose.model("Grade", gradeSchema);