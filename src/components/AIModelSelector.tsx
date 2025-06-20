import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown, Bot, Check } from 'lucide-react'
import React, { useState, useEffect } from 'react'

interface AIModelSelectorProps {
  models: { id: string; label: string }[]
  onSelect: (id: string) => void
}

const AIModelSelector: React.FC<AIModelSelectorProps> = ({ models, onSelect }) => {
  const [selected, setSelected] = useState(models[0])

  useEffect(() => {
    if (models.length > 0) {
      setSelected(models[0])
    }
  }, [models])

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/10 bg-white/5 text-white hover:bg-white/10 transition text-sm">
          <Bot size={16} />
          {selected.label}
          <ChevronDown size={16} className="opacity-60" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[220px] rounded-lg p-1 bg-zinc-900 text-white shadow-lg border border-white/10 backdrop-blur-lg"
          side="bottom"
          align="start"
        >
          {models.map(model => (
            <DropdownMenu.Item
              key={model.id}
              onSelect={() => {
                setSelected(model)
                onSelect(model.id)
              }}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-md cursor-pointer text-sm hover:bg-white/10 ${
                selected.id === model.id ? 'bg-white/10' : ''
              }`}
            >
              {model.label}
              {selected.id === model.id && <Check size={14} className="text-green-400" />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default AIModelSelector
