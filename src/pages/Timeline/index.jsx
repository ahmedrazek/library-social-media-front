import { useSelector } from "react-redux";

export default function Timeline() {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <div>
      <h1>User name : {user.name}</h1>
      <h2>USer email : {user.email}</h2>
    </div>
  );
}
