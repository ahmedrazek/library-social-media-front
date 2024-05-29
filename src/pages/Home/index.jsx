import "./Home.module.css";
import { Link } from "react-router-dom"; // Make sure to import Link
import heroImage from "../../assets/heroImage.png";
import { FaHandshake } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
const ServiceCard = ({ title, description, icon }) => {
  return (
    <div className="bg-secondary rounded-lg p-6 flex items-center rounded-l-full">
      <div className="mr-4  rounded-full p-6 bg-primary">{icon}</div>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Home = () => {
  const services = [
    {
      title: "Community Outreach",
      description:
        "Participate in our outreach programs and community partnerships. We aim to strengthen our community ties by organizing local events, supporting community initiatives.",
      icon: <FaHandshake className="text-44 text-secondary" />,
    },
    {
      title: "Online Resources",
      description:
        "Follow us for updates, book recommendations, and to connect with fellow readers.",
      icon: <FaGlobe className="text-44 text-secondary" />,
    },
    {
      title: "Special Collections",
      description:
        "Explore our rare books, local history archives, and special interest collections.",
      icon: <FaBook className="text-44 text-secondary" />,
    },
    {
      title: "Social Media Community",
      description:
        "Follow us for updates, book recommendations, and to connect with fellow readers.",
      icon: <FaPeopleGroup className="text-44 text-secondary" />,
    },
  ];
  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-between items-center">
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              to="/Home"
              className="text-primary text-26 font-semibold pr-6"
            >
              BookNet
            </Link>
          </li>
          <li>
            <Link
              to="#services"
              className="text-dark_light hover:text-greenMain text-16 font-medium"
              onClick={() => {
                document
                  .getElementById("services")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-dark_light hover:text-greenMain text-16  font-medium"
            >
              About Me
            </Link>
          </li>
        </ul>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/login"
              className="text-dark_light hover:text-greenMain text-16  font-medium"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="text-dark_light hover:text-greenMain text-16  font-medium"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <div className=" hero-section grid grid-cols-2 items-stretch justify-between gap-3 mt-10">
          <div className="">
            <h2 className="hero-text text-primary text-26 font-bold">
              Welcome to Your{" "}
              <span className="text-greenMain">Community Library</span>
            </h2>
            <p className="hero-description mt-5  text-dark_light text-16">
              Explore books, attend events, and find a quiet place to read.
              <br />
              Our library is here for everyone. Join us today and discover
              <br />
              new adventures! Follow us on social media for the latest
              <br /> updates, events, and book recommendations.
            </p>
            <p className="mt-5 text-dark_light text-16 ">
              Stay engaged with your library online. Get the inside scoop
              <br /> on upcoming programs, special events, and new arrivals.
              <br /> Share your favorite reads and connect with fellow book
              lovers.
              <br /> Follow us today and be part of our vibrant community!
            </p>
            <button className="text-secondary bg-primary hover:bg-green-950  py-3 px-5 mt-10 rounded-lg font-semibold">
              Contact us
            </button>
          </div>
          <div className="mx-auto">
            <img src={heroImage} alt="" width="600px" height="500px" />
          </div>
        </div>
      </main>
      <section className="" id="services">
        <div id="services" className="container mx-auto py-12">
          <h2 className="text-26  text-center text-primary font-bold mb-12">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
       
      </section>
    </div>
  );
};

export default Home;
