import dbConnect from "@/lib/mongodb";
import Cliente from "@/models/Cliente";

export async function GET() {

  await dbConnect();

  const clientes = await Cliente.find();

  return Response.json(clientes);

}

export async function POST(req) {

  await dbConnect();

  const data = await req.json();

  const cliente = await Cliente.create(data);

  return Response.json(cliente);

}