'use client'

import { useState } from 'react'

import {
    DollarSign,
    TrendingDownIcon,
    TrendingUpIcon,
    User,
    BanknoteArrowUp,
    BanknoteArrowDown,
    Loader2,
    Eye,
    EyeOff
}from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button"


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"

export function SectionCards() {
      const [mostrarSaldopending, setMostrarSaldopending] = useState(false)
      const [mostrarSaldodisponivel, setMostrarSaldodisponivel] = useState(false)
      

  return (

    <div>
        <div className="mt-2 grid grid-cols-1 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 gap-2 px-4 lg:px-6 *:data-[slot=card]:shadow-xs *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">

            <Card className="border border-gray-500 @container/card">
                <CardHeader className="relative">
                    <div className="flex items-center justify-between">
                <CardDescription>Saldo Disponível</CardDescription>
                        {/* <Eye className="ml-auto w-4 h-4" />
                        <EyeOff className="ml-auto w-4 h-4" /> */}
                        <button onClick={() => setMostrarSaldodisponivel(!mostrarSaldodisponivel)}>
                            {mostrarSaldodisponivel ? (
                                        <Eye className="ml-auto w-4 h-4" />
                            ) : (
                                        <EyeOff className="ml-auto w-4 h-4" />
                            )}
                        </button>




                    </div>
                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-green-600">
                   
                              {mostrarSaldodisponivel ? 'R$ 18.974,99' : '••••••••'}

                </CardTitle>

                </CardHeader>

            </Card>

            <Card className="border border-gray-500 @container/card">
                <CardHeader className="relative">
                    <div className="flex items-center justify-between">
                <CardDescription >Saldo Pendente</CardDescription>
                        {/* <Eye className="ml-auto w-4 h-4" />
                        <EyeOff className="ml-auto w-4 h-4" /> */}
                        <button onClick={() => setMostrarSaldopending(!mostrarSaldopending)}>
                            {mostrarSaldopending ? (
                                        <Eye className="ml-auto w-4 h-4" />
                            ) : (
                                        <EyeOff className="ml-auto w-4 h-4" />
                            )}
                        </button>




                    </div>
                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-red-600">
                   
                              {mostrarSaldopending ? 'R$ 18.974,99' : '••••••••'}

                </CardTitle>

                </CardHeader>

            </Card>

            <Card className="border border-gray-500 @container/card">
                <CardHeader className="relative">
                    <div className="flex items-center justify-between">
                <CardDescription>Cliente Cadastrados</CardDescription>
                        <User className="ml-auto w-4 h-4"/>
                    </div>
                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                   0
                </CardTitle>

                </CardHeader>
            </Card>
        </div>

    </div>

  )
}
