import { CheckCircle2, CircleDashed, User } from "lucide-react";
import { Button } from "../../components/button";
import { InviteNewGuestsModal } from "./invite-new-guests-modal";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface Participant {
  id: string
  name: string | null
  email: string
  isConfirmed: boolean
}

export function Guests() {

  const {tripId} = useParams()
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isInviteNewGuestsModalOpen, setIsInviteNewGuestsModalOpen] = useState(false)

  function openInviteNewGuestsModal() {
    setIsInviteNewGuestsModalOpen(true)
  }

  function closeInviteNewGuestsModal() {
    setIsInviteNewGuestsModalOpen(false)
  }

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <div key={participant.id} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">{participant.name ? (participant.name) : `Convidado ${index + 1}`}</span>
                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>
              {participant.isConfirmed ? (
                <CheckCircle2 className="text-green-400 size-5 shrink-0"/> ) : ( 
                <CircleDashed className="text-zinc-400 size-5 shrink-0"/> 
                )}
            </div>
          )
        })}
      </div>
      
      <Button onClick={openInviteNewGuestsModal} variant="secondary" size="full">
          <User className="size-5" />
          Adicionar convidados
      </Button>

      {isInviteNewGuestsModalOpen ? (
        <InviteNewGuestsModal 
          closeGuestsModal={closeInviteNewGuestsModal}
        />) : null}
    </div>
  )
}