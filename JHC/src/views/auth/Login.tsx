/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { bgimg } from "../../assets";
import { useLoginMutation } from "../../api/auth.api";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../configs/globalSlice";

type TFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const [login, { isLoading, isSuccess, data }] = useLoginMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful");
      dispatch(loginUser(data));
    }
  });

  const handleLogin = async (value: TFormValues) => {
    login(value)
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        toast.error("An error occurred");
      });
  };

  const { register, handleSubmit, formState } = useForm<TFormValues>();
  const { errors } = formState;

  const onSubmit = (data: TFormValues) => {
    handleLogin(data);
  };

  return (
    <div className="w-full relative h-screen flex justify-end items-center bg-JHC/Light">
      <div className="relative z-50 w-[24vw] h-[70vh] rounded-lg p-4 bg-white  mr-[10%]">
        <p className="text-center text-JHC/Darkest font-semibold">
          Welcome to JHC-Hospital
        </p>
        <form action="" className="mt-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="my-3">
            <label
              htmlFor="email"
              className="text-sm text-JHC/Darkest font-medium"
            >
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-3 mt-2 focus:outline-none border block py-2 rounded-lg text-JHC/Darkest"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm text-JHC/Darkest font-medium"
            >
              Password
            </label>
            <input
              className="w-full focus:outline-none mt-2 px-3 border block py-2 rounded-lg text-JHC/Darkest"
              type="password"
              {...register("password", {
                required: "password is required",
              })}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button className="w-full py-2 rounded-lg bg-JHC-Primary text-sm text-white mt-9">
            {isLoading ? (
              <Spin indicator={<LoadingOutlined spin style={{color:"white"}} />} />
            ) : (
              "login"
            )}
          </button>
        </form>
      </div>

      <div className="absolute w-full h-full left-0 top-0">
        <img src={bgimg} className="w-full h-full object-cover" alt="" />
      </div>
    </div>
  );
}
