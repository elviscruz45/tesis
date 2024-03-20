import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import Note from "@/components/area/Note";
import SideNavbar from "./SideNavbar";
import NavBarInicio from "./NavBarInicio";
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/dist/server/api-utils";

export const metadata: Metadata = {
  title: "Notes",
};

export default async function NotesPages() {
  const { userId } = auth();

  if (!userId) throw new Error("You must be logged in to view this page");

  const allNotes = await prisma.note.findMany({
    where: {
      userId,
      Nivel: "2",
    },
  });

  //Mercado Pago

  // Agrega credenciales
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!,
  });

  // async function donate() {
  //   "use server";
  //   const preference = await new Preference(client).create({
  //     body: {
  //       items: [
  //         { id: "donacion", title: "Mi producto", quantity: 1, unit_price: 20 },
  //       ],
  //     },
  //   });
  //   redirect(preference.sandbox_init_point!, { permanent: false });

  //   }

  // .then(console.log)
  // .catch(console.log);

  return (
    <div className="flex flex-row">
      <div className=" basis-1/5 overflow-y-auto ">
        <SideNavbar />
      </div>
      <div className="basis-4/5 overflow-y-auto ">
        <NavBarInicio />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allNotes.map((note: any) => (
            <Note note={note} key={note.id} />
          ))}
          {allNotes.length === 0 && (
            <div className=" text-center">
              {"Todavia no hay informacion..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
