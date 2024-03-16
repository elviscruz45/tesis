import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { ResultItem } from "./Item";
import React from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import Dragabble from "./dragabble";
interface RetriveInformacion {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  contentData?: any;
  sectionName?: any;
}

export default async function RetriveInformacionMarcoTeorico({
  open,
  setOpen,
  contentData,
  sectionName,
}: RetriveInformacion) {
  // const [deleteInProgress, setDeleteInProgress] = useState(false);

  const { userId } = auth();
  if (!userId) throw new Error("You must be logged in to view this page");

  const allInfo = await prisma.sectionContent.findMany({
    where: {
      userId,
      title4: "informacion_guardada_marco_teorico",
      Nivel: "4",
    },
  });

  return (
    <>
      {allInfo.map((result: any, index) => (
        <div className="mb-4 rounded-lg border-2 border-gray-300 p-6  shadow-md">
          <ResultItem
            key={result?.identifiers?.doi}
            result={result}
            allInfo={allInfo}
            index={index}
          />
        </div>
      ))}
    </>
  );
}
// return (
//   <>
//     {allInfo.map((result: any, index) => (
//       <ResultItem key={result?.identifiers?.doi} result={result} />
//     ))}
//   </>
// );

// const todoItems = [
//   "Schedule perm",
//   "Rewind VHS tapes",
//   "Make change for the arcade",
//   "Get disposable camera developed",
//   "Learn C++",
//   "Return Nintendo Power Glove",
// ];
// const [todoList, todos] = useDragAndDrop<HTMLUListElement, string>(
//   todoItems,
//   {
//     group: "todoList",
//   },
// );

// return (
//   <div className="kanban-board">
//     <ul ref={todoList}>
//       {todos.map((todo) => (
//         <li className="kanban-item" key={todo}>
//           {todo}
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// return (
//   <div>
//     <Dragabble allInfo={allInfo} />
//   </div>
// );
