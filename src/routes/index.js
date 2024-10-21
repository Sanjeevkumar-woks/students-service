import { Router } from "express";
import studentsRouter from "./studentsRoutes.js";
import marksRouter from "./marksRoutes.js";

const apis = Router();

apis.use("/students", studentsRouter);
apis.use("/marks", marksRouter);

export default apis;
