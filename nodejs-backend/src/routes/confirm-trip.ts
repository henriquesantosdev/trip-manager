import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import "dayjs/locale/pt-br"
import { date, z } from "zod"

export const confirmTrip = async (app: FastifyInstance) => {

    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/confirm', {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            })
        }
    }, async (request) => {

        return { tripId: request.params.tripId }
    })

}