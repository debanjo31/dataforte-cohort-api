import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/studentDashboard")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
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
    _id: false,
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  cretaedAt: {
    type: Date,
    default: Date.now,
  },
});

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tutor: {
    type: String,
    required: true,
  },
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

const Student = mongoose.model("Student", studentSchema);
const Course = mongoose.model("Course", courseSchema);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/students", async (req, res) => {
  try {
    const { name, email, gender } = req.body;
    if (!name || !email || !gender) {
      return res.status(400).json({
        message: "Name, Email and gender are required",
      });
    }
    const student = new Student(req.body);
    await student.save();
    return res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

//Enroll student into a course
app.post("/students/:studentId/enroll/:courseId", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
    student.course = course;
    await student.save();
    return res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find().populate("course");
    return res.json({
      noOfStudents: students.length,
      students: students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
    return res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

app.patch("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.json(student);

    // const student = await Student.findById(req.params.id);
    // if (!student) {
    //   return res.status(404).json({
    //     message: "Student not found",
    //   });
    // }

    // student.address = {
    //   street: req.body.street,
    //   city: req.body.city,
    //   state: req.body.state,
    // };

    // await student.save()
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
    return res.json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/courses", async (req, res) => {
  try {
    const { name, tutor, category } = req.body;
    if (!name || !tutor || !category) {
      return res.status(400).json({
        message: "Name, Tutor and Category are required",
      });
    }
    const course = new Course(req.body);
    await course.save();
    return res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
