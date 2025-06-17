import request  from "supertest"
import { prisma } from "@/database/primsa"
import { app } from "@/app"

describe("UsersController", () => {
     let user_id: string


     afterAll( async () => {
          await prisma.user.delete({ where: { id: user_id }})
     })


    it("deve criar um novo usuário com sucesso", async () => {
        const response = await request(app).post("/users").send({
             name: "Test User",
             email: "testeuser@example.com",
             password: "password123",
        })
 
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body.name).toBe("Test User")


	     user_id = response.body.id


     })

     it("deve gerar um erro se o usuário com o mesmo e-mail já existir", async () => {
          const response = await request(app).post("/users").send({
               name: "Duplicate User",
               email: "testeuser@example.com",
               password: "password123",
          })


          expect(response.status).toBe(400)
          expect(response.body.message).toBe("Usuário com o mesmo e-mail já existe")
     })


     it("deve gerar um erro de validação se o e-mail for inválido", async () => {
          const response = await request(app).post("/users").send({
               name: "Test User",
               email: "invalid-email",
               password: "password123",
          })


          expect(response.status).toBe(400)
          expect(response.body.message).toBe("validation error")
     })

})

