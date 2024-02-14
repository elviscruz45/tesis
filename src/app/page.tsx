import Image from "next/image";
import logo from "../assets/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  console.log("oaaaaa");
  const { userId } = auth();
  console.log("userId", userId);

  if (userId) {
    redirect("/notes");
  }
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        <Image src={logo} alt="FlowBrain logo" width={100} height={100} />
        <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Tesis
        </span>
      </div>
      <p className="max-w-prose text-center">
        Tesis is a web application that allows you to create, edit, and delete
        notes. It is built with Next.js, Tailwind CSS, and Clerk.dev.
      </p>
      <Button asChild>
        <Link href="/notes">Get Started</Link>
      </Button>
    </main>
  );
}
