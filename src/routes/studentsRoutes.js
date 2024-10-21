import { Router } from "express";
import * as studentsControllers from "../controllers/studentsControllers.js";
import asyncFunction from "express-async-handler";
const studentsRouter = Router();

studentsRouter.get(
  "/getAllStudents",
  asyncFunction(studentsControllers.getAllStudents)
);
studentsRouter.get(
  "/getStudentById/:id",
  asyncFunction(studentsControllers.getStudentById)
);
studentsRouter.post(
  "/createStudent",
  asyncFunction(studentsControllers.createStudent)
);
studentsRouter.post(
  "/createBulkStudents",
  asyncFunction(studentsControllers.createBulkStudents)
);
studentsRouter.put(
  "/updateStudent/:id",
  asyncFunction(studentsControllers.updateStudent)
);
studentsRouter.delete("/deleteStudent/:id", studentsControllers.deleteStudent);

export default studentsRouter;
