import { useState } from "react"
import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react"
import { format, isSameMonth } from "date-fns"
import { Button } from "../../../components/button"
import { DateRange, DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

interface DestinationAndDateStepProps {
  destination: string
  isGuestsInputOpen: boolean
  eventStartAndEndDates: DateRange | undefined
  closeGuestsInput: () => void
  openGuestsInput: () => void
  setDestination: (destination: string) => void
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  destination,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? isSameMonth(eventStartAndEndDates.from, eventStartAndEndDates.to)
        ? format(eventStartAndEndDates.from, "d")
            .concat(" to ")
            .concat(format(eventStartAndEndDates.to, "d 'of' LLL"))
        : format(eventStartAndEndDates.from, "d 'of' LLL")
            .concat(" to ")
            .concat(format(eventStartAndEndDates.to, "d 'of' LLL"))
      : null

  const disabledButton = !destination || !eventStartAndEndDates

  return (
    <div className="shadow-shape flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 max-md:h-full max-md:flex-col max-md:p-4">
      <div className="flex flex-1 items-center gap-2 max-md:w-full max-md:py-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          required
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Where are you going?"
          className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <button
        disabled={isGuestsInputOpen}
        onClick={openDatePicker}
        className="flex w-[240px] items-center gap-2 text-left max-md:w-full max-md:py-2"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="w-40 flex-1 text-lg text-zinc-400">
          {displayedDate || "When"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="shadow-shape space-y-5 rounded-xl bg-zinc-900 px-6 py-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-lg font-semibold">Select date</h2>
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

      <div className="h-6 w-px bg-zinc-800 max-md:hidden" />

      {isGuestsInputOpen ? (
        <Button
          size="responsive"
          onClick={closeGuestsInput}
          variant="secondary"
        >
          Change location/date
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button
          disabled={disabledButton}
          size="responsive"
          onClick={openGuestsInput}
        >
          Continue
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  )
}
