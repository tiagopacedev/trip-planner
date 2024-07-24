import { X, AtSign, Plus } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"

interface InviteGuestsModalProps {
  closeGuestsModal: () => void
  emailsToInvite: string[]
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
  removeEmailFromInvites: (email: string) => void
}

export function InviteGuestsModal({
  closeGuestsModal,
  addNewEmailToInvite,
  emailsToInvite,
  removeEmailFromInvites,
}: InviteGuestsModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="shadow-shape w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Select guests</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeGuestsModal} />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Guests will receive emails to confirm their participation in the
            trip.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => {
            return (
              <div
                key={email}
                className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5"
              >
                <span className="text-zinc-300">{email}</span>
                <button type="button">
                  <X
                    onClick={() => removeEmailFromInvites(email)}
                    className="size-4 text-zinc-400"
                  />
                </button>
              </div>
            )
          })}
        </div>

        <div className="h-px w-full bg-zinc-800" />

        <form
          onSubmit={addNewEmailToInvite}
          className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 max-md:flex-col max-md:gap-4 max-md:border-none max-md:bg-transparent max-md:p-0"
        >
          <div className="flex flex-1 items-center gap-2 px-2 max-md:w-full max-md:gap-0 max-md:rounded-lg max-md:border-zinc-800 max-md:bg-zinc-950">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Enter guest's email"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none max-md:p-3"
            />
          </div>

          <Button size="responsive" type="submit">
            Invite
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
