import { Router } from "express"

import { usersRoutes } from "./user-routes"
import { sessionsRoutes } from "./sessions-routes"
import { teamsRoutes } from "./teams-routes"
import { teamsMemberRoutes } from "./team_members-routes"
import { tasksRoutes } from "./tasks-routes"

const routes = Router()
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/teams", teamsRoutes)
routes.use("/team_member", teamsMemberRoutes)
routes.use("/tasks", tasksRoutes)

export {routes}