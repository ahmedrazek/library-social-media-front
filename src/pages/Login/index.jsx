import { useState } from "react";
import image from "../../assets/loginImage.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { Navigate, Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/users/login", data);
      dispatch(setUser(res.data.user));
      if (res.data.user.savedPosts && res.data.user.savedPosts.length > 0) {
        res.data.user.savedPosts.forEach(postId => {
          localStorage.setItem(`saved-${postId}`, JSON.stringify(true));
        });
      }
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };
  if (redirect) return <Navigate to={"/user/timeline"} />;
  return (
    <div className="relative h-screen w-full">
      <div className="absolute hidden md:block lg:block bg-primary w-1/2 -z-10 h-full"></div>
      <div className="flex justify-center items-center h-screen ">
        <div className="flex flex-col md:flex-row lg:flex-row mx-auto justify-between  shadow-2xl shadow-black  w-10/12 rounded-xl py-20 px-40 gap-4 ">
          <div className="hidden md:flex lg:flex flex-col gap-12 items-center w-5/12 text-white ">
            <h1 className=" text-6xl self-start">BookNet </h1>
            <img src={image} alt="" />
            <p className="text-xl">
              connect with{" "}
              <span className=" text-green-500 text-3xl">
                Readers Community
              </span>{" "}
            </p>
          </div>
          <div className="flex flex-col gap-8 w-5/12">
            <h1 className=" text-2xl mb-8">Login into your account</h1>
            <form
              action=""
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
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
              <div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="block py-2.5  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-primary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                    placeholder=" "
                    {...register("password", {
                      required: "* Required",
                    })}
                  />
                  <label
                    htmlFor="password"
                    className="flex gap-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Password
                  </label>

                  {!showPassword && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4 absolute bottom-3 right-0 text-gray-500 cursor-pointer"
                      onClick={() => {
                        setShowPassword(true);
                      }}
                    >
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path
                        fillRule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {showPassword && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      onClick={() => {
                        setShowPassword(false);
                      }}
                      className="size-4 absolute bottom-3 right-0 text-gray-500 cursor-pointer"
                    >
                      <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                    </svg>
                  )}
                </div>
                {errors.password && (
                  <p className=" text-red-800 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button className="text-white shadow-lg bg-primary py-3 rounded-lg font-semibold hover:bg-white hover:text-primary hover:border-primary hover:border">
                Login
              </button>
              <div className="flex justify-between">
                <div>
                  <input type="checkbox" name="" id="" />{" "}
                  <span>Remember password</span>
                </div>
                <a href="#">Forgot password ?</a>
              </div>
            </form>
            <a
              href="#"
              className="text-primary  py-3 rounded-lg font-bold text-center border border-primary hover:bg-primary hover:text-white  shadow-lg"
            >
              Google account
            </a>
            <p className="text-center">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
