"use client";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { ResultItem } from "./Item";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import React, { useEffect, useState } from "react";

interface RetriveInformacion {
  allInfo: any;
}

export default function Dragabble({ allInfo }: RetriveInformacion) {
  return (
    <>
      {allInfo.map((result: any, index: any) => (
        <ResultItem key={result?.identifiers?.doi} result={result} />
      ))}
    </>
  );
}
// const [todoItems, setTodoItems] = useState([]);

// const todoItems = allInfo.map((result: any, index: any) => (
//   <ResultItem key={index} result={result} />
// ));

// const [todoList, todos] = useDragAndDrop<HTMLUListElement, string>(
//   todoItems,
//   {
//     group: "todoList",
//   },
// );

// console.log(todos, "todos");

// return (
//   <div className="kanban-board  ">
//     <ul ref={todoList}>
//       {todos.map((todo, index) => (
//         <li
//           className="kanban-item
//            mb-4 rounded-lg border-2 border-gray-300 p-6  shadow-md"
//           key={index}
//         >
//           {todo}
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// return (
//   <>
//     {allInfo.map((result: any, index: any) => (
//       <ResultItem key={result?.identifiers?.doi} result={result} />
//     ))}
//   </>
// );

// useEffect(() => {
//   console.log("useEffect", allInfo);
//   setTodoItems(
//     allInfo.map((result: any, index: any) => (
//       <ResultItem key={index} result={result} />
//     )),
//   );
// }, [allInfo]);
