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
    background: "#fff",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    cursor: "grab"
  };

  return (

    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>

      <strong>{cliente.nome}</strong>
      <p>{cliente.telefone}</p>

    </div>

  );

}