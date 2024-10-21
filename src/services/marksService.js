import { Mongoose } from "mongoose";
import Mark from "../models/marksModel.js";

export default class MarksService {
  // create Mark
  static async createMark(payload) {
    const isMarksExists = await Mark.find({ studentId: payload.studentId });

    if (isMarksExists) {
      return { message: "Marks already exists please try to Update " };
    }

    const mark = await Mark.create(payload);

    return mark;
  }

  // create Bulk Marks
  static async createBulkMarks(payload) {
    const marks = await Mark.insertMany(payload);

    return marks;
  }

  // get Marks by Student Id
  static async getMarksByStudentId(id) {
    const marks = await Mark.find({ studentId: id });
    if (!marks) {
      return { message: "No marks found" };
    }

    return marks;
  }

  // get All Marks
  static async getAllMarks() {
    // aggregate the marks by studentId
    const data = await Mark.aggregate([
      {
        $group: {
          _id: "$studentId",
          marks: { $push: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "_id",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $unwind: "$student",
      },
      {
        $project: {
          _id: 1,
          student: 1,
          marks: 1,
        },
      },
    ]);

    return data;
  }

  // update Mark by Student Id
  static async updateMarkByStudentId(id, payload) {
    const isMarkExists = await Mark.find({ studentId: id });

    if (!isMarkExists) {
      return { message: "Mark not found" };
    }

    const mark = await Mark.findOneAndUpdate({ studentId: id }, payload, {
      new: true,
    });

    if (!mark) {
      return { message: "Mark not found" };
    }

    return mark;
  }

  // delete Mark by Student Id
  static async deleteMarkByStudentId(studentId) {
    const mark = await Mark.deleteOne({ studentId });

    if (!mark) {
      return { message: "Mark not found" };
    }

    return mark;
  }
}
