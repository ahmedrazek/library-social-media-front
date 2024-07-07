import { useState } from "react";
import image from "../../assets/loginImage.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import { Navigate, Link } from "react-router-dom";
import { GoogleAuth } from "../../components/GoogleAuth";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
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
      setLoading(true);
      const res = await axios.post("/users/login", data);
      dispatch(setUser(res.data.user));
      if (res.data.user.savedPosts && res.data.user.savedPosts.length > 0) {
        res.data.user.savedPosts.forEach((postId) => {
          localStorage.setItem(`saved-${postId}`, JSON.stringify(true));
        });
      }
      setRedirect(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.status == 401) setError(true);
    }
  };
  if (redirect) return <Navigate to={"/user/timeline"} />;
  if (user) return <Navigate to={"/user/timeline"} />;
  return (
    <div className="relative h-screen w-full">
      <div className="absolute hidden md:block lg:block bg-primary w-1/2 -z-10 h-full"></div>
      <div className="flex justify-center items-center h-screen ">
        <div className="flex flex-col md:flex-row mx-auto md:justify-between items-center  shadow-2xl shadow-black  w-10/12 rounded-xl py-20 md:px-40 gap-4 ">
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
          <div className="flex flex-col gap-8 px-10 md:w-5/12">
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
                {error && (
                  <p className=" text-red-800 text-sm mt-2">
                    Email or Password is wrong
                  </p>
                )}
              </div>
              <button className="text-white shadow-lg border bg-primary py-3 rounded-lg font-semibold hover:bg-white hover:text-primary hover:border-primary hover:border">
                {loading ? (
                  <span>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    ...Loading
                  </span>
                ) : (
                  " Login"
                )}
              </button>
              <div className="text-primary font-semibold ">
                <Link to={"/forgotPassword"} className=" hover: ">
                  Forgot password ?
                </Link>
              </div>
            </form>
            <GoogleAuth setRedirect={setRedirect} />
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
