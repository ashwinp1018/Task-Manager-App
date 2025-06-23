import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" }
});

export default mongoose.model("Task", taskSchema);
