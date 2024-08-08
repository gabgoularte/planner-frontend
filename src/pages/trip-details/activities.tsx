import { Activity, CircleCheck } from "lucide-react";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
  id: string
  title: string
  occurs_at: string
}

export function Activies() {
  
  const { tripId } = useParams()
  const [activities, setActivies] = useState<Activity[]>([])
  const [days, setDays] = useState<string[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/activities`).then(response => setActivies(response.data))
  }, [tripId])

  useEffect(() => {
    setDays(getDays(activities))
  }, [activities])
  
  activities.sort((a, b) => {
    let dateA = a.occurs_at
    let dateB = b.occurs_at

    if(dateA > dateB) {return 1}
    if(dateA < dateB) {return -1}
  })

  function getDays(activities: Activity[]) {
    let days = []
    for (let i = 0; i < activities.length; i++) {
      days.push((format(activities[i].occurs_at, 'd')))
    }

    return days.filter((day, index) => {
      return days.indexOf(day) === index
    });
  }

  return (
      <div className="space-y-8">
        {days.map(day => {
          return (
            <div key={day}>
              <div className="text-xl text-zinc-400">{`Dia ${day}`}</div>
              
              {activities.map(activity => {
                if (format(activity.occurs_at, 'd') === day)
                {
                  return (
                    <div key={activity.id} className="space-y-2.5">
                      <div className="space-y-2.5">
                        <div className="px-4 py-2.5 my-1.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                          <CircleCheck className="size-5 text-lime-300"/>
                          <span className="text-zinc-100">{activity.title}</span>
                          <div className="text-zinc-400 text-sm ml-auto">
                            <span>{`${format(activity.occurs_at, 'EEEEEE', { locale: ptBR })} | ${format(activity.occurs_at, 'H:mm')}h`}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              })}

            </div>
          )
        })}
      </div>
  )
}