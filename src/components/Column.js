"use client";

import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";

export default function Column({ titulo, id, clientes }) {

  const { setNodeRef } = useDroppable({
    id: id
  });

  const filtrados = clientes.filter(c => c.status === id);

  return (

    <div
      ref={setNodeRef}
      style={{
        minWidth: "280px",
        background: "#202c33", // cor WhatsApp
        borderRadius: "10px",
        padding: "10px"
      }}
>

  <h3 style={{
    marginBottom: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#aebac1" // cinza claro
  }}>
    {titulo}
  </h3>

      {filtrados.map(cliente => (
        <Card key={cliente._id} cliente={cliente} />
      ))}

    </div>

  );

}