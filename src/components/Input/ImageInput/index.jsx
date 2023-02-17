import React, { useRef } from "react";

const ImageInput = ({ imageUrl, onSelectImage }) => {
  const inputFile = useRef(null);

  return (
    <div className="flex flex-col gap-4">
      <label className="form-label">Avatar</label>

      <div className="flex flex-col gap-2">
        {imageUrl ? (
          <div className="image-input image-input-empty image-input-outline mb-3">
            <img
              className="rounded-full w-40 h-40"
              src={imageUrl}
              style={{
                textAlign: "center",
              }}
              alt=""
              onClick={() => inputFile.current.click()}
            />
          </div>
        ) : (
          <span className="" onClick={() => inputFile.current.click()}>
            <svg
              className="rounded-full w-40 h-40 text-gray-300 border-2 border-gray-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        )}
        <div className="text-gray-500 text-xs">
          Only *.png, *.jpg and *.jpeg image files are accepted
        </div>
      </div>

      <input
        type="file"
        name="image"
        accept="image/*"
        ref={inputFile}
        hidden
        onChange={onSelectImage}
      />
    </div>
  );
};

export default ImageInput;
