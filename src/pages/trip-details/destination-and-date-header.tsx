import { MapPin, Calendar, Settings2 } from "lucide-react"
import { Button } from "../../components/button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { format, isSameMonth } from "date-fns"
import { UpdateTripModal } from "./update-trip-modal"

export interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()
  const [isUpdateLinkModalOpen, setIsUpdateLinkModalOpen] = useState(false)

  function openUpdateLinkModal() {
    setIsUpdateLinkModalOpen(true)
  }

  function closeUpdateLinkModal() {
    setIsUpdateLinkModalOpen(false)
  }

  useEffect(() => {
    api.get(`trips/${tripId}`).then((response) => setTrip(response.data.trip))
  }, [tripId])

  const displayedDate = trip
    ? isSameMonth(trip.starts_at, trip.ends_at)
      ? format(trip.starts_at, "d")
          .concat(" até ")
          .concat(format(trip.ends_at, "d' de 'LLL"))
      : format(trip.starts_at, "d' de 'LLL")
          .concat(" até ")
          .concat(format(trip.ends_at, "d' de 'LLL"))
    : null

  return (
    <div className="shadow-shape flex h-16 items-center justify-between rounded-xl bg-zinc-900 px-4 max-md:gap-4">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 shrink-0 text-zinc-400" />
        <span className="text-zinc-100 max-md:text-sm">
          {trip?.destination}
        </span>
      </div>

      <div className="flex items-center gap-5 max-md:gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400 max-md:hidden" />
          <span className="text-zinc-100 max-md:text-sm">{displayedDate}.</span>
        </div>

        <div className="h-6 w-px bg-zinc-800 max-md:hidden" />

        <Button variant="secondary" onClick={openUpdateLinkModal}>
          <span className="max-md:hidden"> Alterar local/data</span>
          <Settings2 className="size-5 shrink-0" />
        </Button>
      </div>

      {isUpdateLinkModalOpen && (
        <UpdateTripModal
          trip={trip}
          closeUpdateTripModal={closeUpdateLinkModal}
        />
      )}
    </div>
  )
}
