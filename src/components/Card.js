"use client";

import { useDraggable } from "@dnd-kit/core";

export default function Card({ cliente }) {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: cliente._id
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    background: "#2a3942",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
    cursor: "grab",
    color: "#e9edef"
  };

  const faltante = (cliente.valorTotal || 0) - (cliente.sinalPago || 0);

  async function editarPedido() {

    const valorTotal = prompt("Valor total:", cliente.valorTotal || 0);
    const sinalPago = prompt("Sinal pago:", cliente.sinalPago || 0);

    await fetch(`/api/clientes/${cliente._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        valorTotal: Number(valorTotal),
        sinalPago: Number(sinalPago)
      })
    });

    window.location.reload();
  }

  const telefoneFormatado = `55${cliente.telefone}`;

  return (

    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>

      <div style={{ marginBottom: "6px" }}>
        <strong style={{ color: "#ffffff" }}>
          {cliente.nome}
        </strong>
      </div>

      <div style={{ fontSize: "12px", color: "#aebac1" }}>
         {cliente.telefone}
      </div>

      <hr style={{ margin: "8px 0" }} />

      <div style={{ fontSize: "12px", marginTop: "6px" }}>
        💰 {cliente.valorTotal || 0} | 💵 {cliente.sinalPago || 0}
      </div>

      <div style={{
        fontSize: "12px",
        color: faltante > 0 ? "#ff6b6b" : "#25D366",
        fontWeight: "bold"
      }}>
        📉 Falta: R$ {faltante}
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px"
      }}>

        <a
          href={`https://wa.me/${telefoneFormatado}`}
          target="_blank"
          style={{
            color: "#25D366",
            fontSize: "14px",
            textDecoration: "none"
          }}
        >
          💬 Whats
        </a>

        <button
          onClick={editarPedido}
          style={{
            border: "none",
            background: "#eee",
            padding: "4px 8px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ✏️
        </button>

      </div>

    </div>

  );

}