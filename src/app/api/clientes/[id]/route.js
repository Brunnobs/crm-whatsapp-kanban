import dbConnect from "@/lib/mongodb";
import Cliente from "@/models/Cliente";

export async function PATCH(req, context) {

  try {

    await dbConnect();

    const params = await context.params;
    const body = await req.json();

    const cliente = await Cliente.findByIdAndUpdate(
      params.id,
      { 
        status: body.status,
        valorTotal: body.valorTotal,
        sinalPago: body.sinalPago 
      },
      { returnDocument: "after" }
    );
    const updateData = {};

      if (body.status) updateData.status = body.status;
      if (body.valorTotal !== undefined) updateData.valorTotal = body.valorTotal;
      if (body.sinalPago !== undefined) updateData.sinalPago = body.sinalPago;

    return Response.json(cliente);

  } catch (error) {

    return Response.json({
      error: "Erro ao atualizar cliente",
      details: error.message
    }, { status: 500 });

  }

}