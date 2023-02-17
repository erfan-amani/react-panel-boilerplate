import { useState } from "react";
import Compressor from "compressorjs";

export const useImageInput = () => {
  const [selectedImage, setSelectedImage] = useState(""); // selected file - not cropped - initial raw image
  const [croppedImage, setCroppedImage] = useState(null); // cropped image
  const [imageUrl, setImageUrl] = useState("");
  const [cropperOpen, setCropperOpen] = useState(false);

  const onCropperOpen = () => setCropperOpen(true);
  const onCropperClose = () => setCropperOpen(false);

  const onSelectImage = (event) => {
    if (!!event.currentTarget.files) {
      setSelectedImage(URL.createObjectURL(event.currentTarget.files[0]));
      onCropperOpen();
    }
  };

  const applyCrop = (file) => {
    setImageUrl(URL.createObjectURL(file));

    new Compressor(file, {
      quality: 0.8,
      success: (res) => {
        setCroppedImage(res);
        onCropperClose();
      },
    });
  };

  return {
    selectedImage,
    croppedImage,
    imageUrl,
    cropperOpen,
    onCropperOpen,
    onCropperClose,
    onSelectImage,
    applyCrop,
  };
};
