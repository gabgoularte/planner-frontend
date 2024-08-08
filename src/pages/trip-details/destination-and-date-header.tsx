import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format, formatISO } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Trip {
  id: string
  destination: string,
  startsAt: string,
  endsAt: string,
  isConfirmed: boolean
}

export function DestinationAndDateHeader() {
  
  const navigate = useNavigate()
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()
  
  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data))
  }, [tripId])

  const displayedDate = trip
    ? format(formatISO(trip.startsAt), 'd/MM').concat(' até ').concat(format(formatISO(trip.endsAt), 'd/MM'))
    : null

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>
          
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button onClick={() => navigate('/')} variant="secondary" size="default">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>

      </div>
    </div>
  )
}