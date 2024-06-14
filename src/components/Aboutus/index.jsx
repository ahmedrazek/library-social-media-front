import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import Image1 from '../../assets/Group 34.png';
import './custom.css'

const About = () => {
  return (
    <section>
      <div className="max-w-screen-xl mx-auto lg:px-8 flex flex-col lg:flex-row">
        <div className="lg:w-1/2 flex lg:justify-start mb-8 lg:mb-0">
          <div>
            <img src={Image1} alt="Person" className="w-full h-5/6" />
          </div>
        </div>
        <div className="lg:w-1/2 lg:pl-12">
          <h2 className="text-3xl font-bold mb-4 text-start text-primary">About Us</h2>
          <p className="text-gray-700 mb-6">
            Welcome to our online community library, an integrated platform that provides you with access to a wide range of resources and knowledge from anywhere, at any time. Our goal is to facilitate access to knowledge and promote a love of reading and education for everyone in the community online. We offer you a diverse collection of e-books, audiobooks, and digital databases, in addition to educational programs and interactive online workshops for children and adults. Join us and explore a world of knowledge and educational opportunities available to you through your online community library.
          </p>
          <div className=" content-wrapper  flex flex-wrap lg:flex-nowrap items-center mt-20">
          <div className=" ">
            <FaQuoteLeft className="text-3xl absolute top-0 left-10 text-primary" />
          </div>
      <div className="bg-gray-40 p-6 rounded-lg shadow-lg relative">
        <div className="relative">
          <div className="text-primary mt-8">
            <p className="text-lg italic mb-4">
              "You never really understand a person until you consider things from his point of view... Until you climb inside of his skin and walk around in it."
            </p>
          </div>
        </div>
      </div>
         </div>
        </div>
      </div>
    </section>
  );
};

export default About;
