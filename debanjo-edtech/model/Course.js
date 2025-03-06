import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  instructor: [
    {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
    },
  ],
  student: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  category: {
    type: String,
    required: true,
    enum: ["Software", "Product", "Data"],
  },
  cretaedAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
