import { User, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"
import { format, isSameMonth } from "date-fns"
import { DateRange } from "react-day-picker"

interface ConfirmTripModalProps {
  destination: string
  eventStartAndEndDates: DateRange | undefined
  closeConfirmTripModal: () => void
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
}

export function ConfirmTripModal({
  destination,
  eventStartAndEndDates,
  closeConfirmTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName,
}: ConfirmTripModalProps) {
  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? isSameMonth(eventStartAndEndDates.from, eventStartAndEndDates.to)
        ? format(eventStartAndEndDates.from, "d")
            .concat(" to ")
            .concat(format(eventStartAndEndDates.to, "d' of 'LLL"))
        : format(eventStartAndEndDates.from, "d' of 'LLL")
            .concat(" to ")
            .concat(format(eventStartAndEndDates.to, "d' of 'LLL"))
      : null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="shadow-shape w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Confirm trip creation</h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={closeConfirmTripModal}
              />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            To finalize the creation of the trip to{" "}
            <span className="font-semibold text-zinc-100">{destination}</span>{" "}
            on{" "}
            <span className="font-semibold text-zinc-100">{displayedDate}</span>{" "}
            fill in your details below:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <User className="size-5 text-zinc-400" />
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>

          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <User className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Your personal email"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>

          <Button type="submit" size="full">
            Confirm trip creation
          </Button>
        </form>
      </div>
    </div>
  )
}
