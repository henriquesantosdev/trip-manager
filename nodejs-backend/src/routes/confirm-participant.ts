import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { prisma } from "../lib/prisma";
import { ClientError } from "../erros/client-error";
import { env } from "../env";

export const confirmParticipants = async (app: FastifyInstance) => {

    app.withTypeProvider<ZodTypeProvider>().get('/participants/:participantId/confirm', {
        schema: {
            params: z.object({
                participantId: z.string().uuid()
            })
        }
    }, async (request, reply) => {

        const { participantId } = request.params

        const participant = await prisma.participants.findUnique({
            where: {
              id: participantId,
            }
          })

        if (!participant) {
            throw new ClientError('Participant nor found')
        }

        if (participant.is_confirmed) {
            return reply.redirect(`${ env.WEB_BASE_URL }/trips/${participant.trip_id}`)
        }

        await prisma.participants.update({
            where: { id: participantId },
            data: { is_confirmed: true }
          })
        
        return reply.redirect(`${ env.WEB_BASE_URL }/trips/${participant.trip_id}`)
    })

}