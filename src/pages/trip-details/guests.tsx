import { CheckCircle2, CircleDashed, UserCog } from "lucide-react"
import { Button } from "../../components/button"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../lib/axios"
import { InviteParticipantModal } from "./invite-participant-modal"

interface Participant {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export function Guests() {
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isInviteParticipantLinkModalOpen, setIsInviteParticipantModalOpen] =
    useState(false)

  function openInviteParticipantModal() {
    setIsInviteParticipantModalOpen(true)
  }

  function closeInviteParticipantModal() {
    setIsInviteParticipantModalOpen(false)
  }

  useEffect(() => {
    api
      .get(`trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {participant.name ?? `Convidado ${index}`}
              </span>
              <span className="block truncate text-sm text-zinc-400">
                {participant.email}
              </span>
            </div>

            {participant.is_confirmed ? (
              <CheckCircle2 className="size-5 shrink-0 text-green-400" />
            ) : (
              <CircleDashed className="size-5 shrink-0 text-zinc-400" />
            )}
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        size="full"
        onClick={openInviteParticipantModal}
      >
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>

      {isInviteParticipantLinkModalOpen && (
        <InviteParticipantModal
          closeInviteParticipantModal={closeInviteParticipantModal}
        />
      )}
    </div>
  )
}
