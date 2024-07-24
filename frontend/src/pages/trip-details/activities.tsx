import { CircleCheck } from "lucide-react"
import { api } from "../../lib/axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { format } from "date-fns"
import { enUS } from "date-fns/locale"

interface Activity {
  date: string
  activities: {
    id: string
    title: string
    occurs_at: string
  }[]
}

export function Activities() {
  const { tripId } = useParams()
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    api
      .get(`trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities))
  }, [tripId])

  return (
    <div className="space-y-8">
      {activities.map((category) => {
        return (
          <div key={category.date} className="space-y-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-zinc-300">
                Day {format(new Date(category.date), "d")}
              </span>
              <span className="text-xs text-zinc-500">
                {format(category.date, "EEEE", { locale: enUS })}
              </span>
            </div>
            {category.activities.length > 0 ? (
              <div className="space-y-3">
                {category.activities.map((activity) => {
                  return (
                    <div key={activity.id} className="space-y-2.5">
                      <div className="shadow-shape flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5">
                        <CircleCheck className="size-5 text-rose-500" />
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="ml-auto text-sm text-zinc-400">
                          {format(activity.occurs_at, "HH:mm")}h
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">
                No activities scheduled for this date.
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
