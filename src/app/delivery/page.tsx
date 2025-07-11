'use client';

import { useEffect, useState } from 'react';

type Produto = {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
};

export default function Home() {
  const produtos: Record<string, Produto[]> = {
    Pizzas: [
      {
        id: 1,
        nome: 'Pizzas',
        preco: 40,
        descricao: 'Escolha o tamanho e sabores de sua preferência',
        imagem: 'https://storage.alfalabs.com.br/assets/imgClientes/cardapio/id-3/produtos/2025-02-27_16-24-27.jpg',
      },
    ],
    Hambúrgueres: [
      {
        id: 2,
        nome: 'X-Duplo',
        preco: 15,
        descricao: 'Pão, dois hambúrgueres, queijo e molho',
        imagem: 'https://storage.alfalabs.com.br/assets/imgClientes/cardapio/id-3/produtos/2025-02-27_16-24-27.jpg',
      },
      {
        id: 3,
        nome: 'X-Salada',
        preco: 22,
        descricao: 'Molho, hambúrguer, queijo, tomate, alface, cebola',
        imagem: 'https://storage.alfalabs.com.br/assets/imgClientes/cardapio/id-3/produtos/2025-02-27_16-24-27.jpg',
      },
      {
        id: 4,
        nome: 'X-Calabresa',
        preco: 23,
        descricao: 'Molho, hambúrguer, queijo, tomate, alface, pepino e calabresa',
        imagem: 'https://storage.alfalabs.com.br/assets/imgClientes/cardapio/id-3/produtos/2025-02-27_16-24-27.jpg',
      },
    ],
    Pratos: [
      {
        id: 5,
        nome: 'Buffet kilo',
        preco: 40,
        descricao: 'Alcatra assada na brasa com fritas e salada',
        imagem: 'https://storage.alfalabs.com.br/assets/imgClientes/cardapio/id-3/produtos/2025-02-27_16-24-27.jpg',
      },
    ],
  };

  const [modalProduto, setModalProduto] = useState<Produto | null>(null);
  const [carrinho, setCarrinho] = useState<(Produto & { quantidade: number })[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('carrinho');
    if (saved) setCarrinho(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho((prev) => {
      const existente = prev.find((p) => p.id === produto.id);
      if (existente) {
        return prev.map((p) =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
    setModalProduto(null);
  };

  const removerDoCarrinho = (id: number) => {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  };

  const alterarQuantidade = (id: number, delta: number) => {
    setCarrinho((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantidade: p.quantidade + delta } : p))
        .filter((p) => p.quantidade > 0)
    );
  };

  const total = carrinho.reduce((sum, p) => sum + p.preco * p.quantidade, 0);

  const finalizarPedido = () => {
    const mensagem = encodeURIComponent(
      `*Pedido:*\n${carrinho
        .map(
          (p) =>
            `• ${p.nome} x${p.quantidade} - R$${(p.preco * p.quantidade).toFixed(2)}`
        )
        .join('\n')}\n\n*Total:* R$${total.toFixed(2)}`
    );
    const numero = '5561991186631'; // Altere para seu número com DDI
    window.open(`https://wa.me/${numero}?text=${mensagem}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow border-b">
        <div className="font-bold text-xl">🍕 ALFALABS</div>
        <div className="text-sm">👤 fernando</div>
      </nav>

      {/* Conteúdo */}
      <div className="p-6 space-y-10 pr-[320px]">
        {Object.entries(produtos).map(([categoria, itens]) => (
          <section key={categoria}>
            <h2 className="text-2xl font-semibold mb-4">{categoria}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {itens.map((produto) => (
                <div
                  key={produto.id}
                  className="border rounded-lg p-4 flex gap-4 hover:shadow-md transition cursor-pointer"
                  onClick={() => setModalProduto(produto)}
                >
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{produto.nome}</h3>
                    <p className="text-red-500 font-semibold">
                      R${produto.preco.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">{produto.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Modal */}
      {modalProduto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-2">{modalProduto.nome}</h2>
            <img
              src={modalProduto.imagem}
              alt={modalProduto.nome}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <p className="text-sm text-gray-600 mb-4">{modalProduto.descricao}</p>
            <p className="font-bold text-red-500 mb-4">
              R${modalProduto.preco.toFixed(2)}
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setModalProduto(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={() => adicionarAoCarrinho(modalProduto)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Carrinho */}
      <aside className="fixed top-0 right-0 w-[300px] h-full bg-gray-100 shadow-lg p-4 overflow-y-auto z-40">
        <h2 className="text-xl font-bold mb-4">🛒 Carrinho</h2>
        {carrinho.length === 0 && <p className="text-sm">Seu carrinho está vazio.</p>}
        {carrinho.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-2">
            <div>
              <p className="font-semibold">{item.nome}</p>
              <p className="text-sm text-gray-600">
                R${item.preco.toFixed(2)} x {item.quantidade}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => alterarQuantidade(item.id, -1)}
                className="px-2 bg-red-500 text-white rounded"
              >
                -
              </button>
              <button
                onClick={() => alterarQuantidade(item.id, 1)}
                className="px-2 bg-green-500 text-white rounded"
              >
                +
              </button>
              <button
                onClick={() => removerDoCarrinho(item.id)}
                className="text-xs text-gray-400 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        {carrinho.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="font-bold text-lg">Total: R${total.toFixed(2)}</p>
            <button
              onClick={finalizarPedido}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            >
              Finalizar Pedido via WhatsApp
            </button>
          </div>
        )}
      </aside>
    </main>
  );
}
