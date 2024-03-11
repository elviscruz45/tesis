// "use client";
// import prisma from "@/lib/db/prisma";
// import { auth } from "@clerk/nextjs";
// import { ResultItem } from "./Item";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "../../ui/form";
// import { useForm } from "react-hook-form";
// import { CreateNoteSchema, createNoteSchema } from "@/lib/validation/note";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   DialogHeader,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogFooter,
// } from "../../ui/dialog";
// import { Textarea } from "../../ui/textarea";
// import LoadingButton from "../../ui/loading-button";
// import { useState } from "react";
// import { Input } from "../../ui/input";

// interface AddEditNoteDialogProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   noteToEdit?: Note;
// }

// export default function AddEditNoteDialog({
//   open,
//   setOpen,
//   noteToEdit,
// }: AddEditNoteDialogProps) {
//   const [deleteInProgress, setDeleteInProgress] = useState(false);
//   const router = useRouter();
//   const form = useForm<CreateNoteSchema>({
//     resolver: zodResolver(createNoteSchema),
//     defaultValues: {
//       title: noteToEdit?.title || "",
//       content: noteToEdit?.content || "",
//     },
//   });
//   async function onSubmit(input: CreateNoteSchema) {
//     try {
//       if (noteToEdit) {
//         const response = await fetch("/api/notes", {
//           method: "PUT",
//           body: JSON.stringify({
//             id: noteToEdit.id,
//             ...input,
//           }),
//         });
//         if (!response.ok) throw Error("Status code: " + response.status);
//       } else {
//         const response = await fetch("/api/notes", {
//           method: "POST",
//           body: JSON.stringify(input),
//         });

//         if (!response.ok) throw new Error("Status Code" + response.status);
//         form.reset();
//       }

//       router.refresh();
//       setOpen(false);
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong , please try again later.");
//     }

//     // alert(JSON.stringify(input));
//   }

//   async function deleteNote() {
//     if (!noteToEdit) return;
//     setDeleteInProgress(true);
//     try {
//       const response = await fetch("/api/notes", {
//         method: "DELETE",
//         body: JSON.stringify({
//           id: noteToEdit.id,
//         }),
//       });
//       if (!response.ok) throw Error("Status code: " + response.status);
//       router.refresh();
//       setOpen(false);
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setDeleteInProgress(false);
//     }
//   }

//   return (
//     <>
//       {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3"> */}
//       <form onSubmit={() => console.log("hola")} className="space-y-3">
//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Pregunta</FormLabel>
//               <FormControl>
//                 <Input placeholder="Note title" {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="content"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Informacion y Docs</FormLabel>
//               <FormControl>
//                 <Textarea placeholder="Note title" {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <DialogFooter>
//           <LoadingButton
//             variant="destructive"
//             loading={deleteInProgress}
//             disabled={form.formState.isSubmitting}
//             // onClick={deleteNote}
//             type="button"
//           >
//             Delete note
//           </LoadingButton>

//           <LoadingButton loading={form.formState.isSubmitting} type="submit">
//             Submit
//           </LoadingButton>
//         </DialogFooter>
//       </form>
//     </>
//   );
// }
