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

export const FileUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
    console.log("handleChange -> handleChange");
  };
  const handleUpload = () => {
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
        });
      },
    );
    console.log("handleUpload -> uploadTask");
  };

  return (
    <>
      <div>
        <progress value={progress} max="100" />
        <br />
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        <br />
        <img src={url} alt="" />
        <div>{url}</div>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Open PDF
        </a>
      </div>
      <UploadPdfByUrl url={url} />
    </>
  );
};
