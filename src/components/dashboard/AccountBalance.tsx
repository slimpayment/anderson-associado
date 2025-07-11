'use client'

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export function AccountBalance() {
  const [showBalance, setShowBalance] = useState(false)

  return (
    // <div className="flex items-center justify-between bg-white p-4 rounded shadow w-[250px]">

    <div className="md:flex flex items-center justify-between px-4 py-2">

      <div>
        <p className="text-sm font-semibold text-gray-900">Saldo em conta</p>
        <p className="text-base font-semibold text-gray-400">
          {showBalance ? 'R$ 0,00' : '••••••'}
        </p>
      </div>

      <button onClick={() => setShowBalance(!showBalance)} className="px-4">
        {showBalance ? (
          <Eye className="w-5 h-5 text-gray-600" />
        ) : (
          <EyeOff className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </div>        
  )
}
