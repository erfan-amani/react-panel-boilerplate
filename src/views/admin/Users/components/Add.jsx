/* tslint:disable */
import { createUserValidation } from "../model/validation";
import Selector from "@/components/Selector";
import { BasicStatus, UserType } from "../model/Data";
import { useNavigate } from "react-router-dom";
import ImageCropperModal from "@/components/ImageCropper/ImageCropperModal";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/Input/TextInput";
import ImageInput from "@/components/Input/ImageInput";
import { useImageInput } from "@/components/Input/ImageInput/useImageInput";
import { Add as AddApi } from "../api/index";
import Checkbox from "../../../../components/Input/Checkbox";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  status: "",
  level: "",
  isVerified: false,
};

const Add = () => {
  const navigate = useNavigate();
  const {
    selectedImage,
    croppedImage,
    imageUrl,
    cropperOpen,
    onCropperClose,
    onSelectImage,
    applyCrop,
  } = useImageInput();

  const { handleSubmit, formState, getValues, control } = useForm({
    defaultValues,
    resolver: yupResolver(createUserValidation),
  });

  const onSubmit = async (values) => {
    console.log({ values });

    const formdata = new FormData();

    if (croppedImage) formdata.append("avatar", croppedImage);
    formdata.append("email", values.email);
    formdata.append("name", values.name);
    formdata.append("status", values.status);
    formdata.append("address", values.address);
    formdata.append("isVerified", values.isVerified);

    try {
      await AddApi(formdata);

      toast.success("User created successfully");
      navigate("/admin/users/list");
    } catch (error) {
      console.log({ error });

      if (error?.response?.status !== 400) {
        const { data } = error?.response;

        if (data?.message) setStatus(data?.message);
      } else {
        setStatus(error?.response?.data?.error);
      }
    }
  };

  const loading = formState?.isSubmitting;

  return (
    <div className="section-bg">
      <div className="section-container">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-8">
            <ImageInput imageUrl={imageUrl} onSelectImage={onSelectImage} />

            {/* OTHER FIELDS START */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput name="name" label="Name" control={control} />

                <TextInput name="email" label="Email" control={control} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput label="Address" name="address" control={control} />

                <Selector
                  label="Status"
                  name="status"
                  data={BasicStatus}
                  control={control}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Checkbox control={control} label="Verfied" name="isVerified" />
              </div>
            </div>
            {/* OTHER FIELDS END */}
          </div>

          {/* CROPPER MODAL */}
          {cropperOpen && (
            <ImageCropperModal
              isOpen={cropperOpen}
              onClose={onCropperClose}
              initialImage={selectedImage}
              applyCrop={applyCrop}
            />
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-lightBlue-600 text-white px-8 py-3 rounded-md mt-8 cursor-pointer disabled:cursor-not-allowed"
            // disabled={formState?.isSubmitting || !formState?.isValid}
          >
            {!loading && <span className="indicator-label">Create</span>}
            {loading && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
