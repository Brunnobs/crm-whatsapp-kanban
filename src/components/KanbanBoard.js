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

  // 🔥 Drag and Drop
  async function handleDragEnd(event) {

    const { active, over } = event;

    if (!over) return;

    const clienteId = active.id;
    const novoStatus = over.id;

    await fetch(`/api/clientes/${clienteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: novoStatus
      })
    });

    carregarClientes();
  }

  // 🔥 Criar cliente (CORRIGIDO - fora do return)
  async function criarCliente() {

    const nome = prompt("Nome do cliente:");
    const telefone = prompt("Telefone:");

    if (!nome || !telefone) return;

    await fetch("/api/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        telefone
      })
    });

    carregarClientes();
  }

  return (

  <DndContext onDragEnd={handleDragEnd}>

    <div style={{
      background: "#111b21", // fundo escuro estilo WhatsApp
      minHeight: "100vh",
      padding: "20px"
    }}>

    <h1 style={{
      color: "#e9edef",
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px"
    }}>
      📊 CRM WhatsApp
    </h1>

      <button
        onClick={criarCliente}
        style={{
          marginBottom: "20px",
          padding: "10px 16px",
          background: "#25D366",
          color: "#111",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer"
      }}
    >
       ➕ Novo Cliente
    </button>

      <div style={{
        display: "flex",
        gap: "16px",
        overflowX: "auto"
      }}>

        <Column id="conversa" titulo="Conversas" clientes={clientes} />
        <Column id="negociacao" titulo="Negociação" clientes={clientes} />
        <Column id="producao" titulo="Produção" clientes={clientes} />
        <Column id="entrega" titulo="Entrega" clientes={clientes} />

      </div>

    </div>

  </DndContext>

);

}