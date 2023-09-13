import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createTaskSchema } from "../schemas/task.schema.js";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  changeTaskStatus,
} from "../controllers/task.controller.js";

const router = Router();

router.get("/tasks", authRequired, getTasks);
router.get("/task/:id", authRequired, getTask);
router.post(
  "/task",
  validateSchema(createTaskSchema),
  authRequired,
  createTask
);
router.delete("/task/:id", authRequired, deleteTask);
router.delete("/deleteall", authRequired, deleteAllTasks);
router.put("/task/:id", authRequired, updateTask);
router.put("/task/status/:id", authRequired, changeTaskStatus);


export default router;
