import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../validation/authValidation";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "../../redux/reducers/auth/asyncActions";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    status: reqStatus,
    pending,
    error: reqError,
    accessToken,
  } = useSelector((state) => state.auth);
  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log({ data });

    dispatch(loginHandler(data));
  };

  useEffect(() => {
    if (!pending && !!accessToken) {
      navigate("/admin/dashboard");
    }
  }, [pending, accessToken]);

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-2/3 lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10">
                <div className="flex justify-center mb-8">
                  <h3 className="font-bold text-2xl">Login</h3>
                </div>
                {reqError && reqStatus === "login-rejected" && (
                  <div className="flex justify-center mb-8 bg-red-200 py-3">
                    <p className="text-gray-700">
                      {typeof reqError === "string"
                        ? reqError
                        : reqError?.statusText}
                    </p>
                  </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      {...register("email")}
                    />
                    {formState?.errors?.email && (
                      <p className="text-red-500 text-sm">
                        {formState?.errors?.email?.message}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      {...register("password")}
                    />
                    {formState?.errors?.password && (
                      <p className="text-red-500 text-sm">
                        {formState?.errors?.password?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    {pending ? (
                      <div className="animate-pulse w-full h-10 bg-slate-400 rounded" />
                    ) : (
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Sign In
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            {/* <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
