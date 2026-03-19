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
        width: "250px",
        background: "#f4f4f4",
        padding: "10px",
        borderRadius: "8px"
      }}
    >

      <h3>{titulo}</h3>

      {filtrados.map(cliente => (
        <Card key={cliente._id} cliente={cliente} />
      ))}

    </div>

  );

}