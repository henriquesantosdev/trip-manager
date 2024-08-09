import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {  z } from "zod"
import { prisma } from "../lib/prisma";

export const getTripDetails = async (app: FastifyInstance) => {

    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/details', {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            })
        }
    }, async (request) => {
        const { tripId } = request.params
        
        const trip = await prisma.trip.findUnique({
            select: {
                id: true,
                destination: true,
                starts_at: true,
                ends_at: true,
                is_confirmed: true
            },
            where: { id: tripId },
        })

        return { trip }
    })
}