
import "./App.css";
import axios from "axios";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PageLayout from './pages/PageLayout/index';
import Home from "./pages/Home/index"
import Navbar from "./components/Navbar";
import Login from './pages/Login/index';
import Signup from './pages/Signup/index';
import NotFound from './pages/NotFound/index';
function App() {
  axios.defaults.baseURL = "http://localhost:9000/";
  axios.defaults.withCredentials = true;
  const router=createBrowserRouter([{
    path:'', element:<PageLayout/>,children:[
      { path:'/',element:<Home/>},
      { path:'home',element:<Home/>},
      { path:'navbar',element:<Navbar/>},
      { path:'login',element:<Login/>},
      { path:'signup',element:<Signup/>},
      { path:'*',element:<NotFound/>},
    ]
  
    }])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      
    </>
  );
}

export default App;
