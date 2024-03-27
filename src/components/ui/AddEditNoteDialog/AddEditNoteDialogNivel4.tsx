import { CreateNoteSchema, createNoteSchema } from "@/lib/validation/note";
import {
  CreateContentSchema,
  createContentSchema,
} from "@/lib/validation/sectionContent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "../dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../form";
import { Input } from "../input";
import { Textarea } from "../textarea";
import LoadingButton from "../loading-button";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";
import { useEffect, useState } from "react";

interface AddEditNoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteToEdit?: Note;
  sectionName?: string;
  titulo3?: string;
}

export default function AddEditNoteDialogNivel4({
  open,
  setOpen,
  noteToEdit,
  sectionName,
  titulo3,
}: AddEditNoteDialogProps) {
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const router = useRouter();
  const form = useForm<CreateContentSchema>({
    resolver: zodResolver(createContentSchema),
    defaultValues: {
      title: noteToEdit?.title || "",
      title2: sectionName || "",
      title3: titulo3 || "",
      title4: titulo3 || "",
      Nivel: "4",
      content: noteToEdit?.content || "",
    },
  });

  const { setValue } = form;

  useEffect(() => {
    setValue("title", noteToEdit?.title || "");
    setValue("title2", sectionName || "");
    setValue("title3", titulo3 || "");
    setValue("title4", titulo3 || "");
    setValue("content", noteToEdit?.content || "");
  }, [noteToEdit, sectionName, titulo3, setValue]);

  async function onSubmit(input: CreateContentSchema) {
    try {
      if (noteToEdit) {
        const response = await fetch("/api/section", {
          method: "PUT",
          body: JSON.stringify({
            id: noteToEdit.id,
            ...input,
          }),
        });
        if (!response.ok) throw Error("Status code: " + response.status);
      }

      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong , please try again later.");
    }
  }

  async function deleteNote() {
    if (!noteToEdit) return;
    setDeleteInProgress(true);
    try {
      const response = await fetch("/api/section", {
        method: "DELETE",
        body: JSON.stringify({
          id: noteToEdit.id,
        }),
      });
      if (!response.ok) throw Error("Status code: " + response.status);
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setDeleteInProgress(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              {noteToEdit && (
                <LoadingButton
                  variant="destructive"
                  loading={deleteInProgress}
                  disabled={form.formState.isSubmitting}
                  onClick={deleteNote}
                  type="button"
                >
                  Eliminar
                </LoadingButton>
              )}
              <LoadingButton
                loading={form.formState.isSubmitting}
                type="submit"
              >
                Actualizar
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}