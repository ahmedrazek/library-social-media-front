
import { Outlet } from "react-router-dom";
import NavbarTimeline from './../../components/NavbarTimeline/NavbarTimeline';


const PageLayout = () => {
  return (
    <div>
      <NavbarTimeline/>
    
     
      <Outlet />
   
    </div>
  );
};

export default PageLayout;
