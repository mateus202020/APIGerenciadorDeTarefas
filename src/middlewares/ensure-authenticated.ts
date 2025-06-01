import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";

interface TokenPlayLoad{
    role: string
    sub: string
}

function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
){
    try{
        const authHeader = request.headers.authorization

        if(!authHeader){
            throw new AppError("Token JWT não encontrado", 401)
        }

        const [, token ] = authHeader.split(" ")

        const {role, sub: user_id} = verify(token, authConfig.jwt.secret) as TokenPlayLoad

        request.user = {
            id: user_id,
            role,
        }


        return next()
    }catch(error){
        throw new AppError("Token JWT não encontrado", 401)
    }
}

export { ensureAuthenticated }