"use client";

import { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Column from "./Column";

export default function KanbanBoard() {

  const [clientes, setClientes] = useState([]);

  async function carregarClientes() {
    const res = await fetch("/api/clientes");
    const data = await res.json();
    setClientes(data);
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  // 🔥 Aqui acontece a mágica
  async function handleDragEnd(event) {

    const { active, over } = event;

    if (!over) return;

    const clienteId = active.id;
    const novoStatus = over.id;

    // Atualiza no banco
    await fetch(`/api/clientes/${clienteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: novoStatus
      })
    });

    // Atualiza na tela
    carregarClientes();
  }

  return (

    <DndContext onDragEnd={handleDragEnd}>

      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>

        <Column id="conversa" titulo="Conversas" clientes={clientes} />
        <Column id="negociacao" titulo="Negociação" clientes={clientes} />
        <Column id="producao" titulo="Produção" clientes={clientes} />
        <Column id="entrega" titulo="Entrega" clientes={clientes} />

      </div>

    </DndContext>

  );

}