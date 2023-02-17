import Cropper from "react-easy-crop";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState } from "react";
import { getCroppedImg } from "./helper";

const ImageCropperModal = ({ applyCrop, initialImage, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(initialImage, croppedAreaPixels);
      applyCrop(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, initialImage, applyCrop]);

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="relative flex flex-col container-xxl">
                  <div className="modal-body">
                    <div className="mt-2 h-[70vh] z-20 overflow-hidden">
                      <Cropper
                        image={initialImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                      />
                    </div>
                  </div>

                  <div class="flex items-center justify-center gap-4 mt-2 bg-white py-4 z-30">
                    <button
                      class="bg-lightBlue-600 text-white px-8 py-3 rounded-md cursor-pointer disabled:cursor-not-allowed"
                      onClick={showCroppedImage}
                    >
                      Apply
                    </button>
                    <button
                      class="border border-gray-300 px-8 py-3 rounded-md cursor-pointer"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImageCropperModal;
