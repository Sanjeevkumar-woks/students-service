import Mark from "../models/marksModel.js";
import Student from "../models/studentsModel.js";

export default class StudentsService {
  static async getAllStudents(payload) {
    const { page, limit } = payload;

    const students = await Student.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalStudents = await Student.countDocuments();

    return { students, totalStudents };
  }

  static async getStudentById(id) {
    const student = await Student.findById(id);

    const marks = await Mark.find({ studentId: id });

    return { student, marks };
  }

  static async createStudent(payload) {
    const student = await Student.create(payload);

    return student;
  }

  static async createBulkStudents(payload) {
    const students = await Student.insertMany(payload);

    return students;
  }

  static async updateStudent(id, payload) {
    const student = await Student.findByIdAndUpdate(id, payload, { new: true });
    return student;
  }

  static async deleteStudent(id) {
    const student = await Student.findByIdAndDelete({ _id: id });

    return student;
  }
}
