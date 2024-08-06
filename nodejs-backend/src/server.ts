import fastify from "fastify";
import { prisma } from "./lib/prisma";

const app = fastify()

app.get('/cadastrar', async () => {
    await prisma.trip.create({
        data: {
            destination: 'Paraiba',
            starts_at: new Date(),
            ends_at: new Date()
        }
    })

    return "Registro cadastrado com sucesso!"
})

app.get('/listar', async () => {
    const trips = await prisma.trip.findMany()
    return trips
})

app.listen({port: 3333}).then((address) => {
    console.log(`🚀 Server is running on: \x1b[32m${address}`)
})