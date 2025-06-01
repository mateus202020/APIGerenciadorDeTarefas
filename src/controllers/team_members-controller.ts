import { Request, Response } from "express";
import { prisma } from "@/database/primsa";
import { z } from "zod"

class TeamsMembersController{
    async create(request: Request, response: Response){
       const bodySchema = z.object ({
            user_id: z.string().uuid(),
            teams_id: z.string().uuid()
        })

        
        const { user_id, teams_id} = bodySchema.parse(request.body)

        await prisma.team_members.create({
            data: {
                userId: user_id,
                teamsId: teams_id,
            }
        })

        return response.status(201).json()
    }

    async index(request: Request, response: Response){
        const team_members = await prisma.team_members.findMany({
            include: {
                user_id: { select: {name: true, email: true}},
                team_id: { select: {name: true, description: true}}
            },
        })

        return response.json(team_members)
    }
}

export { TeamsMembersController}