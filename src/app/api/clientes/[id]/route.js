import dbConnect from "@/lib/mongodb";
import Cliente from "@/models/Cliente";

export async function PATCH(req, context) {

  try {

    await dbConnect();

    const params = await context.params;
    const body = await req.json();

    const cliente = await Cliente.findByIdAndUpdate(
      params.id,
      { status: body.status },
      { returnDocument: "after" }
    );

    return Response.json(cliente);

  } catch (error) {

    return Response.json({
      error: "Erro ao atualizar cliente",
      details: error.message
    }, { status: 500 });

  }

}