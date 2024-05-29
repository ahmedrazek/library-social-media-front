
import { Link } from 'react-router-dom'; // Make sure to import Link

const Home = () => {
    return(
        <div className="container mx-auto p-4">
            <nav className="flex justify-between items-center">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/Home" className="text-greenMain size-11 font-bold">BookNet</Link>
                    </li>
                    <li>
                        <Link to="/services" className="text-dark_light hover:text-greenMain size-5 font-medium">Services</Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-dark_light hover:text-greenMain size-5 font-medium">About Me</Link>
                    </li>
                </ul>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/login" className="text-dark_light hover:text-greenMain size-5 font-medium">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup" className="text-dark_light hover:text-greenMain size-5 font-medium">Sign Up</Link>
                    </li>
                </ul>
            </nav>
            <main>
                <div className="hero-section">
                    <div>
                     
                    </div>
                    <div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;