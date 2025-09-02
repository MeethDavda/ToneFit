"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import ReviewResponse from "./ReviewResponse";
import imageCompression from "browser-image-compression";
import Modal from "./Modal";

function ImageUpload() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [res, setRes] = useState(null);
  const [imageLoader, setImageLoader] = useState(false);
  const [loader, setLoader] = useState(false);

  async function handleFileChange(event) {
    const imageFile = event.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      setImageLoader(true);
      const compressedFile = await imageCompression(imageFile, options);
      setSelectedFile(compressedFile);
      setImageLoader(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSelect() {
    fileInputRef.current.click();
  }

  async function handleUpload() {
    setLoader(true);
    const formData = new FormData();
    if (selectedFile) {
      formData.append("image", selectedFile);
      try {
        const res = await axios.post(
          // "http://127.0.0.1:8000/rate-outfits",
          "http://ec2-51-20-10-227.eu-north-1.compute.amazonaws.com:8000/rate-outfits",
          formData
        );
        setLoader(false);
        setRes(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex flex-row justify-center items-center mt-20 gap-7 w-[50%] mx-auto ">
      <div className="bg-[#fbf6f0] drop-shadow-xl rounded-lg h-[23em] w-[60%] flex flex-col p-4 gap-2 ">
        <div className="text-xl text-center mt-10">Upload PNG Image</div>
        {imageLoader ? (
          <div className="w-[60%] text-center mx-auto px-4 py-2 bg-orange-300 cursor-pointer drop-shadow-2xl my-2 rounded-full hover:bg-white hover:border-1 hover:border-orange-300 transition-all ease-in-out duration-200 ">
            Compressing...
          </div>
        ) : (
          <div
            onClick={handleSelect}
            className="w-[60%] text-center mx-auto px-4 py-2 bg-orange-300 cursor-pointer drop-shadow-2xl my-2 rounded-full hover:bg-white hover:border-1 hover:border-orange-300 transition-all ease-in-out duration-200 "
          >
            Select
          </div>
        )}

        {selectedFile && (
          <div className="text-center">{selectedFile?.name}</div>
        )}
        <input
          type="file"
          name="image"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {loader ? (
          <div className="w-[60%] text-center mx-auto px-4 py-2 bg-orange-300 cursor-pointer drop-shadow-2xl my-2 rounded-full hover:bg-white hover:border-1 hover:border-orange-300 transition-all ease-in-out duration-200 ">
            Uploading...
          </div>
        ) : (
          <div
            onClick={handleUpload}
            className="w-[60%] text-center mx-auto px-4 py-2 bg-orange-300 cursor-pointer drop-shadow-2xl my-2 rounded-full hover:bg-white hover:border-1 hover:border-orange-300 transition-all ease-in-out duration-200 "
          >
            Upload
          </div>
        )}
      </div>
      <div>
        <ReviewResponse data={res} />
      </div>
      <div>
        <Modal open={loader} />
      </div>
    </div>
  );
}

export default ImageUpload;
