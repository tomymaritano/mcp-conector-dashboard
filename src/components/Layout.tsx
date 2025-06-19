import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen bg-zinc-900 text-white flex flex-col">

      <main className="">
        {children}
      </main>

      <footer className="h-10 px-6 flex items-center justify-center text-xs text-gray-500 bg-white/5 border-t border-white/10 backdrop-blur">
        Made with ⚡️ by Tomás Maritano
      </footer>
    </div>
  )
}

export default Layout