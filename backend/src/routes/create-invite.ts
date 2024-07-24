import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { prisma } from '../lib/prisma'
import { dayjs } from '../lib/dayjs'
import { getMailClient } from '../lib/mail'
import { ClientError } from '../errors/client-error'
import { env } from '../env'

export async function createInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips/:tripId/invites',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          email: z.string().email(),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params
      const { email } = request.body

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
      })

      if (!trip) {
        throw new ClientError('Trip not found')
      }

      const participant = await prisma.participant.create({
        data: {
          email,
          trip_id: tripId,
        },
      })

      const formattedStartDate = dayjs(trip.starts_at).format('LL')
      const formattedEndDate = dayjs(trip.ends_at).format('LL')

      const mail = await getMailClient()

      const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`

      const message = await mail.sendMail({
        from: {
          name: 'Team plann.er',
          address: 'team@planner.com',
        },
        to: participant.email,
        subject: `Confirm your participation in the trip to ${trip.destination} on ${formattedStartDate}`,
        html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
          <p>You have been invited to participate in a trip to <strong>${trip.destination}</strong> from <strong>${formattedStartDate}</strong> to <strong>${formattedEndDate}</strong>.</p>
          <p></p>
          <p>To confirm your participation in the trip, click the link below:</p>
          <p></p>
          <p>
            <a href="${confirmationLink}">Confirm trip</a>
          </p>
          <p></p>
          <p>If you are unsure why you received this email, please disregard it.</p>
          <p></p>
          <p>Best regards,</p>
          <p>Team plann.er</p>
        </div>
        `.trim(),
      })

      console.log(nodemailer.getTestMessageUrl(message))

      return { participantId: participant.id }
    }
  )
}
