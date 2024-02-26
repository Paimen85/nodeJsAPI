import express from "express";
import {
  getStudent,
  createStudent,
  getStudents,
  deleteStudent,
  updateStudent,
} from "../controller/patient.controller";

const studentRoutes = express.Router();

studentRoutes.route("/").get(getStudents).post(createStudent);
studentRoutes
  .route("/:id")
  .get(getStudent)
  .put(updateStudent)
  .delete(deleteStudent);
