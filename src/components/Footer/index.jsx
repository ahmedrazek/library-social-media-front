
import { BsFillSendFill } from "react-icons/bs";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
const Footer = () => {

  return (
    <div className="bg-primary text-white p-10  max-width mt-10">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h2 className="font-bold text-2xl mb-4">BookNet</h2>
          <p className="max-w-md">
            Stay connected with your library for the latest updates, events, 
            and book recommendations.
            Join our community today and discover new adventures in reading and learning.
          </p>
          <p className="mt-4 text-xs text-gray-400">© 2024 Your Library. All rights reserved</p>
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-8 text-center md:text-left">
          <div >
          <ul>
             <li><a href="#" className="hover:text-greenMain">Home</a></li>
              <li><a href="#" className="hover:text-greenMain">About us</a></li>
              <li><a href="#" className="hover:text-greenMain">Contact us</a></li>
              <li><a href="#" className="hover:text-greenMain">Services</a></li>
            </ul>
          </div>
          <div className="mx-20"> 
            <ul>
              <li><a href="#" className="hover:text-greenMain">Help</a></li>
              <li><a href="#" className="hover:text-greenMain">How we work</a></li>
              <li><a href="#" className="hover:text-greenMain">Terms &amp; contention</a></li>
              <li><a href="#" className="hover:text-greenMain">Corporate contact</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-2">Contact us</h3>
            <div className="flex space-x-4 mb-4">
          
              <a href="#" className="text-xl p-2 hover:bg-green-500 hover:text-primary hover:rounded-full hover:text-secondary">
                <FaTwitter />
              </a>
              <a href="#" className="text-xl p-2 hover:bg-green-500  hover:text-primary hover:rounded-full hover:text-secondary">
                <FaFacebook />
              </a>
              <a href="#" className="text-xl p-2 hover:bg-green-500 hover:text-primary hover:rounded-full hover:text-secondary">
                <FaInstagram />
              </a>
              <a href="#" className="text-xl p-2 hover:bg-green-500 hover:text-primary hover:rounded-full hover:text-secondary">
                <FaLinkedin />
              </a>

            </div>
            <div className="w-full flex mt-4">
              <input type="text" placeholder="Send Message" className="w-full p-2 rounded-l-lg text-gray-800" />
              <span className="bg-green-600 p-3 rounded-r-lg">
                <BsFillSendFill />
                {/* <i className="fas fa-paper-plane text-white"></i> */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
