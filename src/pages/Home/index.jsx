
import { Link } from 'react-router-dom'; // Make sure to import Link
import About from '../../components/Aboutus';
import Footer from './../../components/Footer/index';

const Home = () => {
    return(
        <>
        <div className="container mx-auto p-4">
            <nav className="flex justify-between items-center">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-primary hover:text-dark_light size-8 font-bold">BookNet</Link>
                    </li>
                    <li>
                        <Link to="/services" className="text-blue-500 hover:text-blue-700">Services</Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-blue-500 hover:text-blue-700">About Me</Link>
                    </li>
                </ul>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</Link>
                    </li>
                </ul>
            </nav>
         

        </div>
        <About/>
        <Footer/>
        </>
    );
}

export default Home;