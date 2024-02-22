import Image from "next/image";
import logo from "../assets/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect("/notes");
  }
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        <Image src={logo} alt="FlowBrain logo" width={100} height={100} />
        <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          DiscoverEdge
        </span>
      </div>
      <p className="max-w-prose text-center">
        Descubre nuestra plataforma innovadora para realizar tesis de pregrado y
        postgrado con inteligencia artificial. Potencia tu investigación
        académica con nuestras herramientas inteligentes. Únete a nosotros y
        simplifica tu proceso de tesis hoy mismo.
      </p>
      <Button asChild>
        <Link href="/notes">Empezar</Link>
      </Button>
    </main>
  );
}
