import { Mongoose } from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String
  },
  age: Number,
  gender: {
    type: String,
    enum : ["Male", "Female"],
    default: "Male"
  }
  city: String,
  registrationNumber: Number,
  email:  {
    type: String,
    lowercase: true // Always convert `test` to lowercase
    unique,
    required
  },
  phoneNumber: String,
  course : {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Course",
  }
});

// updateTime, createdAt, hashPassword



const Student = mongoose.model("Student", studentSchema);
