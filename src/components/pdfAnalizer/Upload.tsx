"use client";

import React, { ChangeEvent, useState } from "react";
import { storage } from "@/lib/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
import UploadPdfByUrl from "./ChatPdfdocUpload";
import { Button } from "../ui/button";
import Link from "next/link";
type FileUploadProps = {
  analizar: boolean;
  resumir: boolean;
  setUrlPDF: (url: string) => void;
};
export const FileUpload: React.FC<FileUploadProps> = ({
  analizar,
  resumir,
  setUrlPDF,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
    console.log("handleChange -> handleChange");
  };
  const handleUpload = () => {
    try {
      if (!image) return;
      const storageRef = ref(storage, `antecedentes/${image?.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image!);

      uploadTask.on(
        "state_changed",
        (snapshot: UploadTaskSnapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            setUrlPDF(downloadURL);
          });
        },
      );
      setIsSaved(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <input type="file" onChange={handleChange} className="white" />
        <br />
        <progress
          value={progress}
          max="100"
          className="h-4 w-full bg-blue-500"
        />
        <br />

        <Button
          className="m-3  gap-1"
          disabled={isSaved}
          onClick={() => handleUpload()}
        >
          {isSaved ? "Guardado" : "Subir Archivo"}
        </Button>

        <br />
        {url && (
          <Link href={url} target="_blank" rel="noopener noreferrer">
            <Button className="m-3  gap-1">Open PDF</Button>
          </Link>
        )}
      </div>
      <br />

      <UploadPdfByUrl url={url} analizar={analizar} resumir={resumir} />
    </>
  );
};
