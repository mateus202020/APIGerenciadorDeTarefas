import { Router } from "express";

import { TasksController } from "@/controllers/tasks-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const tasksRoutes = Router()
const tasksController = new TasksController()

tasksRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["admin"]), tasksController.create)
tasksRoutes.get("/", ensureAuthenticated, verifyUserAuthorization(["admin", "member"]), tasksController.index)

tasksRoutes.patch("/:id/status/priority", ensureAuthenticated, verifyUserAuthorization(["admin", "member"]), tasksController.update)
tasksRoutes.delete("/:id", ensureAuthenticated, verifyUserAuthorization(["admin"]), tasksController.remove)

export { tasksRoutes}