"use client";
import Link from "next/link";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddEditNoteDialogNivel2 from "@/components/AddEditNoteDialogNivel2";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import AIChatButton from "@/components/chatTesis/AIChatButton";

export default function NavBarNivel2({ sectionName }: { sectionName: any }) {
  const { theme } = useTheme();
  const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false);

  return (
    <>
      <div className="p-4 shadow">
        <div className=" m-auto flex max-w-7xl flex-wrap items-center gap-3">
          <Link href={"/notes"} className="flex items-center gap-1">
            <Image src={logo} alt="FlowBrain logo" width={40} height={40} />
            <span className="font-bold">DiscoverEdge</span>
          </Link>
          <div className=" flex items-center gap-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },
              }}
            />
            <ThemeToggleButton />
            <Button onClick={() => setShowAddEditNoteDialog(true)}>
              <Plus size={20} className="mr-2" />
              Etapa
            </Button>
            <AIChatButton />
          </div>
        </div>
      </div>
      {showAddEditNoteDialog && (
        <AddEditNoteDialogNivel2
          open={showAddEditNoteDialog}
          setOpen={setShowAddEditNoteDialog}
          sectionName={sectionName}
        />
      )}
    </>
  );
}
