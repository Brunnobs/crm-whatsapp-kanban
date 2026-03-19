import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {

    await dbConnect();

    return Response.json({
      message: "MongoDB conectado com sucesso 🚀"
    });

  } catch (error) {

    return Response.json({
      error: "Erro ao conectar",
      details: error.message
    });

  }
}