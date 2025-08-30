import ImageUpload from "@/components/ImageUpload";
import Navbar from "@/components/Navbar";
import React, { useRef } from "react";

function page() {
  return (
    <div>
      <Navbar />
      <ImageUpload />
    </div>
  );
}

export default page;
