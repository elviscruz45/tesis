import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tesis-SignIn",
  // description: "Notes page",
};

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      here we gosss
      <SignIn appearance={{ variables: { colorPrimary: "#0F172A" } }} />
    </div>
  );
}
