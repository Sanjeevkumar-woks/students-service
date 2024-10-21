import mongoose from "mongoose";

const markSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    subjects: [
      {
        subject: {
          type: String,
          required: true,
        },
        marks: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Mark = mongoose.model("Mark", markSchema);

export default Mark;
