import React from "react";
import { Controller } from "react-hook-form";

const TextInput = ({
  control,
  name,
  label,
  type = "text",
  labelClassName = "",
  inputClassName = "",
}) => {
  if (!control) {
    throw new Error("Please provide control into component!!");
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field,
        fieldState: { isTouched, error },
        formState: { isSubmitted },
      }) => {
        const isInvalid = (isTouched || isSubmitted) && !!error;

        return (
          <div className="flex flex-col gap-2">
            <label
              htmlFor={name}
              className={`text-sm text-gray-500 ${labelClassName}`}
            >
              {label}
            </label>

            <input
              id={name}
              type={type}
              className={`border border-gray-300 focus:border-lightBlue-600 focus:ring-0 rounded-md ${
                isInvalid ? "border-red-500" : ""
              } ${inputClassName}`}
              {...field}
            />

            {isInvalid && (
              <p className="text-red-500 text-xs">{error?.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default TextInput;
