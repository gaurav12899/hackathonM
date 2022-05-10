import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    question: String,
})

export default mongoose.model('questions',questionSchema)