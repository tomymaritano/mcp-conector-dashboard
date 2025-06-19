// src/screens/Welcome.tsx
import { useEffect } from 'react'

const Welcome = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Aquí iría la lógica para avanzar a la app principal
      console.log('Ir al dashboard o editor')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex  items-center justify-center h-screen text-white">
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight">Inkrun</h1>
        <p className="text-sm text-zinc-400 mt-2">Ideas que corren, palabras que quedan.</p>
      </div>
    </div>
  )
}

export default Welcome
