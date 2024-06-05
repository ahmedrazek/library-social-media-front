// import NavbarTimeline from "../../components/NavbarTimeline/NavbarTimeline";
// import Sidebar from "../../components/Sidebar/Sidebar";


// export default function Timeline() {
//   // const user = useSelector((state) => state.user.user);
//   // console.log(user);
//   return (
//     <div>
//       <NavbarTimeline/>
//       <Sidebar/>
//       {/* <h1>User name : {user.name}</h1>
//       <h2>USer email : {user.email}</h2> */}
//     </div>
//   );
// }


// src/pages/Timeline.js
import React from "react";
import NavbarTimeline from "../../components/NavbarTimeline/NavbarTimeline";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Timeline() {
  return (
    <div className="flex flex-col h-screen">
      <NavbarTimeline />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-100">
          
        </div>
      </div>
    </div>
  );
}

