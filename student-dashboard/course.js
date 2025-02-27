const courseSchema = new mongoose.Schema({
    name: String,
    duration: Number,
    students: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        },
    ],
    });

const Course = mongoose.model("Course", courseSchema);