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
  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
  //         headers: {
  //           Authorization: `Bearer ${user.access_token}`,
  //         },
  //       })
  //       .then((res) => {
  //         setProfile(res.data);
  //         console.log(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);
  return (
    <div>
      <button
        type="button"
        onClick={login}
        className="text-primary  py-3 rounded-lg font-bold text-center border border-primary hover:bg-primary hover:text-white  shadow-lg"
      >
        Google account
      </button>
    </div>
  );
};
