'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const statementsMock = [
  { id: 1, date: '2025-07-01', description: 'Compra Amazon', amount: -120.5 },
  { id: 2, date: '2025-07-03', description: 'Depósito', amount: 500 },
  { id: 3, date: '2025-07-08', description: 'Spotify', amount: -34.9 },
];

export default function DashboardPage() {
  const [filter, setFilter] = useState('');
  const [statements, setStatements] = useState(statementsMock);

  const handleFilter = () => {
    const filtered = statementsMock.filter((s) =>
      s.description.toLowerCase().includes(filter.toLowerCase())
    );
    setStatements(filtered);
  };

  const totalGasto = statementsMock
    .filter((s) => s.amount < 0)
    .reduce((acc, s) => acc + s.amount, 0);

  const totalRecebido = statementsMock
    .filter((s) => s.amount > 0)
    .reduce((acc, s) => acc + s.amount, 0);

  return (
    <div className="flex h-screen bg-muted">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <nav className="flex flex-col gap-2 text-sm">
          <a href="#" className="font-medium text-muted-foreground hover:text-primary">Dashboard</a>
          <a href="#" className="font-medium text-muted-foreground hover:text-primary">Clientes</a>
          <a href="#" className="font-medium text-muted-foreground hover:text-primary">Extratos</a>
          <a href="#" className="font-medium text-muted-foreground hover:text-primary">Configurações</a>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Topbar */}
{/* Header de seção no topo do conteúdo */}
<div className="flex items-center justify-between">
  <div>
    <h2 className="text-2xl font-semibold tracking-tight">Clientes</h2>
    <p className="text-muted-foreground text-sm">Gerencie os dados e extratos dos clientes</p>
  </div>
  <Button className="bg-green-600 hover:bg-green-700 text-white">
    + Novo Cliente
  </Button>
</div>


        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Gasto</CardTitle>
            </CardHeader>
            <CardContent className="text-red-500 font-bold text-xl">
              R$ {Math.abs(totalGasto).toFixed(2)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Recebido</CardTitle>
            </CardHeader>
            <CardContent className="text-green-600 font-bold text-xl">
              R$ {totalRecebido.toFixed(2)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Transações</CardTitle>
            </CardHeader>
            <CardContent className="font-bold text-xl">
              {statementsMock.length}
            </CardContent>
          </Card>
        </div>

        {/* Filtro e tabela */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Extrato</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Filtrar</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filtrar extrato</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Filtrar por descrição"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <DialogFooter>
                <Button onClick={handleFilter}>Aplicar Filtro</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Separator />

        {/* Tabela moderna */}
        <div className="bg-white rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left p-4">Data</th>
                <th className="text-left p-4">Descrição</th>
                <th className="text-right p-4">Valor</th>
              </tr>
            </thead>
            <tbody>
              {statements.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-4">{s.date}</td>
                  <td className="p-4">{s.description}</td>
                  <td
                    className={`p-4 text-right font-medium ${
                      s.amount < 0 ? 'text-red-500' : 'text-green-600'
                    }`}
                  >
                    R$ {s.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
