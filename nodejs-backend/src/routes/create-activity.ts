import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {  z } from "zod"
import { dayjs } from "../lib/dayjs"
import { prisma } from "../lib/prisma";
import { ClientError } from "../erros/client-error";

export const createActivity = async (app: FastifyInstance) => {

    app.withTypeProvider<ZodTypeProvider>().post('/trips/:tripId/activities', {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            }),
            body: z.object({
                title: z.string().min(4),
                occurs_at: z.coerce.date(),
            })
        }
    }, async (request) => {
        const { title, occurs_at } = request.body 
        const { tripId } = request.params
        
        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            }
        })

        if (!trip) {
            throw new ClientError("Trip not found")
        }

        if (dayjs(occurs_at).isBefore(trip.starts_at)) {
            throw new ClientError('Invalid activity date.')
        }
        
        if (dayjs(occurs_at).isBefore(trip.ends_at)) {
            throw new ClientError('Invalid activity date.')
        }

        const activity = await prisma.activity.create({
            data: {
                title,
                occurs_at,
                trip_id: tripId
            }
        })

        return { activityId: activity.id }
    })

}