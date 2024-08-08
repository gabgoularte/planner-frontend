import { AtSign, Plus, X } from "lucide-react"
import { Button } from "../../components/button"

interface InviteNewGuestsModalProps {
    closeGuestsModal: () => void
}

export function InviteNewGuestsModal(props: InviteNewGuestsModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Selecionar convidados</h2>
              
              <button type="button" onClick={props.closeGuestsModal}>
                <X className="size-5 text-zinc-400"/>
              </button>
            </div>
            <p className="text-sm text-zinc-400">
              Os convidados irão receber e-mails para confirmar a participação na viagem,
              <span className="text-lime-400"> novos convidados so serão exibidos após a confirmação.</span>
            </p>
          </div>
  
          

          <div className="w-full h-px bg-zinc-800"/>
            <form className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <div className="px-2 flex items-center flex-1 gap-2">
                <AtSign className="text-zinc-400 size-5" />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Digite o e-mail do convidado" 
                  className="bg-transparent text-lg outline-none flex-1" />                  
              </div>
              
              <Button variant="primary" size="default">
                Convidar 
                <Plus className="size-5"/>
              </Button>
            </form>
        </div>
      </div>
    )
}