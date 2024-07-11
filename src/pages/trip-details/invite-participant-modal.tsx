import { UserRoundPlus, X } from "lucide-react"
import { Button } from "../../components/button"
import { FormEvent, useState } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"

interface InviteParticipantModalProps {
  closeInviteParticipantModal: () => void
}

export function InviteParticipantModal({
  closeInviteParticipantModal,
}: InviteParticipantModalProps) {
  const { tripId } = useParams()
  const [isLoading, setisloading] = useState(false)

  async function addParticipant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const email = data.get("email")?.toString()

    if (!email) {
      return
    }

    setisloading(true)
    await api.post(`/trips/${tripId}/invites`, {
      email,
    })
    setisloading(false)
    window.document.location.reload()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="shadow-shape w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Adicionar convidado</h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={closeInviteParticipantModal}
              />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>

        <form onSubmit={addParticipant} className="space-y-3">
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <UserRoundPlus className="size-5 text-zinc-400" />
            <input
              name="email"
              placeholder="Quem estará na viagem?"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>

          <Button size="full">
            {isLoading ? "Convidando..." : " Convidar"}
          </Button>
        </form>
      </div>
    </div>
  )
}
