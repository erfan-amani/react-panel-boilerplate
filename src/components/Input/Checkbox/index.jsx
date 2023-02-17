import { Switch } from "@headlessui/react";
import { Controller } from "react-hook-form";

const Checkbox = ({ name, control, label, labelClassName = "" }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
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

            <Switch
              id={name}
              checked={value}
              onChange={onChange}
              className={`${value ? "bg-lightBlue-600" : "bg-slate-500"}
          inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span
                aria-hidden="true"
                className={`${value ? "translate-x-[24px]" : "translate-x-0"}
            pointer-events-none inline-block w-[20px] h-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>

            {isInvalid && (
              <p className="text-red-500 text-xs">{error?.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default Checkbox;
