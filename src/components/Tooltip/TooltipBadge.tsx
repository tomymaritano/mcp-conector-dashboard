import * as Tooltip from '@radix-ui/react-tooltip'
import { ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react'

type Props = {
  type: 'official' | 'third-party'
  link?: string
}

const TooltipBadge = ({ type, link }: Props) => {
  const label =
    type === 'official'
      ? 'Servidor oficial del protocolo MCP. Verificado y mantenido por el equipo principal.'
      : 'Servidor creado por terceros. Usar con precaución.'

  const color =
    type === 'official'
      ? 'bg-emerald-500/80 text-white'
      : 'bg-yellow-400/90 text-black'

  const Icon = type === 'official' ? ShieldCheck : AlertTriangle

  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span
            className={`text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium
              ${color} backdrop-blur-md border border-white/10
              shadow-[inset_0_0_4px_rgba(255,255,255,0.1)] transition hover:scale-105 cursor-default`}
          >
            <Icon size={12} strokeWidth={2} />
            {type === 'official' ? 'Oficial' : '3rd Party'}
            {link && <ExternalLink size={12} className="ml-0.5" />}
          </span>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 text-xs max-w-xs px-4 py-3 rounded-lg bg-zinc-900/90 text-zinc-100
              shadow-2xl border border-white/10 backdrop-blur-xl animate-fade-in"
            side="top"
            sideOffset={10}
          >
            <div className="flex flex-col gap-1 leading-snug">
              <span>{label}</span>
              {link && (
                <a
                  href={link}
                  className="underline text-teal-300 hover:text-teal-400 mt-1 flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver más <ExternalLink size={12} />
                </a>
              )}
            </div>
            <Tooltip.Arrow className="fill-zinc-900/90" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default TooltipBadge