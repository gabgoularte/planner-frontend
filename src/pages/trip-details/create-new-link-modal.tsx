import { Link, Link2, Plus, X } from "lucide-react"
import { Button } from "../../components/button"
import { useParams } from "react-router-dom"
import { FormEvent } from "react"
import { api } from "../../lib/axios"

interface CreateNewLinkModalProps {
    closeCreateNewLinkModal: () => void
}

export function CreateNewLinkModal(props: CreateNewLinkModalProps) {

  const { tripId } = useParams()

  async function createLink(event: FormEvent<HTMLFormElement>) {
    
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const url = data.get('url')?.toString()

    if(title === ''){return null}

    if(url === ''){return null}

    await api.post(`/trips/${tripId}/links`,{
      title,
      url
    })

    window.document.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar novo link</h2>
              
            <button type="button" onClick={props.closeCreateNewLinkModal}>
              <X className="size-5 text-zinc-400"/>
            </button>
          </div>
            <p className="text-sm text-zinc-400">
              Os links serão exibidos para todos os convidados.
            </p>
          </div>
  
          <div className="w-full h-px bg-zinc-800"/>
            <form onSubmit={createLink} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex gap-4 flex-col">
              <div className="px-2 flex items-center flex-1 gap-2">
                <Link className="text-zinc-400 size-5" />
                <input 
                  type="title" 
                  name="title" 
                  placeholder="Título" 
                  className="bg-transparent text-lg outline-none flex-1" />                  
              </div>
              <div className="px-2 flex items-center flex-1 gap-2">
                <Link2 className="text-zinc-400 size-5" />
                <input 
                  type="url" 
                  name="url" 
                  placeholder="URL" 
                  className="bg-transparent text-lg outline-none flex-1" />                  
              </div>
              
              <Button type="submit" variant="primary" size="default">
                Adicionar 
                <Plus className="size-5"/>
              </Button>
            </form>
        </div>
      </div>
    )
}