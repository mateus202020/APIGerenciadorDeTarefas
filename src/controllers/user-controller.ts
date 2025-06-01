import { Request, Response } from "express"
import { hash } from "bcrypt"
import { z } from "zod"
import { prisma } from "@/database/primsa"
import { AppError } from "@/utils/AppError"

class UserController{
    async create(request:Request, response:Response){
        const bodySchema = z.object({
            name: z.string().trim().min(2),
            email: z.string().email(),
            password: z.string().min(6),
        })


        const { name, email, password } = bodySchema.parse(request.body)

        const userWhithSamemail = await prisma.user.findFirst({ where: {email}})


        if(userWhithSamemail){
            throw new AppError("Usuário com o mesmo e-mail já existe")
        }

        const hashePassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashePassword,
            },
        })

        const {password: _, ...userWhithPassword} = user

        return response.status(201).json( userWhithPassword )
    }

}

export { UserController }