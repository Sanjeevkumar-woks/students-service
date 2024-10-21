import Mark from "../models/marksModel.js";
import MarksService from "../services/marksService.js";
import { validateJoiSchema } from "../utils/validateSchema.js";
import Joi from "joi";

//getAllMarks
const getAllMarks = async (req, res) => {
  const marks = await MarksService.getAllMarks();

  res.status(200).json(marks);
};

//getMarksByStudentId
const getMarksByStudentId = async (req, res) => {
  const { id } = req.params;

  const marks = await MarksService.getMarksByStudentId(id);

  res.status(200).json(marks);
};

//createMark
const createMark = async (req, res) => {
  //validate the request body
  const validationError = validateJoiSchema({
    schema: Joi.object({
      studentId: Joi.string().required(),
      subjects: Joi.array().items(
        Joi.object({
          subject: Joi.string().required(),
          marks: Joi.number().required(),
        })
      ),
    }),
    data: req.body,
  });

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const mark = await MarksService.createMark(req.body);

  res.status(200).json(mark);
};

//createBulkMarks
const createBulkMarks = async (req, res) => {
  const validationError = validateJoiSchema({
    schema: Joi.array().items(
      Joi.object({
        studentId: Joi.string().required(),
        subjects: Joi.array().items(
          Joi.object({
            subject: Joi.string().required(),
            marks: Joi.number().required(),
          })
        ),
      })
    ),
    data: req.body,
  });

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const mark = await MarksService.createBulkMarks(req.body);

  res.status(200).json(mark);
};

//updateMarkByStudentId
const updateMarkByStudentId = async (req, res) => {
  const { studentId } = req.params;

  const validationError = validateJoiSchema({
    schema: Joi.object({
      studentId: Joi.string().required(),
      subjects: Joi.array().items(
        Joi.object({
          subject: Joi.string().required(),
          marks: Joi.number().required(),
        })
      ),
    }),
    data: {
      studentId,
      ...req.body,
    },
  });

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const mark = await MarksService.updateMarkByStudentId(studentId, req.body);

  res.status(200).json(mark);
};

//deleteMarkByStudentId
const deleteMarkByStudentId = async (req, res) => {
  const { studentId } = req.params;

  const validationError = validateJoiSchema({
    schema: Joi.object({
      studentId: Joi.string().required(),
    }),
    data: req.params,
  });

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const mark = await MarksService.deleteMarkByStudentId(studentId);

  res.status(200).json(mark);
};

export {
  getMarksByStudentId,
  getAllMarks,
  createMark,
  createBulkMarks,
  updateMarkByStudentId,
  deleteMarkByStudentId,
};
