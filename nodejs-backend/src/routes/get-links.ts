import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {  z } from "zod"
import { dayjs } from "../lib/dayjs"
import { prisma } from "../lib/prisma";

export const getLinks = async (app: FastifyInstance) => {

    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/links', {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            })
        }
    }, async (request) => {
        const { tripId } = request.params
        
        const trip = await prisma.trip.findUnique({
            where: { id: tripId },
            include: {
                Links: true
            }
        })

        if (!trip) {
            throw new Error("Trip not found")
        }

        return { links: trip.Links }
    })
}