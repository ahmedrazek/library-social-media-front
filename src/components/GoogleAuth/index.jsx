/* eslint-disable react/prop-types */
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

export const GoogleAuth = ({ setRedirect }) => {
  const dispatch = useDispatch();
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      const res = await axios.post("/users/google/auth", response);
      console.log(res);
      dispatch(setUser(res.data.user));
      setRedirect(true);
    },
  });
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={login}
        className="text-primary  py-3  w-full rounded-lg font-bold text-center border border-primary transition-all ease-in  hover:bg-primary hover:text-white  shadow-lg"
      >
        Google account
      </button>
    </div>
  );
};
