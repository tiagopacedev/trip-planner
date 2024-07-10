import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { dayjs } from '../lib/dayjs'
import { ClientError } from '../errors/client-error'

export async function getActivities(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/trips/:tripId/activities',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
        include: {
          activities: {
            orderBy: {
              occurs_at: 'asc',
            },
          },
        },
      })

      if (!trip) {
        throw new ClientError('Trip not found')
      }

      // Calculate activities grouped by date during the trip period
      const differenceInDaysBetweenTripStartAndEnd = dayjs(trip.ends_at).diff(
        trip.starts_at,
        'days'
      )

      // Generate an array of days within the trip duration, each containing activities occurring on that day
      const activities = Array.from({ length: differenceInDaysBetweenTripStartAndEnd + 1 }).map(
        (_, index) => {
          // Calculate the specific date for each iteration
          const date = dayjs(trip.starts_at).add(index, 'days')

          return {
            date: date.toDate(),
            activities: trip.activities.filter((activity) => {
              // Filter activities occurring on the current date
              return dayjs(activity.occurs_at).isSame(date, 'day')
            }),
          }
        }
      )

      return { activities }
    }
  )
}
