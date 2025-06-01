import { Request, Response } from "express";
import { prisma } from "@/database/primsa";
import { z } from "zod"

class TeamsController{
    async create(request: Request, response: Response){
       const bodySchema = z.object({
            name: z.string(),
            description: z.string(),
       })

       const { name, description } = bodySchema.parse(request.body)

      await prisma.team.create({
        data: {
            name,
            description
        }

        
      })

      return response.status(201).json({})
    }
}

export { TeamsController}