import { Router } from "express";
import * as MarksController from "../controllers/marksControllers.js";

const marksRouter = Router();

marksRouter.post("/createMark", MarksController.createMark);

marksRouter.post("/createBulkMarks", MarksController.createBulkMarks);

marksRouter.get(
  "/getMarksByStudentId/:id",
  MarksController.getMarksByStudentId
);

marksRouter.get("/getAllMarks", MarksController.getAllMarks);

marksRouter.put(
  "/updateMarkByStudentId/:studentId",
  MarksController.updateMarkByStudentId
);

marksRouter.delete(
  "/deleteMarkByStudentId/:studentId",
  MarksController.deleteMarkByStudentId
);

export default marksRouter;
