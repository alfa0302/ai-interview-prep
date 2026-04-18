import React, { useState, useRef } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

export default function ProfilePhotoSelector({
  image,
  setImage,
  preview,
  setPreview,
}) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(preview);
      }
      setPreviewUrl(preview);
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) {
      setPreview(null);
    }
  };
  const onChooseFile = () => {
    inputRef.current.click();
  };
  return (
    <div className="flex justify-center">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className="w-22 h-22 rounded-full bg-amber-100 relative flex flex-col justify-center items-center">
          <LuUser className="text-amber-600 w-[60%] h-[60%]" />
          <button
            type="button"
            className="absolute bottom-0 right-0"
            onClick={onChooseFile}
          >
            <LuUpload className="bg-amber-600 text-white rounded-full p-1 text-2xl cursor-pointer" />
          </button>
        </div>
      ) : (
        <div className="w-22 h-22 rounded-full bg-amber-100 relative flex flex-col justify-center items-center">
          <img
            src={preview || previewUrl}
            alt="profile photo"
            className="object-cover h-full w-full rounded-full"
          />
          <button
            type="button"
            className="absolute bottom-0 right-0"
            onClick={handleRemoveImage}
          >
            <LuTrash className="bg-red-600 text-white rounded-full p-1 text-2xl cursor-pointer" />
          </button>
        </div>
      )}
    </div>
  );
}
