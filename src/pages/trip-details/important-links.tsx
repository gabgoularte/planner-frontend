import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { CreateNewLinkModal } from "./create-new-link-modal";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface Link {
  title: string
  url: string
}


export function ImportantLinks() {

  const { tripId } = useParams()
  const [links, setLinks] = useState<Link[]>([])
  const [isCreateNewLinkModalOpen, setIsCreateNewLinkModalOpen] = useState(false)


  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data))
  }, [tripId])

  console.log(links)

  function openCreateNewLinkModal() {
    setIsCreateNewLinkModalOpen(true)
  }

  function closeCreateNewLinkModal() {
    setIsCreateNewLinkModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        {links.map(link => {
          return (
          <div key={link.url} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{link.title}</span>
              <span className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                <a href="#">{link.url}</a>
              </span>
            </div>
            <Link2 className="text-zinc-400 size-5 shrink-0"/>
          </div>)
        })}
      </div>

      <Button onClick={openCreateNewLinkModal} variant="secondary" size="full">
        <Plus className="size-5"/>
        Cadastrar novo link
      </Button>

      {isCreateNewLinkModalOpen ? (<CreateNewLinkModal closeCreateNewLinkModal={closeCreateNewLinkModal}/>) : null}
    </div>
  )
}