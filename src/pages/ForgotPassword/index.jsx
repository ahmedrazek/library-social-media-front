import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";

export const ForgotPassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("/users/forgotPassword", data);
      toast.success("Password reset link sent to your email");
      return <Navigate to={"/"} />;
    } catch (error) {
      console.log(error);
      toast.error("Error sending password reset link");
    }
  };

  return (
    <div className="h-screen max-h-screen p-28">
      <h1 className="text-6xl text-primary">BookNet</h1>
      <div className="flex justify-center items-center h-4/5">
        <div className="flex flex-col text-center border-2 border-gray-400 shadow-xl py-20 px-24 gap-8 w-6/12 rounded-3xl">
          <h1 className="text-4xl text-primary">Enter your email</h1>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="email"
                id="email"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-primary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                {...register("email", {
                  required: "* Required",
                })}
              />
              <label
                htmlFor="email"
                className="flex gap-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
                Email address
              </label>
              {errors.email && (
                <p className=" text-red-800 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button className="text-white shadow-lg bg-primary py-3 rounded-lg font-semibold hover:bg-white hover:text-primary border-primary border">
              Send Code
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
