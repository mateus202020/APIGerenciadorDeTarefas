import { Router } from "express"

import { TeamsMembersController} from "@/controllers/team_members-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const teamsMemberRoutes = Router()

const teamsMembersController = new TeamsMembersController()

teamsMemberRoutes.use(ensureAuthenticated, verifyUserAuthorization(["admin"]) )
teamsMemberRoutes.post("/", teamsMembersController.create)
teamsMemberRoutes.get("/", teamsMembersController.index)

export {teamsMemberRoutes}