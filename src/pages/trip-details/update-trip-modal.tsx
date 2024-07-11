import { Calendar, Tag, X } from "lucide-react"
import { Button } from "../../components/button"
import { FormEvent, useState, useEffect } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"
import { DateRange, DayPicker } from "react-day-picker"
import { format, parseISO } from "date-fns"
import { Trip } from "./destination-and-date-header"

interface UpdateTripModalProps {
  trip: Trip | undefined
  closeUpdateTripModal: () => void
}

export function UpdateTripModal({
  trip,
  closeUpdateTripModal,
}: UpdateTripModalProps) {
  const { tripId } = useParams()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()
  const [formData, setFormData] = useState({
    title: trip?.destination || "",
  })

  useEffect(() => {
    if (trip) {
      setFormData({
        title: trip.destination,
      })

      setEventStartAndEndDates({
        from: parseISO(trip.starts_at),
        to: parseISO(trip.ends_at),
      })
    }
  }, [trip])

  function openDatePicker(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation() // Stop propagation to prevent closing the modal
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  async function updateTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newDestination = formData.title
    const newStartsAt = eventStartAndEndDates?.from
    const newEndsAt = eventStartAndEndDates?.to

    await api.put(`/trips/${tripId}`, {
      destination: newDestination,
      starts_at: newStartsAt,
      ends_at: newEndsAt,
    })

    closeUpdateTripModal()
    window.location.reload()
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : "Quando?"
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60"
      onClick={closeUpdateTripModal}
    >
      <div
        className="shadow-shape w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Alterar viagem</h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={closeUpdateTripModal}
              />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Ao alterar a data, você perderá suas atividades cadastradas.
          </p>
        </div>

        <form onSubmit={updateTrip} className="space-y-3">
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Tag className="size-5 text-zinc-400" />
            <input
              name="title"
              placeholder="Para onde você vai?"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <button
              type="button"
              onClick={openDatePicker}
              className="flex w-[240px] items-center gap-2 text-left"
            >
              <Calendar className="size-5 text-zinc-400" />
              <span className="w-40 flex-1 text-lg text-zinc-400">
                {displayedDate}
              </span>
            </button>
          </div>

          {isDatePickerOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black/60"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="shadow-shape space-y-5 rounded-xl bg-zinc-900 px-6 py-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="font-lg font-semibold">Selecione a data</h2>
                    <button>
                      <X
                        className="size-5 text-zinc-400"
                        onClick={closeDatePicker}
                      />
                    </button>
                  </div>
                </div>

                <DayPicker
                  mode="range"
                  selected={eventStartAndEndDates}
                  onSelect={setEventStartAndEndDates}
                />
              </div>
            </div>
          )}

          <Button size="full">Salvar atividade</Button>
        </form>
      </div>
    </div>
  )
}
