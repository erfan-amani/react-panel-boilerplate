import React from "react";
import _ from "lodash";
import { Controller } from "react-hook-form";

const Selector = ({
  data = [],
  control,
  label,
  name,
  inputClassName = "",
  labelClassName = "",
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
            <label className={`text-sm text-gray-500 ${labelClassName}`}>
              {label}
            </label>

            <select
              name={name}
              className={`border border-gray-300 focus:border-lightBlue-600 focus:ring-0 rounded-md ${
                isInvalid ? "border-red-500" : ""
              } ${inputClassName}`}
              {...field}
            >
              <option selected disabled hidden className="hidden" value="">
                Select Options ...
              </option>

              {data.map((item, i) => (
                <option value={_.isObject(item) ? item.value : item} key={i}>
                  {_.isObject(item) ? item.name : item}
                </option>
              ))}
            </select>

            {isInvalid && (
              <p className="text-red-500 text-xs">{error?.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default Selector;
