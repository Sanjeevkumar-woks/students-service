import Student from "../models/studentsModel.js";
import Joi from "joi";
import { validateJoiSchema } from "../utils/validateSchema.js";
import StudentsService from "../services/studentsService.js";

//get all students with page and limit and total students in db
const getAllStudents = async (req, res) => {
  const { page, limit } = req.query;

  const validationError = validateJoiSchema({
    schema: Joi.object({
      page: Joi.number().required(),
      limit: Joi.number().optional(),
    }),
    data: req.query,
  });

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }
  const data = await StudentsService.getAllStudents({ page, limit });

  res.status(200).json(data);
};

//get student by id
const getStudentById = async (req, res) => {
  const { id } = req.params;

  const validationError = validateJoiSchema({
    schema: Joi.object({
      id: Joi.string().required(),
    }),
    data: req.params,
  });

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const student = await StudentsService.getStudentById(id);

  res.status(200).json(student);
};

//create student
const createStudent = async (req, res) => {
  const validationError = validateJoiSchema({
    schema: Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
      gender: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
    }),
    data: req.body,
  });

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const student = await StudentsService.createStudent(req.body);

  res.status(201).json(student);
};

//Create Bulk Students
const createBulkStudents = async (req, res) => {
  const validationError = validateJoiSchema({
    schema: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        gender: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
      })
    ),
    data: req.body,
  });

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const students = await StudentsService.createBulkStudents(req.body);

  res.status(201).json(students);
};

//update student
const updateStudent = async (req, res) => {
  const { id } = req.params;

  const validationError = validateJoiSchema({
    schema: Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
      gender: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
    }),
    data: req.body,
  });

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const student = await StudentsService.updateStudent(id, req.body);

  res.status(200).json(student);
};

//delete student
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  const validationError = validateJoiSchema({
    schema: Joi.object({
      id: Joi.string().required(),
    }),
    data: req.params,
  });

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const student = await StudentsService.deleteStudent(id);

  res.status(200).json(student);
};

export {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  createBulkStudents,
};
