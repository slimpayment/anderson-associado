'use client';
import { useState } from 'react';
import * as React from "react"
import { cn } from "@/lib/utils"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Check, ChevronsUpDown } from 'lucide-react';




export default function PaymentCreate() {
  const [valorCobranca, setValorCobranca] = useState("");
  const [valor, setValor] = useState("");
  const [vencimento, setVencimento] = useState("");
  const [tipopagamento, settipopagamento] = useState("");
  const [campo2, setCampo2] = useState("");
  const [campo3, setCampo3] = useState("");
  const [campo4, setCampo4] = useState("");
  const [selecttipoPayment, setselecttipoPayment] = useState("");
  const [selecttipocob, setselecttipocob] = useState("");
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")


  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log({ selecttipocob,selecttipoPayment,valorCobranca, valor, vencimento,  campo2, campo3, campo4 });
  }


const list_customer = [
 {
      value: "cus_0001",
      label: "Cliente #01",
    },
    {
      value: "cus_0002",
      label: "Cliente #02",
    }
]



  return (
    <SidebarProvider>
      <AppSidebar />

    <div className='w-full  mt-2'> 
      <div className="flex-1 h-1 bg-blue-600 rounded-t" />

      {/* <div className='w-full flex justify-center mt-4'>  
        <h1 className="text-2xl font-semibold">Nova cobrança</h1>

      </div> */}


      <div className='w-full flex justify-center mt-8'>  
        <Card className="w-full max-w-3xl mb-8 rounded-xl shadow-lg">

          <CardHeader>
            <CardTitle>Criar Cobrança</CardTitle>
            <CardDescription className="text-muted-foreground">
              Preencha os dados abaixo para gerar uma cobrança para o cliente.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Campo Cliente - ocupa toda a largura */}
              <div className="mb-6">
                <Label htmlFor="customer" className="mb-2 block">Cliente</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      // className="w-[200px] justify-between"
                      className="w-full px-3 py-2"
                    >
                    {value
                            ? list_customer.find((framework) => framework.value === value)?.label
                            : "Pesquise pelo nome ..."
                          } 
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0 gap-2">
                  <Command>
                    <CommandInput placeholder="Pesquisar Cliente..." />
                    <CommandList>
                      <CommandEmpty>Cliente não Encontrado.</CommandEmpty>
                            <CommandGroup>
                              {list_customer.map((framework) => (
                                <CommandItem
                                  key={framework.value}
                                  // className='w-[200px] p-0'
                                  value={framework.value}
                                  onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      value === framework.value ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {framework.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                      
                    </CommandList>
                  </Command>
                </PopoverContent>

                </Popover>
                
              </div>








              {/* Colunas */}
              <div className="flex flex-col md:flex-row gap-8">
                {/* Coluna 1 */}
                <div className="flex-1 space-y-6">
                  <div>
                    <Label htmlFor="valor-cobranca" className="mb-2">Valor da cobrança</Label>
                    <div className="flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
                      <span className="mr-2 text-muted-foreground">R$</span>
                      <input
                        type="text"
                        id="valor-cobranca"
                        placeholder="0,00"
                        required
                        className="w-full bg-transparent outline-none"
                        value={valorCobranca}
                        onChange={(e) => setValorCobranca(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="descricao" className="mb-2">Descrição da cobrança (Opcional)</Label>
                    <textarea
                      id="descricao"
                      rows={5}
                      placeholder="A descrição informada será impressa na fatura"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Coluna 2 */}
                <div className="flex-1 space-y-6">
                  <div>
                    <Label htmlFor="vencimento" className="mb-2">Vencimento da cobrança</Label>
                    <Input
                      id="vencimento"
                      type="date"
                      value={vencimento}
                      onChange={(e) => setVencimento(e.target.value)}
                      className="px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tipo-cobranca" className="mb-2">Tipo Cobrança</Label>
                    <Select onValueChange={setselecttipocob} value={selecttipocob}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Escolha uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Opções</SelectLabel>
                          <SelectItem value="opcao1">Assinatura</SelectItem>
                          <SelectItem value="opcao2">Parcelamento</SelectItem>
                          <SelectItem value="opcao3">Avulsa</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="forma-pagamento" className="mb-2">Forma Pagamento</Label>
                    <Select onValueChange={setselecttipoPayment} value={selecttipoPayment}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Escolha uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Opções</SelectLabel>
                          <SelectItem value="boleto">Boleto Bancário / Pix</SelectItem>
                          <SelectItem value="pix">Cartão de Crédito</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
              </div>
              
              <div className="border-t my-6" />

              {/* Juros */}
              <div className='mt-6'>
                <CardHeader className='p-0'>
                  <CardTitle>Juros</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Aplique juros para quando o pagamento não ocorrer até a data de vencimento.Os juros acumulativos serão somados diariamente ao valor da parcela até o pagamento.
                  </CardDescription>
                </CardHeader>

                <div className="flex flex-col md:flex-row gap-8 mt-4">
                  <div className="flex-1 space-y-6">
                    <div>
                    <Label htmlFor="valor-cobranca" className="mb-2">Juros ao mês</Label>
                    <div className="flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
                      <span className="mr-2 text-muted-foreground">%</span>
                      <input
                        type="text"
                        id="valor-cobranca"
                        placeholder="0,00"
                        className="w-full bg-transparent outline-none"
                        value={valorCobranca}
                        onChange={(e) => setValorCobranca(e.target.value)}
                      />
                    </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div>
                      <Label htmlFor="valor-cobranca" className="mb-2">Valor de juros ao mês</Label>
                      <div className="flex items-center rounded-md border border-input px-3 py-2 text-sm shadow-sm bg-gray-300">
                        <span className="mr-2 text-muted-foreground">R$</span>
                        <input
                          type="text"
                          id="valor-cobranca"
                          placeholder="0,00"
                          className="w-full "
                          value={valorCobranca}
                          disabled
                          onChange={(e) => setValorCobranca(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Multas */}
              <div className='mt-6'>
                <CardHeader className='p-0'>
                  <CardTitle>Multas</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    A multa será somada ao valor da parcela caso o pagamento seja feito após a data do vencimento.
                  </CardDescription>
                </CardHeader>

                <div className="flex flex-col md:flex-row gap-8 mt-4">
                  <div className="flex-1 space-y-6">
                    <div>
                    <Label htmlFor="valor-cobranca" className="mb-2">Valor percentual da multa</Label>
                    <div className="flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
                      <span className="mr-2 text-muted-foreground">%</span>
                      <input
                        type="text"
                        id="valor-cobranca"
                        placeholder="0,00"
                        className="w-full bg-transparent outline-none"
                        value={valorCobranca}
                        onChange={(e) => setValorCobranca(e.target.value)}
                      />
                    </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div>
                      <Label htmlFor="valor-cobranca" className="mb-2">Valor da multa (Opcional)</Label>


                      <div className="flex items-center rounded-md border border-input px-3 py-2 text-sm shadow-sm bg-gray-300">
                        <span className="mr-2 text-muted-foreground">R$</span>
                        <input
                          type="text"
                          id="valor-cobranca"
                          placeholder="0,00"
                          className="w-full "
                          value={valorCobranca}
                          disabled
                          onChange={(e) => setValorCobranca(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Descontos */}
              <div className='mt-6'>
                <CardHeader className='p-0'>
                  <CardTitle>Descontos</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Conceda desconto para incentivar seu cliente a realizar o pagamento antes do vencimento.
                  </CardDescription>
                </CardHeader>

                <div className="flex flex-col md:flex-row gap-8 mt-4">
                  <div className="flex-1 space-y-6">
                    <div>
                    <Label htmlFor="valor-cobranca" className="mb-2">Valor percentual do desconto</Label>
                    <div className="flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
                      <span className="mr-2 text-muted-foreground">%</span>
                      <input
                        type="text"
                        id="valor-cobranca"
                        placeholder="0,00"
                        className="w-full bg-transparent outline-none"
                        value={valorCobranca}
                        onChange={(e) => setValorCobranca(e.target.value)}
                      />
                    </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div>
                      <Label htmlFor="valor-cobranca" className="mb-2">Valor do desconto (Opcional)</Label>


                      <div className="flex items-center rounded-md border border-input px-3 py-2 text-sm shadow-sm bg-gray-300">
                        <span className="mr-2 text-muted-foreground">R$</span>
                        <input
                          type="text"
                          id="valor-cobranca"
                          placeholder="0,00"
                          className="w-full "
                          value={valorCobranca}
                          disabled
                          onChange={(e) => setValorCobranca(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                </div>

              </div>













              <Button
                type="submit"
                className="mt-8 w-full md:w-auto px-8"
                onClick={handleSubmit}
              >
                Criar Pagamento
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>







    </div>







    </SidebarProvider>
  );
}
