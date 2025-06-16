import { Request, Response } from "express";
import { prisma } from "@/database/primsa";
import { z } from "zod"



class TasksController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            title: z.string(),
            description: z.string(),
            assigned_to: z.string().uuid(),
            team_id: z.string().uuid()
        })

        const { title, description, assigned_to, team_id } = bodySchema.parse(request.body)
        
        await prisma.tasks.create({
            data: {
                title,
                description,
                userId: assigned_to,
                teamsId: team_id,

            }
        })

        return response.status(201).json()
    }

    async index(request: Request, response: Response){
        const tasks = await prisma.tasks.findMany({
            include: {
                assigned_to: { select: {name: true, email: true, role: true}},
                team_id: { select: {name: true, description: true}}
            },
        })

        return response.json(tasks)
    }

    async update( request: Request, response: Response){
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const bodySchema = z.object({
            status: z.enum(['peding', 'in_progress', 'completed']),
            priority: z.enum(['hight', 'medium', 'low']),
        })

        const { id } = paramsSchema.parse(request.params)
        const { status, priority} = bodySchema.parse(request.body)

        await prisma.tasks.update({
            data: {
                status,
                priority,
            },

            where:{
                id,
            }
        })

        return response.json()
    }

    async remove( request: Request, response: Response){
        const {id} = request.params

        await prisma.tasks.delete({ where: {id}})

        return response.json()
    }
}

export { TasksController }