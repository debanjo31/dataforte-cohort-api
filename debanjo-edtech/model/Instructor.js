import mongoose from "mongoose";
const { Schema } = mongoose;

const instructorSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Instructor = mongoose.model("Instructor", instructorSchema);

export default Instructor;
