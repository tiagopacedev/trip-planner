import { Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/button"
import { CreateActivityModal } from "./create-activity-modal"
import { ImportantLinks } from "./important-links"
import { Guests } from "./guests"
import { Activities } from "./activities"
import { DestinationAndDateHeader } from "./destination-and-date-header"

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10 max-md:px-3 max-md:pt-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4 max-md:flex-col">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Activities</h2>

            <Button onClick={openCreateActivityModal}>
              <Plus className="size-5" />
              Add Activity
            </Button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6 max-md:w-full">
          <ImportantLinks />

          <div className="h-px w-full bg-zinc-800" />

          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  )
}
