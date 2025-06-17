import request  from "supertest"


import { prisma } from "@/database/primsa"


import { app } from "@/app"

describe("UsersController", () => {
    let user_id: string

    
    afterAll(async () => {
        if (user_id) {
          await prisma.user.delete({ where: { id: user_id } })
        }
      })
      

    it("deve autenticar e obter um token de acesso", async () => {
        const userResponse = await request(app).post("/users").send({
            name: "Auth Test User",
            email: "auth_test_euser@example.com",
            password: "password123",
        })

        user_id = userResponse.body.id

        const sessionResponse = await request(app).post("/sessions").send({
            email: "auth_test_euser@example.com",
            password: "password123",
        })

        expect(sessionResponse.status).toBe(200)
        expect(sessionResponse.body.token).toEqual(expect.any(String))
    })
})